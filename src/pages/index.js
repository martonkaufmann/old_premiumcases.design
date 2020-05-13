import React from 'react';

import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import HotIcon from './../components/Icons/HotIcon';
import ResponsiveImage from '../components/Images/ResponsiveImage';
import DeviceFaceImage from '../components/Images/DeviceFaceImage';

const IndexPage = ({
    data: {
        fauna: {
            allDevices: { data: devices },
            allProducts: { data: products },
        },
    },
}) => {
    const latestProducts = products.slice(0, 8);
    const showcaseProducts = products.slice(8);

    return (
        <Layout>
            <SEO title="Home" />
            <header className="w-full relative">
                <ResponsiveImage publicId="header_e8yldo" />
                <h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase absolute bottom-0 left-0 bg-red-500 text-white mb-12 md:mb-24 md:ml-8 p-3">
                    Accessorise your phone with a premium quality case printed
                    on demand
                </h1>
                <h2 className="font-bold text-md md:text-xl absolute bottom-0 left-0 bg-gray-900 text-white mb-2 md:mb-12 md:ml-8 p-3">
                    New designs each day, be sure to check back!
                </h2>
            </header>
            <header className=" flex items-center text-xl font-bold border-b p-3 mb-12 bg-red-500 text-white">
                <HotIcon className="w-8 h-8 mr-1 text-gray-900 fill-current" />
                Latest designs
            </header>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 row-gap-12 col-gap-12 sm:col-gap-24 mb-32">
                {latestProducts.map(product => (
                    <Link to={`/product/${product._id}/${product.name}`}>
                        <section className="text-left">
                            <DeviceFaceImage
                                className="mb-3"
                                publicId="pqrqkoqtbtte69bjjzc6"
                            />
                            <header className="bg-gray-900 font-bold text-white p-3 w-full">
                                {product.name}
                            </header>
                        </section>
                    </Link>
                ))}
            </section>
            <section className="grid md:grid-cols-3 gap-6 mx-4 md:mx-0 mb-32">
                <section className="text-left">
                    <ResponsiveImage publicId="flexi-case_hqs9sv" />
                    <header className="bg-gray-900 text-white p-3">
                        Flexi cases
                    </header>
                </section>
                <section className="text-left">
                    <ResponsiveImage publicId="snap-case_d3mkdi" />
                    <header className="bg-gray-900 text-white p-3">
                        Snap cases
                    </header>
                </section>
                <section className="text-left">
                    <ResponsiveImage publicId="tough-case_bpo6uj" />
                    <header className="bg-gray-900 text-white p-3">
                        Tough cases
                    </header>
                </section>
            </section>

            <header className=" flex items-center text-xl font-bold border-b p-3 mb-12 bg-gray-900 text-white">
                Catalog
            </header>
            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 row-gap-16 col-gap-12 sm:col-gap-24">
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
                <section className="text-left">
                    <DeviceFaceImage
                        className="mb-3"
                        publicId="pqrqkoqtbtte69bjjzc6"
                    />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">
                            $16.00
                        </span>
                    </header>
                </section>
            </section>
            <button className="bg-red-500 text-white mx-auto p-3 block mt-12 mb-24">
                Show More
            </button>
            <section className="w-full md:w-1/2 mx-auto flex flex-wrap justify-center my-24">
                {devices.map(device => (
                    <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">
                        {device.name}
                    </span>
                ))}
            </section>
        </Layout>
    );
};

export const query = graphql`
    query {
        fauna {
            allDevices {
                data {
                    _id
                    name
                }
            }
            allProducts(_size: 23) {
                data {
                    _id
                    name
                }
            }
        }
    }
`;

export default IndexPage;
