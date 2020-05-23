import { NowRequest, NowResponse } from '@now/node';
import dotenv from 'dotenv';
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

export default async (request: NowRequest, response: NowResponse) => {
    dotenv.config();

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

    const printifyProducts = await getPrintifyProducts();
    const [faunaDevices, faunaCases, faunaSurfaces] = await Promise.all([
        getFaunaDevices(),
        getFaunaCases(),
        getFaunaSurfaces(),
    ]);
    const products: FaunaProduct[] = [];

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

            const surfacePrice = variant.price;
            const surfaceId = variant.id;
            const surfaceImage = printifyProduct.images
                .find(
                    image =>
                        image.variant_ids.includes(surfaceId) &&
                        image.is_default,
                )
                .src.replace('-api', '');

            let [deviceName, surfaceName] = variant.title.split('/');
            deviceName = deviceName.trim();
            surfaceName =
                surfaceName !== undefined ? surfaceName.trim() : 'Base';

            variations.push({
                price: surfacePrice,
                image: surfaceImage,
                printifyId: `${caseId}-${surfaceId}`,
                case: faunaCases.find(c => c.name === caseName),
                device: faunaDevices.find(d => d.name === deviceName),
                surface: faunaSurfaces.find(s => s.name === surfaceName),
            });
        }

        let productIndex = products.findIndex(p => p.name === productName);

        // Only add product variantions if product
        // already exists
        if (productIndex === -1) {
            const productImage = metadata.image;

            products.push({
                name: productName,
                image: productImage,
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
        product.variations.map(variant => {
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

    response.status(200).send(products);
};
