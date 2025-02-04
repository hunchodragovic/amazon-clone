import React from "react";
import "../styles/Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../images/icons/header-logo.png";
import { useAuth } from "../context/GlobalState";
import { auth } from "../config/firebase"; // Import Firebase auth

const Header = () => {
  const { user, basket } = useAuth();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={Logo} alt="Amazon Logo" />
      </Link>

      <div className="search">
        <input type="text" placeholder="Search Amazon" className="input" />
        <button className="searchButton">
          <FaSearch />
        </button>
      </div>

      <div className="nav">
        <Link to={!user && "/login"} onClick={handleAuthentication}>
          <div className="navItem">
            <div className="header-optionLineOne">
              {user ? `Hello ${user.email}` : "Hello Guest"}
            </div>
            <div className="header-optionLineOne">
              <span className="navItemSpan">
                {user ? "Sign Out" : "Sign In"}
              </span>
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
            <span className="navItemSpan">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
