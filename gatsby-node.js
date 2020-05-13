/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        query {
            fauna {
                allProducts {
                    data {
                        _id
                        name
                    }
                }
            }
        }
    `);

    result.data.fauna.allProducts.data.map(({ _id, name }) => {
        return createPage({
            path: `/product/${_id}/${name}`,
            component: path.resolve(`./src/templates/product.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                _id,
            },
        });
    });
};
