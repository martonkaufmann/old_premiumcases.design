import React, { useState } from 'react';
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
    console.log(product);

    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(
        product.variations.data[0].device._id,
    );
    const [selectedCase, setSelectedCase] = useState(
        product.variations.data[0].case._id,
    );
    const [selectedSurface, setSelectedSurface] = useState(
        product.variations.data[0].surface._id,
    );
    const currentVariation = product.variations.data.find(
        variation =>
            variation.device._id === selectedDevice &&
            variation.surface._id === selectedSurface &&
            variation.case._id === selectedCase,
    );

    const onAddToCartClick = () => {
        setIsAddingToCart(true);

        setTimeout(() => setIsAddingToCart(false), 2000);
    };

    const onSelectedDeviceChange = event => {
        const variation = product.variations.data.find(
            variation => variation.device._id === event.target.value,
        );

        setSelectedDevice(event.target.value);
        setSelectedCase(variation.case._id);
        setSelectedSurface(variation.surface._id);
    };

    const onSelectedCaseChange = event => {
        const variation = product.variations.data.find(
            variation =>
                variation.device._id === selectedDevice &&
                variation.case._id === event.target.value,
        );

        setSelectedCase(event.target.value);
        setSelectedSurface(variation.surface._id);
    };

    const onSelectedSurfaceChange = event => {
        setSelectedSurface(event.target.value);
    };

    return (
        <Layout>
            <SEO title="Page two" />
            <section className="flex md:flex-row flex-col flex-col-reverse justify-between mb-20">
                <section className="xl:w-4/6 w-full">
                    <ResponsiveImage publicId={currentVariation.image} />
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
                            ${(currentVariation.price / 100).toFixed(2)}
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
                            {product.cases.data
                                .filter(c =>
                                    product.variations.data.some(
                                        variation =>
                                            variation.device._id ===
                                                selectedDevice &&
                                            variation.case._id === c._id,
                                    ),
                                )
                                .map(c => (
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
                            {product.surfaces.data
                                .filter(surface =>
                                    product.variations.data.some(
                                        variation =>
                                            variation.device._id ===
                                                selectedDevice &&
                                            variation.case._id ===
                                                selectedCase &&
                                            variation.surface._id ===
                                                surface._id,
                                    ),
                                )
                                .map(surface => (
                                    <option
                                        key={surface._id}
                                        value={surface._id}
                                    >
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
                        name
                    }
                }
                cases {
                    data {
                        _id
                        name
                    }
                }
                surfaces {
                    data {
                        _id
                        name
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
                        }
                        case {
                            _id
                        }
                        surface {
                            _id
                        }
                    }
                }
            }
        }
    }
`;

export default ProductTemplate;
