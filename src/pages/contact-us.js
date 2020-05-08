import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import HotIcon from './../components/Icons/hotIcon';

const ContactUsPage = () => {
    const data = useStaticQuery(graphql`
        query {
            placeholderImage2: file(relativePath: { eq: "Blue-Pattern-Tiger-Case-Front.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 1200) {
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
            <header>Unique designs each day</header>
            <section className="px-8"></section>
        </Layout>
    );
};

export default ContactUsPage;
