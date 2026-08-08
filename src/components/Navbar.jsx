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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");

    alert("Logout Successful");
    navigate("/login");
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?keyword=${search}`);
    } else {
      navigate("/products");
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="navbar-wrapper">

      {/* Top Navbar */}
      <div className="navbar-main">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-nexa">NEXA</span>
          <span className="logo-store">STORE</span>
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
            onChange={(e) => setSearch(e.target.value)}
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

          {!token ? (
            <Link
              to="/login"
              className="nav-action login-action"
            >
              <span className="nav-action-icon">♙</span>
              <span>Login / Register</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="nav-action logout-action"
            >
              <span className="nav-action-icon">♙</span>
              <span>Logout</span>
            </button>
          )}

          {token && (
            <Link
              to="/orders"
              className="nav-action"
            >
              <span className="nav-action-icon">♡</span>
              <span>My Orders</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="nav-action cart-action"
          >
            <span className="cart-icon">🛒</span>
            <span>Cart</span>

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

        </div>
      </div>

      {/* Second Navigation */}
      <nav className="navbar-menu">

        <Link
          to="/"
          className="navbar-menu-link active"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="navbar-menu-link"
        >
          Shop
        </Link>

        <Link
          to="/products?category=Electronics"
          className="navbar-menu-link"
        >
          Electronics
        </Link>

        <Link
          to="/products?category=Fashion"
          className="navbar-menu-link"
        >
          Fashion
        </Link>

        <Link
          to="/products"
          className="navbar-menu-link"
        >
          Home & Living
        </Link>

        <Link
          to="/products"
          className="navbar-menu-link"
        >
          Offers
        </Link>

        <Link
          to="/"
          className="navbar-menu-link"
        >
          About Us
        </Link>

        <Link
          to="/"
          className="navbar-menu-link"
        >
          Contact Us
        </Link>

      </nav>

    </header>
  );
}

export default Navbar;