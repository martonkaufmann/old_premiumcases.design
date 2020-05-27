import crypto from 'crypto';
import dotenv from 'dotenv';
import { NowRequest, NowResponse } from '@now/node';
import {
    getPrintifyProducts,
    PrintifyProductMetadata,
} from './_helpers/printify';
import {
    getFaunaDevices,
    getFaunaCases,
    getFaunaSurfaces,
    createFaunaProducts,
    bulkInsert,
    FaunaProductVariation,
    FaunaProduct,
    BulkInsertMutations,
} from './_migrate/fauna';
import {
    setupCloudinary,
    uploadImageFromUrlToCloudinary,
} from './_helpers/cloudinary';
import cloudinary from 'cloudinary';

export default async (request: NowRequest, response: NowResponse) => {
    dotenv.config();
    setupCloudinary();

    // Seed data to database
    await Promise.all([
        bulkInsert(BulkInsertMutations.device, [
            { name: 'iPhone 7' },
            { name: 'iPhone 7 Plus' },
            { name: 'iPhone 8' },
            { name: 'iPhone 8 Plus' },
            { name: 'iPhone X' },
            { name: 'iPhone XR' },
            { name: 'iPhone XS' },
            { name: 'iPhone XS MAX' },
            { name: 'iPhone 11' },
            { name: 'iPhone 11 Pro' },
            { name: 'iPhone 11 Pro Max' },
        ]),
        bulkInsert(BulkInsertMutations.surface, [
            { name: 'Glossy' },
            { name: 'Matte' },
            { name: 'Base' },
        ]),
        bulkInsert(BulkInsertMutations.case, [
            {
                name: 'Flexi',
                description:
                    'The Flexi Case is designed with modern form and function in mind. The Flexi Case has an extraordinary Clear TPU shell delivering frosty transparent impact resistance while allowing the allure of the smartphone to shine through.',
                attributes: [
                    'Slim form and lightweight',
                    'Totally flexible, resistant to tear',
                    'Slimline and low profile, fitting tightly',
                    'Precise cut outs for connectivity',
                    'Supports wireless charging',
                ],
            },
            {
                name: 'Snap',
                description:
                    'The Snap Case makes it easy to slide your phone into a pocket or clutch. Its slim form factor and lightweight design give it a modern look. It has minimal impact on overall device size.',
                attributes: [
                    'Extremely strong plastic',
                    'Slim form and lightweight',
                    'Photographic print quality',
                    'Clear, open ports for connectivity',
                    'Supports wireless charging',
                ],
            },
            {
                name: 'Tough',
                description:
                    'Accessorize your phone without sacrificing security with customized Tough Cases! Tough Cases use Impact resistant Polycarbonate outer shell and Inner TPU liner for extra impact resistance. Keep your phone secure & stylish whether headed to the office or wrapped in pastels for a spring time soirée.',
                attributes: [
                    'Dual layer case for extra durability and protection',
                    'Impact resistant Polycarbonate outer shell',
                    'Photographic print quality',
                    'Clear, open ports for connectivity',
                ],
            },
            // {
            //     name: 'Case Mate Slim',
            //     description:
            //         'These premium, super slim cases fit flawlessly, in the meantime being the strongest, lightest and most flexible cases on the market. The surface is perfect for high quality prints, making it a must-have style accessory.',
            //     attributes: [
            //         'Extremely strong plastic',
            //         'Super slim',
            //         'Impact resistant, durable',
            //         'Rubber inside plate',
            //         'Supports wireless charging',
            //     ],
            // },
        ]),
    ]);

    // Get products from printify
    const printifyProducts = await getPrintifyProducts();
    // Get cases, surfaces and devices from fauna
    // TODO: Save extra queries by assigning the
    // ids from the seed response
    const [faunaDevices, faunaCases, faunaSurfaces] = await Promise.all([
        getFaunaDevices(),
        getFaunaCases(),
        getFaunaSurfaces(),
    ]);
    const products: FaunaProduct[] = [];
    const imageUploads: Promise<cloudinary.UploadApiResponse>[] = [];

    for (const printifyProduct of printifyProducts) {
        const variations: FaunaProductVariation[] = [];
        const caseId = printifyProduct.id;
        const productName = printifyProduct.title.trim();
        const metadata: PrintifyProductMetadata = JSON.parse(
            printifyProduct.description.match(/({(.|\n)*})/gm)[0],
        );
        const caseName = metadata.case;

        // Create product variantions
        for (const variant of printifyProduct.variants) {
            if (!variant.is_enabled) {
                continue;
            }

            const variationPrice = variant.price;
            const variationId = variant.id;
            const variationImageUrl = printifyProduct.images.find(
                image =>
                    image.variant_ids.includes(variationId) && image.is_default,
            ).src;

            let [deviceName, variationName] = variant.title.split('/');
            deviceName = deviceName.trim();
            variationName =
                variationName !== undefined ? variationName.trim() : 'Base';

            // Upload variation image
            const variantionImagePublicId = crypto
                .createHash('md5')
                .update(variationImageUrl)
                .digest('hex');
            imageUploads.push(
                uploadImageFromUrlToCloudinary(
                    variationImageUrl,
                    variantionImagePublicId,
                ),
            );

            variations.push({
                price: variationPrice,
                image: variantionImagePublicId,
                printifyId: `${caseId}-${variationId}`,
                case: faunaCases.find(c => c.name === caseName),
                device: faunaDevices.find(d => d.name === deviceName),
                surface: faunaSurfaces.find(s => s.name === variationName),
            });
        }

        let productIndex = products.findIndex(p => p.name === productName);

        // Create product with variations or if product
        // exists add variantions
        if (productIndex === -1) {
            // Upload product image
            const productImageUrl = metadata.image;
            const productTags = metadata.tags;
            const productImagePublicId = crypto
                .createHash('md5')
                .update(productImageUrl)
                .digest('hex');
            imageUploads.push(
                uploadImageFromUrlToCloudinary(
                    productImageUrl,
                    productImagePublicId,
                ),
            );

            products.push({
                name: productName,
                image: productImagePublicId,
                tags: productTags,
                variations: variations,
                cases: [],
                surfaces: [],
                devices: [],
            });
        } else {
            products[productIndex].variations = [
                ...products[productIndex].variations,
                ...variations,
            ];
        }
    }

    // Add devices, cases and surfaces to product
    products.forEach((product, index) =>
        product.variations.forEach(variant => {
            const isCaseAdded = products[index].cases.some(
                c => c._id === variant.case._id,
            );
            const isDeviceAdded = products[index].devices.some(
                d => d._id === variant.device._id,
            );
            const isSurfaceAdded = products[index].surfaces.some(
                s => s._id === variant.surface._id,
            );

            if (!isCaseAdded) {
                products[index].cases.push(variant.case);
            }

            if (!isDeviceAdded) {
                products[index].devices.push(variant.device);
            }

            if (!isSurfaceAdded) {
                products[index].surfaces.push(variant.surface);
            }
        }),
    );

    await createFaunaProducts(products);
    await Promise.all(imageUploads);

    response.status(200).send(products);
};
