import React from 'react';
import { Link } from 'gatsby';

const Footer = () => {
    return (
        <>
            <section className="bg-red-500">
                Couldn't find a design matching your style or want a custom made
                case?
                {/* <form className="w-64">
            <label for="contact-form-message" className="block mb-3">
                <span className="block">Message</span>
                <textarea id="contact-form-message" name="contact-form-message" className="appearance-none rounded w-full px-2 py-2 resize-none"></textarea>
            </label>
            <input type="submit" text="Send message" className="text-white bg-gray-900 border-4 border-gray-700 rounded py-2 w-full" />
        </form> */}
            </section>
            <footer className="bg-gray-900 text-white py-3 mt-12">
                <div className="flex container mx-auto justify-between">
                    <section>PremiumCases.Design</section>
                    <section className="flex">
                        <Link to="/contact-us" className="mr-3 underline">
                            Contact Us
                        </Link>
                        <Link to="/faq" className="mr-3 underline">
                            FAQ
                        </Link>
                        <Link to="/privacy-policy" className="mr-3 underline">
                            Privacy Policy
                        </Link>
                        <Link to="/terms-and-conditions" className="underline">
                            Terms & Conditions
                        </Link>
                    </section>
                </div>
            </footer>
        </>
    );
};

export default Footer;
