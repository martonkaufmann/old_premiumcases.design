import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import FavoriteIcon from './Icons/FavoriteIcon';
import CartIcon from './Icons/CartIcon';

const Header = ({ siteTitle }) => (
    <header className="shadow fixed w-full bg-white z-10">
        <section className="container p-3 flex justify-between mx-auto">
            {/* <h1 className="flex items-baseline"> */}
            <Link to="/" className="flex items-baseline">
                <span className="font-hairline text-2xl">PremiumCases</span>
                <span className="bg-red-500 rounded w-2 h-2" style={{ margin: '0 1px' }}></span>
                <span className="font-bold text-2xl">Design</span>
            </Link>
            <nav className="flex items-center">
                <a href="#f">
                    <FavoriteIcon className="w-6 h-6" />
                </a>
                <a href="#c">
                    <CartIcon className="w-6 h-6 ml-4" />
                </a>
            </nav>
        </section>
    </header>
);

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};

export default Header;
