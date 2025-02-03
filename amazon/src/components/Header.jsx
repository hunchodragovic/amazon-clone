import React from "react";
import "../styles/Header.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../images/icons/header-logo.png";

const Header = () => {
  return (
    <header className="header">
      {/* Logo as an Image with a Link */}
      <Link to="/" className="header-logo">
        <img src={Logo} alt="Amazon Logo" />
      </Link>

      {/* Search Bar */}
      <div className="search">
        <input type="text" placeholder="Search Amazon" className="input" />
        <button className="searchButton">
          <FaSearch />
        </button>
      </div>

      {/* User & Cart Section */}
      <div className="nav">
        <Link to="/login">
          <div className="navItem">
            <div className="header-optionLineOne">Hello Guest</div>
            <div className="header-optionLineOne">
              <span className="navItemSpan">Sign In</span>
            </div>
          </div>
        </Link>
        <Link to="/orders">
          <div className="navItem">
            <div className="header-optionLineOne">Returns</div>
            <div className="header-optionLineOne">
              <span className="navItemSpan">& Orders</span>
            </div>
          </div>
        </Link>
        <div className="navItem">
          <div className="header-optionLineOne">Your</div>
          <div className="header-optionLineOne">
            <span className="navItemSpan">Prime</span>
          </div>
        </div>
        <Link to="/checkout">
          <div className="navItem">
            <div>
              <FaShoppingCart className="icon" />
            </div>
            <span className="navItemSpan">1</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
