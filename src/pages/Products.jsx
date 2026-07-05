import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  const location = useLocation();

  const API_URL =
    "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const keyword = params.get("keyword") || "";
    const category = params.get("category") || "";

    fetchProducts(keyword, category);
  }, [location.search]);

  const fetchProducts = async (
    keyword,
    category
  ) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products?keyword=${keyword}&category=${category}`
      );

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

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

    alert("Product Added Successfully");
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          color: "#222",
          marginBottom: "10px",
        }}
      >
        Our Products
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "18px",
          marginBottom: "40px",
        }}
      >
        Discover the latest mobiles, electronics,
        fashion and gaming products.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "30px",
        }}
      >
        {Array.isArray(products) &&
        products.length > 0 ? (
          products.map((product) => (
                        <div
              key={product._id}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
                border: "1px solid #eee",
              }}
            >
              <div
                style={{
                  position: "relative",
                  background: "#f8f8f8",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    background: "#ff3d00",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  🔥 Trending
                </span>

                <span
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    fontSize: "22px",
                  }}
                >
                  ❤️
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                style={{
                  padding: "20px",
                }}
              >
                <Link
                  to={`/products/${product._id}`}
                  style={{
                    textDecoration: "none",
                    color: "#222",
                  }}
                >
                  <h2
                    style={{
                      margin: "0",
                      fontSize: "24px",
                    }}
                  >
                    {product.name}
                  </h2>
                </Link>

                <p
                  style={{
                    color: "#666",
                    marginTop: "12px",
                    minHeight: "50px",
                  }}
                >
                  {product.description.length > 70
                    ? product.description.substring(
                        0,
                        70
                      ) + "..."
                    : product.description}
                </p>

                <div
                  style={{
                    color: "#ff9800",
                    fontSize: "18px",
                    margin: "15px 0",
                  }}
                >
                  ⭐⭐⭐⭐⭐ ({product.rating || 4.5})
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "15px",
                  }}
                >
                  <span
                    style={{
                      color: "#e53935",
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹{product.price.toLocaleString()}
                  </span>

                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#888",
                    }}
                  >
                    ₹
                    {Math.floor(
                      product.price * 1.2
                    ).toLocaleString()}
                  </span>

                  <span
                    style={{
                      background: "#2e7d32",
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "15px",
                      fontSize: "13px",
                    }}
                  >
                    20% OFF
                  </span>
                </div>

                <p
                  style={{
                    color:
                      product.stock > 0
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "20px",
                  }}
                >
                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                    style={{
                      flex: 1,
                      padding: "13px",
                      border: "none",
                      borderRadius: "8px",
                      background: "#ff9800",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    🛒 Add To Cart
                  </button>

                  <Link
                    to={`/products/${product._id}`}
                    style={{
                      flex: 1,
                      textDecoration: "none",
                    }}
                  >
                    <button
                      style={{
                        width: "100%",
                        padding: "13px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#2874f0",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
                    <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="No Products"
              style={{
                width: "180px",
                marginBottom: "20px",
              }}
            />

            <h2
              style={{
                color: "#555",
                marginBottom: "10px",
              }}
            >
              No Products Found
            </h2>

            <p
              style={{
                color: "#888",
                fontSize: "17px",
              }}
            >
              Try searching with another keyword or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;