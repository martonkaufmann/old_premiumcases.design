import { NowRequest, NowResponse } from '@now/node';
import axios from 'axios';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

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

interface ResponseMetadata {
    case: string;
    image: string;
}

interface Response {
    id: string;
    title: string;
    description: string;
    images: ResponseImages[];
    variants: ResponseVariants[];
}

interface Surface {
    _id: string;
    name: string;
}

interface Case {
    _id: string;
    name: string;
}

interface Device {
    _id: string;
    name: string;
}

interface Variant {
    price: number;
    image: string;
    printifyId: string;
    case: Case;
    surface: Surface;
    device: Device;
}

interface Product {
    name: string;
    image: string;
    devices: Device[];
    cases: Case[];
    surfaces: Surface[];
    variants: Variant[];
}

const dataQuery = `
    query {
        allDevices {
            data {
                _id
                name
            }
        }
        allCases {
            data {
                _id
                name
            }
        }
        allSurfaces {
            data {
                _id
                name
            }
        }
    }
`;

const buildGraphQLCreateMutation = (products: Product[]): string => `mutation {
    ${products.map(
        (product, index) => `q_${index}: createProduct(
            data: {
                name: "${product.name}"
                image: "${product.image}"
                devices: {
                    create: [
                        ${product.devices.map(
                            device => `{
                            name: "${device.name}"
                            cases: {
                                create: [
                                    ${device.cases.map(
                                        c => `{
                                        name: "${c.name}"
                                        printifyID: "${c.id}"
                                        surfaces: {
                                            create: [
                                                ${c.surfaces.map(
                                                    surface => `{
                                                    printifyID: "${surface.id}"
                                                    name: "${surface.name}"
                                                    price: ${surface.price}
                                                    image: "${surface.image}"
                                                }`,
                                                )}
                                            ]
                                        }
                                    }`,
                                    )}
                                ]
                            }
                        }`,
                        )}
                    ]
                }
            }
        ) {
            _id
            name
            devices {
                data {
                    _id
                    name
                    cases {
                        data {
                            _id
                            name
                            printifyID
                            surfaces {
                                data {
                                    _id
                                    printifyID
                                    name
                                    price
                                    image
                                }
                            }
                        }
                    }
                }
            }
        }
    `,
    )}
}`;

export default async (request: NowRequest, response: NowResponse) => {
    dotenv.config();

    cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const printifyResponse = await axios.get(
        `https://api.printify.com/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json?limit=100`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PRINTIFY_TOKEN}`,
            },
        },
    );
    const printifyResponseData = <Response[]>printifyResponse.data.data;

    const r = await axios.post(
        'https://graphql.fauna.com/graphql',
        JSON.stringify({ query: dataQuery }),
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.FAUNADB_TOKEN}`,
            },
        },
    );

    const cases: Case[] = r.data.data.allCases.data
    const devices: Device[] = r.data.data.allDevices.data
    const surfaces: Surface[] = r.data.data.allSurfaces.data
    const products: Product[] = [];

    for (const responseData of printifyResponseData) {
        const variants: Variant[] = []
        const caseId = responseData.id;
        const productName = responseData.title.trim();
        const metadata: ResponseMetadata = JSON.parse(
            responseData.description.match(/({(.|\n)*})/gm)[0],
        );
        const caseName = metadata.case;

        for (const variant of responseData.variants) {
            if (!variant.is_enabled) {
                continue;
            }

            const surfacePrice = variant.price;
            const surfaceId = variant.id;
            const surfaceImage = responseData.images
            .find(
                image => image.variant_ids.includes(surfaceId) && image.is_default,
            )
            .src.replace('-api', '');

            let [deviceName, surfaceName] = variant.title.split('/');
            deviceName = deviceName.trim();
            surfaceName =
                surfaceName !== undefined ? surfaceName.trim() : 'Base';

                // const cloudinaryImage = await cloudinary.v2.uploader.upload(surfaceImage)

                variants.push({
                    price: surfacePrice,
                    // image: cloudinaryImage.public_id,
                    image: 'image',
                    printifyId: `${caseId}-${surfaceId}`,
                    case: cases.find(c => c.name === caseName),
                    device: devices.find(d => d.name === deviceName),
                    surface: surfaces.find(s => s.name === surfaceName),
                })
        }

        let productIndex = products.findIndex(p => p.name === productName);

        if (productIndex === -1) {
            const productImage = metadata.image;
            // const cloudinaryImage = await cloudinary.v2.uploader.upload(productImage)

            products.push({
                name: productName,
                image: 'image',
                // image: cloudinaryImage.public_id,
                variants: variants,
                cases: [],
                surfaces: [],
                devices: []
            })
        } else {
            products[productIndex].variants = [
                ...products[productIndex].variants,
                ...variants,
            ]
        }
    }

    products.forEach((product, index) => (
        product.variants.map(variant => {
            if (!products[index].cases.some(c => c._id === variant.case._id)) {
                products[index].cases.push(variant.case)
            }

            if (!products[index].devices.some(d => d._id === variant.device._id)) {
                products[index].devices.push(variant.device)
            }

            if (!products[index].surfaces.some(s => s._id === variant.surface._id)) {
                products[index].surfaces.push(variant.surface)
            }
        })
    ))

    const faunaResponse = await axios.post(
        'https://graphql.fauna.com/graphql',
        JSON.stringify({ query: buildGraphQLCreateMutation(products) }),
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.FAUNADB_TOKEN}`,
            },
        },
    );

    // response.status(200).send(products);
    response.status(200).send(faunaResponse);
};
