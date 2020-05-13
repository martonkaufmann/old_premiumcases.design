import { makeRequest } from './../_helpers/fauna';

enum SupportedMutations {
    device = 'createDevice',
    surface = 'createSurface',
    case = 'createCase',
}

const bulkInsertNamed = async (
    mutation: SupportedMutations,
    names: string[],
): Promise<any> => {
    const query = `
        mutation {
            ${names.map(
                (name, index) => `
            create_${index}: ${mutation}(data: {
                    name: "${name}"
                }) {
                    _id
                }
            `,
            )}
        }
    `;

    return makeRequest(query);
};

export { bulkInsertNamed, SupportedMutations };
