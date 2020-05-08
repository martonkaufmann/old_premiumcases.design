/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const axios = require('axios');
// const fs = require('fs');
const http2 = require('http2');
const http = require('http');
const fs = require('fs');
const path = require('path');

const downloadCaseImage = async (filename, url) => {
    const writeStream = fs.createWriteStream(path.resolve(__dirname, 'src/images/cases', filename));

    // TODO: Find out why certain images fail at bigger resolutions,
    // specifically flexi cases
    return axios
        .get(url + '?s=1024', {
            // decompress: false,
            responseType: 'stream',
            // headers: {
            //     Authorization:
            //         'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2MWIyZTM1MmM4Y2E3MWM4NzAzNjlhOWVjODJkODQyY2NiYTU4YzFjMGM2YTZiMDVmM2JmOGQ4OTA2MmNmNjVjNjNhY2IwMmZlNzk4MWE2In0.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI2MWIyZTM1MmM4Y2E3MWM4NzAzNjlhOWVjODJkODQyY2NiYTU4YzFjMGM2YTZiMDVmM2JmOGQ4OTA2MmNmNjVjNjNhY2IwMmZlNzk4MWE2IiwiaWF0IjoxNTg4NTkzNTM5LCJuYmYiOjE1ODg1OTM1MzksImV4cCI6MTYyMDEyOTUzOSwic3ViIjoiNzEyMDU2NCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiXX0.AHtPGKhcIKZRSwuOpBK81tqCQNlIS25dc9vIHvrqvmE0IuIpPFclbJYy7IDEtxSxt6cT2V-3IsQ4kSohleA',
            // },
        })
        .then(response => {
            response.data.pipe(writeStream);
        });
};

const getCases = async () => {
    const response = await axios.get('https://api.printify.com/v1/shops/1686917/products.json?limit=100', {
        headers: {
            Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI2MWIyZTM1MmM4Y2E3MWM4NzAzNjlhOWVjODJkODQyY2NiYTU4YzFjMGM2YTZiMDVmM2JmOGQ4OTA2MmNmNjVjNjNhY2IwMmZlNzk4MWE2In0.eyJhdWQiOiIzN2Q0YmQzMDM1ZmUxMWU5YTgwM2FiN2VlYjNjY2M5NyIsImp0aSI6ImI2MWIyZTM1MmM4Y2E3MWM4NzAzNjlhOWVjODJkODQyY2NiYTU4YzFjMGM2YTZiMDVmM2JmOGQ4OTA2MmNmNjVjNjNhY2IwMmZlNzk4MWE2IiwiaWF0IjoxNTg4NTkzNTM5LCJuYmYiOjE1ODg1OTM1MzksImV4cCI6MTYyMDEyOTUzOSwic3ViIjoiNzEyMDU2NCIsInNjb3BlcyI6WyJzaG9wcy5tYW5hZ2UiLCJzaG9wcy5yZWFkIiwiY2F0YWxvZy5yZWFkIiwib3JkZXJzLnJlYWQiLCJvcmRlcnMud3JpdGUiLCJwcm9kdWN0cy5yZWFkIiwicHJvZHVjdHMud3JpdGUiLCJ3ZWJob29rcy5yZWFkIiwid2ViaG9va3Mud3JpdGUiLCJ1cGxvYWRzLnJlYWQiLCJ1cGxvYWRzLndyaXRlIiwicHJpbnRfcHJvdmlkZXJzLnJlYWQiXX0.AHtPGKhcIKZRSwuOpBK81tqCQNlIS25dc9vIHvrqvmE0IuIpPFclbJYy7IDEtxSxt6cT2V-3IsQ4kSohleA',
        },
    });

    const cases = [];

    for (const caseData of response.data.data) {
        const caseId = caseData.id;
        let [caseName, caseType] = caseData.title.split('/');
        caseName = caseName.trim();
        caseType = caseType.trim();
        const caseVariants = caseData.variants;

        let caseIndex = cases.findIndex(c => c.name === caseName);
        if (caseIndex === -1) {
            caseIndex = cases.push({ name: caseName, devices: [] }) - 1;
        }

        for (const caseVariant of caseVariants) {
            if (!caseVariant.is_enabled) {
                continue;
            }

            const caseVariantPrice = caseVariant.price;
            const caseVariantId = caseVariant.id;
            const caseVariantImage = caseData.images.find(
                image => image.variant_ids.includes(caseVariant.id) && image.is_default,
            ).src;

            let [deviceName, caseSurface] = caseVariant.title.split('/');
            deviceName = deviceName.trim();
            caseSurface = caseSurface !== undefined ? caseSurface.trim() : 'Default';

            let deviceIndex = cases[caseIndex].devices.findIndex(d => d.name === deviceName);
            if (deviceIndex === -1) {
                deviceIndex =
                    cases[caseIndex].devices.push({
                        id: caseId,
                        name: deviceName,
                        types: [],
                    }) - 1;
            }

            let typeIndex = cases[caseIndex].devices[deviceIndex].types.findIndex(t => t.name === caseType);
            if (typeIndex === -1) {
                typeIndex =
                    cases[caseIndex].devices[deviceIndex].types.push({
                        name: caseType,
                        surfaces: [],
                    }) - 1;
            }

            let surfaceIndex = cases[caseIndex].devices[deviceIndex].types[typeIndex].surfaces.findIndex(
                s => s.name === caseSurface,
            );
            if (surfaceIndex === -1) {
                cases[caseIndex].devices[deviceIndex].types[typeIndex].surfaces.push({
                    id: caseVariantId,
                    name: caseSurface,
                    price: caseVariantPrice,
                    image: `${caseId}-${caseVariantId}.jpg`,
                });

                // fs.appendFileSync('debug.log', `${caseId}-${caseVariantId}\n`)

                console.log('==DOWNLOADING==' + `${caseId}-${caseVariantId}.jpg`);
                console.log('==DOWNLOADING==' + `${caseId}-${caseVariantId}.jpg`);
                console.log(caseId);
                console.log(caseName);
                console.log(caseVariantId);
                console.log(`${caseId}-${caseVariantId}.jpg`);
                console.log(caseVariantImage);
                // console.log(response.data.count())
                await downloadCaseImage(`${caseId}-${caseVariantId}.jpg`, caseVariantImage);
                console.log('==DOWNLOADED==' + `${caseId}-${caseVariantId}.jpg`);
                console.log('==DOWNLOADED==' + `${caseId}-${caseVariantId}.jpg`);
            }
        }
    }

    // await sleep(10000);
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 100000);
    //   });

    return cases;
};

exports.createPages = async ({ actions }) => {
    const { createPage } = actions;

    for (const c of await getCases()) {
        createPage({
            path: `/case/${c.id}`,
            component: require.resolve(`./src/templates/case.js`),
            context: { c },
        });
    }
};
