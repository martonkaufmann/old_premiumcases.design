import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import ResponsiveImage from '../components/Images/ResponsiveImage';
import LoadingButton from '../components/Buttons/Loading';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const ProductTemplate = ({
    data: {
        fauna: { findProductByID: product },
    },
}) => {
    // console.log(product)

    // return <div>Hi</div>

    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedSurface, setSelectedSurface] = useState(null);

    console.log(process.env);

    useEffect(() => {}, []);

    const onAddToCartClick = () => {
        setIsAddingToCart(true);

        setTimeout(() => setIsAddingToCart(false), 2000);
    };

    const onSelectedDeviceChange = event => {
        // const device = product.devices.data.find(
        //     device => device._id === event.target.value,
        // );

        setSelectedDevice(event.target.value);
        setSelectedCase(null);
        setSelectedSurface(null);
    };

    const onSelectedCaseChange = event => {
        // const case = product.devices.data[
        //     selectedDevice
        // ].cases.data.findIndex(c => c._id === event.target.value);

        setSelectedCase(event.target.value);
        setSelectedSurface(null);
    };

    const onSelectedSurfaceChange = event => {
        // const surfaceIndex = product.devices.data[selectedDevice].cases.data[
        //     selectedCase
        // ].surfaces.data.findIndex(
        //     surface => surface._id === event.target.value,
        // );

        setSelectedSurface(event.target.value);
    };

    return (
        <Layout>
            <SEO title="Page two" />
            <section className="flex md:flex-row flex-col flex-col-reverse justify-between mb-20">
                <section className="xl:w-4/6 w-full">
                    <ResponsiveImage
                        publicId={
                            product.devices.data[selectedDevice].cases.data[
                                selectedCase
                            ].surfaces.data[selectedSurface].image
                        }
                    />
                    <article className="px-8">
                        <p className="mb-3">
                            Accessorize your phone without sacrificing security
                            with customized Tough Cases! Tough Cases use Impact
                            resistant Polycarbonate outer shell and Inner TPU
                            liner for extra impact resistance. Keep your phone
                            secure & stylish whether headed to the office or
                            wrapped in pastels for a spring time soirée.
                        </p>
                        <p className="mb-3">
                            Excellent resistance to outdoor weathering, longterm
                            optical quality.
                        </p>
                        <p>
                            Made of impact resistant TPU material with good
                            shock absorption, protecting against drop and tear.
                        </p>
                    </article>
                </section>
                <aside className="px-8 md:mt-4 lg:mt-6 xl:mt-16 xl:w-2/6 w-full">
                    <section className="mb-8">
                        <header className="text-2xl mb-3">
                            {product.name}
                        </header>
                        <section className="mb-4 text-gray-600">
                            <ol>
                                <li>
                                    Dual layer case for extra durability and
                                    protection
                                </li>
                                <li>
                                    Impact resistant Polycarbonate outer shell
                                </li>
                                <li>Photographic print quality</li>
                                <li>Clear, open ports for connectivity</li>
                            </ol>
                        </section>
                        <span className="text-2xl">
                            $
                            {(
                                product.devices.data[selectedDevice].cases.data[
                                    selectedCase
                                ].surfaces.data[selectedSurface].price / 100
                            ).toFixed(2)}
                        </span>
                    </section>
                    <section className="mb-10 md:mb-0 w-full">
                        <header className="text-lg mb-2 text-gray-600">
                            Device
                        </header>
                        <select
                            className="appearance-none border-2 border-gray-400 rounded w-full px-2 py-2"
                            onChange={onSelectedDeviceChange}
                        >
                            {product.devices.data.map(device => (
                                <option key={device._id} value={device._id}>
                                    {device.name}
                                </option>
                            ))}
                        </select>
                        <header className="text-lg mb-2 mt-6 text-gray-600">
                            Case
                        </header>
                        <select
                            className="appearance-none border-2 border-gray-400 rounded w-full px-2 py-2"
                            onChange={onSelectedCaseChange}
                        >
                            {product.devices.data[
                                selectedDevice
                            ].cases.data.map(c => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <header className="text-lg mb-2 mt-6 text-gray-600">
                            Surface
                        </header>
                        <select
                            className="appearance-none border-2 border-gray-400 rounded w-full px-2 py-2"
                            onChange={onSelectedSurfaceChange}
                        >
                            {product.devices.data[selectedDevice].cases.data[
                                selectedCase
                            ].surfaces.data.map(surface => (
                                <option key={surface._id} value={surface._id}>
                                    {surface.name}
                                </option>
                            ))}
                        </select>
                        {isAddingToCart ? (
                            <LoadingButton className="w-full mt-12 bg-red-500 text-white p-3" />
                        ) : (
                            <button
                                className="w-full mt-12 bg-red-500 text-white py-3 flex justify-center"
                                onClick={onAddToCartClick}
                            >
                                Add to cart
                            </button>
                        )}
                    </section>
                </aside>
            </section>
            <section className="px-8">
                <header className="text-xl font-bold p-3 mb-12 bg-gray-900 text-white">
                    {/* Similair designs */}
                    You might also like
                </header>
                {/* <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    <section className="text-left px-6">
                        <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                        <header>
                            <h1 className="">Blue Tiger Pattern Case</h1>
                            <span className="text-gray-600 font-hairline">$16.00</span>
                        </header>
                    </section>
                    <section className="text-left px-6">
                        <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                        <header>
                            <h1 className="">Blue Tiger Pattern Case</h1>
                            <span className="text-gray-600 font-hairline">$16.00</span>
                        </header>
                    </section>
                    <section className="text-left px-6">
                        <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                        <header>
                            <h1 className="">Blue Tiger Pattern Case</h1>
                            <span className="text-gray-600 font-hairline">$16.00</span>
                        </header>
                    </section>
                    <section className="text-left px-6">
                        <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                        <header>
                            <h1 className="">Blue Tiger Pattern Case</h1>
                            <span className="text-gray-600 font-hairline">$16.00</span>
                        </header>
                    </section>
                    <section className="text-left px-6">
                        <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                        <header>
                            <h1 className="">Blue Tiger Pattern Case</h1>
                            <span className="text-gray-600 font-hairline">$16.00</span>
                        </header>
                    </section>
                    <section className="text-left px-6">
                        <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                        <header>
                            <h1 className="">Blue Tiger Pattern Case</h1>
                            <span className="text-gray-600 font-hairline">$16.00</span>
                        </header>
                    </section>
                </section> */}
            </section>
        </Layout>
    );
};

// export const query = graphql`
//   query {
//     query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//       }
//     }
//   }
//   }
// `
export const query = graphql`
    query($_id: ID!) {
        fauna {
            findProductByID(id: $_id) {
                _id
                name
                image
                devices {
                    data {
                        _id
                    }
                }
                cases {
                    data {
                        _id
                    }
                }
                surfaces {
                    data {
                        _id
                    }
                }
                variations {
                    data {
                        _id
                        image
                        price
                        printifyId
                        device {
                            _id
                            name
                        }
                        case {
                            _id
                            name
                        }
                        surface {
                            _id
                            name
                        }
                    }
                }
            }
        }
    }
`;

export default ProductTemplate;
