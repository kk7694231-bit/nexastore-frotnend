import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  const API_URL =
    "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products`
      );

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    const exist = cart.find(
      (item) => item._id === product._id
    );

    if (exist) {
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
    <>
      {/* Hero Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#2874f0,#1e88e5)",
          color: "#fff",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px",
          }}
        >
          Welcome to NexaStore
        </h1>

        <p
          style={{
            fontSize: "20px",
            opacity: "0.9",
          }}
        >
          Best Deals on Mobiles, Electronics, Fashion &
          Gaming
        </p>
      </div>

      {/* Products */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "50px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            marginBottom: "30px",
            fontSize: "32px",
            color: "#333",
          }}
        >
          Featured Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,.12)",
                transition: ".3s",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                  background: "#f5f5f5",
                  padding: "20px",
                }}
              />

              <div
                style={{
                  padding: "20px",
                }}
              >
                <h3>{product.name}</h3>

                <p
                  style={{
                    color: "#777",
                    minHeight: "45px",
                  }}
                >
                  {product.description.length > 60
                    ? product.description.substring(
                        0,
                        60
                      ) + "..."
                    : product.description}
                </p>

                <h2
                  style={{
                    color: "#e53935",
                  }}
                >
                  ₹{product.price.toLocaleString()}
                </h2>

                <p
                  style={{
                    color: "#ff9800",
                  }}
                >
                  ⭐ {product.rating || 4.5}
                </p>

                <p>
                  Stock : {product.stock}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: "none",
                      background: "#ff9800",
                      color: "#fff",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Add To Cart
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
                        padding: "12px",
                        border: "none",
                        background: "#2874f0",
                        color: "#fff",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;