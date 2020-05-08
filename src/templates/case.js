import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import LoadingButton from '../components/Buttons/Loading';

import Layout from '../components/layout';
import SEO from '../components/seo';

const CaseTemplate = ({ pageContext: { c } }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    // const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const [selectedSurface, setSelectedSurface] = useState(0);

    // const selectableTypeIndex = c.devices.findIndex(
    //     device => device.name === selectedDevice,
    // );
    // const selectableTypeIndex = c.devices[selectedDeviceIndex].types.findIndex(
    //     type => type.name === selectedType,
    // );

    // const selectableTypes = c.devices[selectedDevice].types;
    // const selectableSurfaces = c.devices[selectedDevice].types[selectedType].surfaces;

    console.log(c);
    console.log(selectedDevice);
    console.log(selectedType);
    console.log(selectedSurface);
    console.log(c.devices[selectedDevice].types[selectedType].surfaces[selectedSurface].image);
    // console.log(c.devices[selectedDevice].types[selectedType].surfaces[selectedSurface].image)

    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "Cute-Night-Flowers-Tough-Case.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            placeholderImage2: file(relativePath: { eq: "Blue-Pattern-Tiger-Case-Front.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    // const [selectedPrice, setSelectedPrice] = useState(
    //     c.devices[0].types[0].surfaces[0].price,
    // );
    // const [selectedImage, setSelectedImage] = useState(
    //     c.devices[0].types[0].surfaces[0].image,
    // );

    const onAddToCartClick = () => {
        console.log('Add to cart');
        setIsAddingToCart(true);

        setTimeout(() => setIsAddingToCart(false), 2000);
    };

    const onSelectedDeviceChange = event => {
        const deviceIndex = c.devices.findIndex(device => device.name === event.target.value);

        console.log(deviceIndex);

        setSelectedDevice(deviceIndex);
        // setSelectedType(c.devices[deviceIndex].types[0])
        // setSelectedSurface(c.devices[deviceIndex].types[0].surfaces[0])
    };

    const onSelectedTypeChange = event => {
        const typeIndex = c.devices[selectedDevice].types.findIndex(type => type.name === event.target.value);

        console.log(typeIndex);

        setSelectedType(typeIndex);
        // setSelectedSurface(c.devices[selectedDevice].types[typeIndex].surfaces[0])
    };

    const onSelectedSurfaceChange = event => {
        const surfaceIndex = c.devices[selectedDevice].types[selectedType].surfaces.findIndex(
            surface => surface.name === event.target.value,
        );

        console.log(surfaceIndex);

        setSelectedSurface(surfaceIndex);
    };

    // console.log(selectableSurfaces);
    // console.log(c.devices);
    return (
        <Layout>
            <SEO title="Page two" />
            <section className="flex md:flex-row flex-col flex-col-reverse justify-between mb-20">
                <section className="xl:w-4/6 w-full">
                    <Img fluid={data.placeholderImage.childImageSharp.fluid} />
                    <article className="px-8">
                        <p className="mb-3">
                            Accessorize your phone without sacrificing security with customized Tough Cases! Tough Cases
                            use Impact resistant Polycarbonate outer shell and Inner TPU liner for extra impact
                            resistance. Keep your phone secure & stylish whether headed to the office or wrapped in
                            pastels for a spring time soirée.
                        </p>
                        <p className="mb-3">Excellent resistance to outdoor weathering, longterm optical quality.</p>
                        <p>
                            Made of impact resistant TPU material with good shock absorption, protecting against drop
                            and tear.
                        </p>
                    </article>
                </section>
                <aside className="px-8 md:mt-4 lg:mt-6 xl:mt-16 xl:w-2/6 w-full">
                    <section className="mb-8">
                        <header className="text-2xl mb-3">{c.name}</header>
                        <section className="mb-4 text-gray-600">
                            <ol>
                                <li>Dual layer case for extra durability and protection</li>
                                <li>Impact resistant Polycarbonate outer shell</li>
                                <li>Photographic print quality</li>
                                <li>Clear, open ports for connectivity</li>
                            </ol>
                        </section>
                        <span className="text-2xl">$20.00</span>
                    </section>
                    <section className="mb-10 md:mb-0 w-full">
                        <header className="text-lg mb-2 text-gray-600">Device</header>
                        <select
                            className="appearance-none border-2 border-gray-400 rounded w-full px-2 py-2"
                            onChange={onSelectedDeviceChange}
                        >
                            {c.devices.map(device => (
                                <option value={device.name}>{device.name}</option>
                            ))}
                        </select>
                        <header className="text-lg mb-2 mt-6 text-gray-600">Case</header>
                        <select
                            className="appearance-none border-2 border-gray-400 rounded w-full px-2 py-2"
                            onChange={onSelectedTypeChange}
                        >
                            {c.devices[selectedDevice].types.map(type => (
                                <option value={type.name}>{type.name}</option>
                            ))}
                        </select>
                        <header className="text-lg mb-2 mt-6 text-gray-600">Surface</header>
                        <select
                            className="appearance-none border-2 border-gray-400 rounded w-full px-2 py-2"
                            onChange={onSelectedSurfaceChange}
                        >
                            {c.devices[selectedDevice].types[selectedType].surfaces.map(surface => (
                                <option value={surface.name}>{surface.name}</option>
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
                <header className="text-xl font-bold p-3 mb-12 bg-gray-900 text-white">Similair designs</header>
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
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
                </section>
            </section>
        </Layout>
    );
};

export default CaseTemplate;
