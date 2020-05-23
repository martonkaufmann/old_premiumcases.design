/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

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

    for (const product of result.data.fauna.allProducts.data) {
        createPage({
            path: `/case/${product.name}`,
            component: path.resolve(`./src/templates/product.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                _id: product._id,
            },
        });
    }
};
