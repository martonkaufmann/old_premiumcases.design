import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import axios from 'axios';
import Layout from '../components/layout';
import SEO from '../components/seo';
import HotIcon from './../components/Icons/hotIcon';

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage2: file(relativePath: { eq: "Blue-Pattern-Tiger-Case-Front.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            header: file(relativePath: { eq: "header.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1400) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            flexiCase: file(relativePath: { eq: "flexi-case.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            snapCase: file(relativePath: { eq: "snap-case.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            toughCase: file(relativePath: { eq: "tough-case.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <SEO title="Home" />
            <header className="w-full relative">
                <Img className="h-full" fluid={data.header.childImageSharp.fluid} />

                <h1 className="sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase absolute bottom-0 left-0 bg-red-500 text-white mb-12 md:mb-24 md:ml-8 p-3">
                    Accessorise your phone with a premium quality case printed on demand
                </h1>
                <h2 className="font-bold text-md md:text-xl absolute bottom-0 left-0 bg-gray-900 text-white mb-2 md:mb-12 md:ml-8 p-3">
                    New designs each day, be sure to check back!
                </h2>
            </header>
            <header className=" flex items-center text-xl font-bold border-b p-3 mb-12 bg-red-500 text-white">
                <HotIcon className="w-8 h-8 mr-1 text-gray-900 fill-current" />
                Designs of the day
            </header>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 row-gap-12 col-gap-12 sm:col-gap-24 mb-32">
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header className="bg-gray-900 font-bold text-white p-3 w-full">Blue Tiger Pattern Case</header>
                </section>
            </section>
            <section className="grid md:grid-cols-3 gap-6 mx-4 md:mx-0 mb-32">
                <section className="text-left">
                    <Img fluid={data.flexiCase.childImageSharp.fluid} />
                    <header className="bg-gray-900 text-white p-3">Flexi cases</header>
                </section>
                <section className="text-left">
                    <Img fluid={data.snapCase.childImageSharp.fluid} />
                    <header className="bg-gray-900 text-white p-3">Snap cases</header>
                </section>
                <section className="text-left">
                    <Img fluid={data.toughCase.childImageSharp.fluid} />
                    <header className="bg-gray-900 text-white p-3">Tough cases</header>
                </section>
            </section>

            <header className=" flex items-center text-xl font-bold border-b p-3 mb-12 bg-gray-900 text-white">
                Catalog
            </header>
            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 row-gap-16 col-gap-12 sm:col-gap-24">
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
                <section className="text-left">
                    <Img className="mb-3" fluid={data.placeholderImage2.childImageSharp.fluid} />
                    <header>
                        <h1 className="">Blue Tiger Pattern Case</h1>
                        <span className="text-gray-600 font-hairline">$16.00</span>
                    </header>
                </section>
            </section>
            <button className="bg-red-500 text-white mx-auto p-3 block mt-12 mb-24">Show More</button>
            <section className="w-full md:w-1/2 mx-auto flex flex-wrap justify-center my-24">
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 7</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 7 Plus</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 8</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 8 Plus</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 9</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone X</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone XS</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone XS MAX</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone XR</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 11</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 11 Pro</span>
                <span className="bg-gray-900 text-white p-3 flex-shrink-0 m-3">iPhone 11 Pro Max</span>
            </section>
        </Layout>
    );
};

export default IndexPage;
