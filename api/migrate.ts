import crypto from 'crypto';
import dotenv from 'dotenv';
import { NowRequest, NowResponse } from '@now/node';
import {
    getPrintifyProducts,
    PrintifyProductMetadata,
} from './_migrate/printify';
import {
    getFaunaDevices,
    getFaunaCases,
    getFaunaSurfaces,
    createFaunaProducts,
    bulkInsertNamed,
    FaunaProductVariation,
    FaunaProduct,
    BulkInsertNamedMutations,
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
        bulkInsertNamed(BulkInsertNamedMutations.device, [
            'iPhone 7',
            'iPhone 7 Plus',
            'iPhone 8',
            'iPhone 8 Plus',
            'iPhone X',
            'iPhone XR',
            'iPhone XS',
            'iPhone XS MAX',
            'iPhone 11',
            'iPhone 11 Pro',
            'iPhone 11 Pro Max',
        ]),
        bulkInsertNamed(BulkInsertNamedMutations.surface, [
            'Glossy',
            'Matte',
            'Base',
        ]),
        bulkInsertNamed(BulkInsertNamedMutations.case, [
            'Flexi',
            'Snap',
            'Tough',
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
            const variationImageUrl = printifyProduct.images
                .find(
                    image =>
                        image.variant_ids.includes(variationId) &&
                        image.is_default,
                )
                .src.replace('-api', '');

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
