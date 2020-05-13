import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const ContactUsPage = () => {
    const data = useStaticQuery(graphql`
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

    console.log(data);

    return (
        <Layout>
            <SEO title="Home" />
            <header>Unique designs each day</header>
            <section className="px-8"></section>
        </Layout>
    );
};

export default ContactUsPage;
