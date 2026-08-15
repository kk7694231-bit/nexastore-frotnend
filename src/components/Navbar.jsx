import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cart }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const token = localStorage.getItem("token");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");

    alert("Logout Successful");
    navigate("/login");
  };

  // Search
  const handleSearch = () => {
    if (search.trim()) {
      navigate(
        `/products?keyword=${encodeURIComponent(search)}`
      );
    } else {
      navigate("/products");
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Contact Us → Footer
  const handleContactClick = (e) => {
    e.preventDefault();

    // Already on Home page
    if (window.location.pathname === "/") {
      const footer = document.getElementById("footer");

      if (footer) {
        footer.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // Go to Home first
      navigate("/");

      // Wait for Home component to render
      setTimeout(() => {
        const footer = document.getElementById("footer");

        if (footer) {
          footer.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    }
  };

  return (
    <>
      {/* ==============================
          TOP NAVBAR
      =============================== */}

      <div className="navbar-main">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
        >
          <span className="logo-nexa">
            NEXA
          </span>

          <span className="logo-store">
            STORE
          </span>
        </Link>


        {/* Search */}
        <div className="navbar-search">

          <button
            className="category-select"
            onClick={() => navigate("/products")}
          >
            All Categories
            <span>⌄</span>
          </button>

          <input
            type="text"
            placeholder="Search for products, brands and more..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={handleSearchKeyDown}
          />

          <button
            className="search-button"
            onClick={handleSearch}
          >
            🔍
          </button>

        </div>


        {/* Right Actions */}
        <div className="navbar-actions">

          {/* Login / Logout */}
          {!token ? (
            <Link
              to="/login"
              className="nav-action login-action"
            >
              <span className="nav-action-icon">
                ♙
              </span>

              <span>
                Login / Register
              </span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="nav-action logout-action"
            >
              <span className="nav-action-icon">
                ♙
              </span>

              <span>
                Logout
              </span>
            </button>
          )}


          {/* My Orders */}
          {token && (
            <Link
              to="/orders"
              className="nav-action"
            >
              <span className="nav-action-icon">
                ♡
              </span>

              <span>
                My Orders
              </span>
            </Link>
          )}


          {/* Cart */}
          <Link
            to="/cart"
            className="nav-action cart-action"
          >
            <span className="cart-icon">
              🛒
            </span>

            <span>
              Cart
            </span>

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

        </div>

      </div>


      {/* ==============================
          SECOND NAVIGATION
      =============================== */}

      <nav className="navbar-menu">

        {/* Home */}
        <Link
          to="/"
          className="navbar-menu-link"
        >
          Home
        </Link>


        {/* Shop */}
        <Link
          to="/products"
          className="navbar-menu-link"
        >
          Shop
        </Link>


        {/* Electronics */}
        <Link
          to="/products?category=Electronics"
          className="navbar-menu-link"
        >
          Electronics
        </Link>


        {/* Fashion */}
        <Link
          to="/products?category=Fashion"
          className="navbar-menu-link"
        >
          Fashion
        </Link>


        {/* Home & Living */}
        <Link
          to="/products?category=Home%20%26%20Living"
          className="navbar-menu-link"
        >
          Home & Living
        </Link>


        {/* Offers */}
        <Link
          to="/products"
          className="navbar-menu-link"
        >
          Offers
        </Link>


        {/* About Us */}
        <Link
  to="/about"
  className="navbar-menu-link"
>
  About Us
</Link>


        {/* Contact Us → Footer */}
        <a
          href="#footer"
          className="navbar-menu-link"
          onClick={handleContactClick}
        >
          Contact Us
        </a>

      </nav>
    </>
  );
}

export default Navbar;