import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const keyword = params.get("keyword") || "";
    const category = params.get("category") || "";

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/products?keyword=${keyword}&category=${category}`
        );

        console.log("Products API Response:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [location.search]);

  const addToCart = (product) => {
    const existingItem = cart.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <div className="products-container">
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product._id}
            className="product-card"
          >
            <span className="trending-badge">
              🔥 Trending
            </span>

            <img
              src={product.image}
              alt={product.name}
            />

            <Link to={`/products/${product._id}`}>
              <h3>{product.name}</h3>
            </Link>

            <div className="rating">
              ⭐⭐⭐⭐⭐
            </div>

            <div className="price-box">
              <span className="new-price">
                ₹{product.price}
              </span>

              <span className="old-price">
                ₹{Math.floor(product.price * 1.2)}
              </span>

              <span className="offer-badge">
                20% OFF
              </span>
            </div>

            <button
              onClick={() => addToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        ))
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          No Products Found
        </h2>
      )}
    </div>
  );
}

export default Products;