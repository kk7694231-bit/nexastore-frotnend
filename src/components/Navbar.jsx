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
    navigate(
      `/products?keyword=${search}`
    );
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo" style={{ color: "gold" }}>
          NexaStore 
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search Products"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button onClick={handleSearch}>
            🔍
          </button>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/products">
            Products
          </Link>

          {token && (
            <Link to="/orders">
              My Orders
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          )}

          <Link
            to="/cart"
            className="cart-link"
          >
            🛒 Cart

            <span className="cart-count">
              {cartCount}
            </span>
          </Link>
        </div>
      </nav>

      
    </>
  );
}

export default Navbar;