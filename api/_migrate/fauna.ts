import { makeRequest } from './../_helpers/fauna';
import { AxiosResponse } from 'axios';

interface FaunaSurface {
    _id: string;
    name: string;
}

interface FaunaCase {
    _id: string;
    name: string;
}

interface FaunaDevice {
    _id: string;
    name: string;
}

interface FaunaProductVariation {
    price: number;
    image: string;
    printifyId: string;
    case: FaunaCase;
    surface: FaunaSurface;
    device: FaunaDevice;
}

interface FaunaProduct {
    name: string;
    image: string;
    tags: string[];
    devices: FaunaDevice[];
    cases: FaunaCase[];
    surfaces: FaunaSurface[];
    variations: FaunaProductVariation[];
}
enum BulkInsertMutations {
    device = 'createDevice',
    surface = 'createSurface',
    case = 'createCase',
}

const bulkInsert = async (
    mutation: BulkInsertMutations,
    bulkProperties: object[],
): Promise<AxiosResponse> => {
    const query = `
        mutation {
            ${bulkProperties.map(
                (properties, index) => `
            create_${index}: ${mutation}(data: {
                    ${Object.entries(properties).map(([key, value]) => {
                        if (Array.isArray(value)) {
                            return `${key}: [${value
                                .map(v => `"${v}"`)
                                .join(',')}]\n`;
                        }

                        if (typeof value === 'string') {
                            return `${key}: "${value}"\n`;
                        }

                        return `${key}: ${value}\n`;
                    })}
                }) {
                    _id
                }
            `,
            )}
        }
    `;

    return makeRequest(query);
};

const getFaunaDevices = async (): Promise<FaunaDevice[]> => {
    const response = await makeRequest(`
    query {
        allDevices {
            data {
                _id
                name
            }
        }
    }
    `);

    return response.data.data.allDevices.data;
};

const getFaunaSurfaces = async (): Promise<FaunaSurface[]> => {
    const response = await makeRequest(`
    query {
        allSurfaces {
            data {
                _id
                name
            }
        }
    }
    `);

    return response.data.data.allSurfaces.data;
};

const getFaunaCases = async (): Promise<FaunaCase[]> => {
    const response = await makeRequest(`
    query {
        allCases {
            data {
                _id
                name
            }
        }
    }
    `);

    return response.data.data.allCases.data;
};

const createFaunaProducts = async (products: FaunaProduct[]): Promise<void> => {
    const variationCreateQuery = variation => `
    {
        price: ${variation.price}
        image: "${variation.image}",
        printifyId: "${variation.printifyId}"
        device: {
            connect: ${variation.device._id}
        }
        case: {
            connect: ${variation.case._id}
        }
        surface: {
            connect: ${variation.surface._id}
        }
    }
    `;

    await makeRequest(`
    mutation {
        ${products.map(
            (product, index) => `
            createProduct_${index}: createProduct (
                data: {
                    name: "${product.name}"
                    image: "${product.image}"
                    tags: [${product.tags.map(tag => `"${tag}"`).join(',')}]
                    devices: {
                        connect: [
                            ${product.devices.map(device => device._id)}
                        ]
                    }
                    cases: {
                        connect: [
                            ${product.cases.map(c => c._id)}
                        ]
                    }
                            surfaces: {
                        connect: [
                            ${product.surfaces.map(surface => surface._id)}
                        ]
                    }
                    variations: {
                        create: [
                            ${product.variations.map(variationCreateQuery)}
                        ]
                    }
                }
            ) {
                _id
            }
        `,
        )}
    }`);
};

export {
    getFaunaDevices,
    getFaunaCases,
    getFaunaSurfaces,
    createFaunaProducts,
    bulkInsert,
    FaunaDevice,
    FaunaCase,
    FaunaSurface,
    FaunaProductVariation,
    FaunaProduct,
    BulkInsertMutations,
};
