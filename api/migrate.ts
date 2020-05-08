import { NowRequest, NowResponse } from '@now/node';
import axios from 'axios';

interface ResponseImages {
    src: string;
    variant_ids: number[];
    is_default: boolean;
}

interface ResponseVariants {
    id: number;
    title: string;
    price: number;
    is_enabled: boolean;
}

interface Response {
    id: string;
    title: string;
    description: string;
    images: ResponseImages[];
    variants: ResponseVariants[];
}

interface Surface {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface Case {
    name: string;
    surfaces: Surface[];
}

interface Device {
    name: string;
    cases: Case[];
}

interface Product {
    id: string;
    name: string;
    devices: Device[];
}

const createSurfaceIfNotExists = (
    products: Product[],
    pId: number,
    dId: number,
    cId: number,
    { id, name, price, image },
) => {
    let index = products[pId].devices[dId].cases[cId].surfaces.findIndex(s => s.name === name);
    if (index === -1) {
        products[pId].devices[dId].cases[cId].surfaces.push({
            id,
            name,
            price,
            image,
        });
    }

    return index;
};

const findOrCreateCase = (products: Product[], pId: number, dId: number, { name }): number => {
    let index = products[pId].devices[dId].cases.findIndex(c => c.name === name);

    if (index === -1) {
        index =
            products[pId].devices[dId].cases.push({
                name,
                surfaces: [],
            }) - 1;
    }

    return index;
};

const findOrCreateDevice = (products: Product[], pId: number, { name }): number => {
    let index = products[pId].devices.findIndex(d => d.name === name);

    if (index === -1) {
        index =
            products[pId].devices.push({
                name,
                cases: [],
            }) - 1;
    }

    return index;
};

const findOrCreateProduct = (product: Product[], { id, name }): number => {
    let index = product.findIndex(p => p.name === name);

    if (index === -1) {
        index = product.push({ id, name, devices: [] }) - 1;
    }

    return index;
};

const findSurfaceImage = (images: ResponseImages[], variantId: number): string =>
    images.find(image => image.variant_ids.includes(variantId) && image.is_default).src;

export default async (request: NowRequest, response: NowResponse) => {
    const printifyResponse = await axios.get('https://api.printify.com/v1/shops/1686917/products.json?limit=100', {
        headers: {
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2MWIyZTM1MmM4Y2E3MWM4NzAzNjlhOWVjODJkODQyY2NiYTU4YzFjMGM2YTZiMDVmM2JmOGQ4OTA2MmNmNjVjNjNhY2IwMmZlNzk4MWE2In0.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI2MWIyZTM1MmM4Y2E3MWM4NzAzNjlhOWVjODJkODQyY2NiYTU4YzFjMGM2YTZiMDVmM2JmOGQ4OTA2MmNmNjVjNjNhY2IwMmZlNzk4MWE2IiwiaWF0IjoxNTg4NTkzNTM5LCJuYmYiOjE1ODg1OTM1MzksImV4cCI6MTYyMDEyOTUzOSwic3ViIjoiNzEyMDU2NCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiXX0.AHtPGKhcIKZRSwuOpBK81tqCQNlIS25dc9vIHvrqvmE0IuIpPFclbJYy7IDEtxSxt6cT2V-3IsQ4kSohleA',
        },
    });
    const printifyResponseData = <Response[]>printifyResponse.data.data;

    const products: Product[] = [];

    for (const responseData of printifyResponseData) {
        const productId = responseData.id;
        let [productName, caseName] = responseData.title.split('/');
        productName = productName.trim();
        caseName = caseName.trim();

        let productIndex = findOrCreateProduct(products, { id: productId, name: productName });

        for (const variant of responseData.variants) {
            if (!variant.is_enabled) {
                continue;
            }

            const caseSurfacePrice = variant.price;
            const caseSurfaceId = variant.id;
            const caseSurfaceImage = findSurfaceImage(responseData.images, variant.id);

            let [deviceName, caseSurfaceName] = variant.title.split('/');
            deviceName = deviceName.trim();
            caseSurfaceName = caseSurfaceName !== undefined ? caseSurfaceName.trim() : 'Default';

            let deviceIndex = findOrCreateDevice(products, productIndex, {
                name: deviceName,
            });

            let caseIndex = findOrCreateCase(products, productIndex, deviceIndex, { name: caseName });

            createSurfaceIfNotExists(products, productIndex, deviceIndex, caseIndex, {
                id: caseSurfaceId,
                name: caseSurfaceName,
                price: caseSurfacePrice,
                image: caseSurfaceImage
                // image: `${deviceId}-${caseSurfaceId}.jpg`,
            });
        }
    }

    response.status(200).send({products});
};
