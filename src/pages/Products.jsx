import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  // Mobile screen detection
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  const API_URL =
    "https://nexastore-backend-rzao.vercel.app";

  // Fetch products whenever URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const keyword = params.get("keyword") || "";
    const category = params.get("category") || "";

    fetchProducts(keyword, category);

    // Window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.search]);


  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async (keyword, category) => {
    try {
      const params = new URLSearchParams();

      if (keyword) {
        params.append("keyword", keyword);
      }

      if (category) {
        params.append("category", category);
      }

      const { data } = await axios.get(
        `${API_URL}/api/products?${params.toString()}`
      );

      console.log("Products API Response:", data);
      console.log("Selected Category:", category);

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }

    } catch (error) {
      console.log("Products Error:", error);
      setProducts([]);
    }
  };


  // =====================================================
  // ADD TO CART
  // =====================================================

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
        margin: isMobile
          ? "20px auto"
          : "40px auto",
        padding: isMobile
          ? "0 15px"
          : "0 20px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >

      {/* =================================================
          PAGE TITLE
      ================================================= */}

      <h1
        style={{
          textAlign: "center",
          fontSize: isMobile
            ? "30px"
            : "42px",
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
          fontSize: isMobile
            ? "15px"
            : "18px",
          marginBottom: isMobile
            ? "30px"
            : "40px",
          lineHeight: "1.5",
        }}
      >
        Discover the latest mobiles, electronics,
        fashion and gaming products.
      </p>


      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: isMobile
            ? "20px"
            : "30px",
          width: "100%",
        }}
      >

        {Array.isArray(products) &&
        products.length > 0 ? (

          products.map((product, index) => (

            <motion.div
              key={product._id}

              initial={{
                opacity: 0,
                x: isMobile
                  ? 0
                  : index % 2 === 0
                  ? -100
                  : 100,
                y: isMobile
                  ? 40
                  : 0,
              }}

              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}

              viewport={{
                once: false,
                amount: 0.1,
              }}

              transition={{
                duration: 0.6,
                delay: isMobile
                  ? 0
                  : index * 0.05,
                ease: "easeOut",
              }}

              style={{
                background: "#ffffff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.12)",
                border: "1px solid #eee",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                boxSizing: "border-box",
              }}
            >

              {/* =================================================
                  PRODUCT IMAGE
              ================================================= */}

              <div
                style={{
                  position: "relative",
                  background: "#f8f8f8",
                  padding: "20px",
                  textAlign: "center",
                  height: "260px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                    fontSize: "12px",
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
                    cursor: "pointer",
                  }}
                >
                  ❤️
                </span>


                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "220px",
                    objectFit: "contain",
                  }}
                />

              </div>


              {/* =================================================
                  PRODUCT DETAILS
              ================================================= */}

              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
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
                      fontSize: "20px",
                      lineHeight: "1.4",
                    }}
                  >
                    {product.name}
                  </h2>
                </Link>


                <p
                  style={{
                    color: "#666",
                    marginTop: "10px",
                    fontSize: "14px",
                    minHeight: "45px",
                    lineHeight: "1.5",
                  }}
                >
                  {product.description &&
                  product.description.length > 70
                    ? product.description.substring(
                        0,
                        70
                      ) + "..."
                    : product.description}
                </p>


                {/* Rating */}

                <div
                  style={{
                    color: "#ff9800",
                    fontSize: "16px",
                    margin: "12px 0",
                  }}
                >
                  ⭐⭐⭐⭐⭐ (
                  {product.rating || 4.5}
                  )
                </div>


                {/* =================================================
                    PRICE
                ================================================= */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >

                  <span
                    style={{
                      color: "#e53935",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ₹
                    {Number(
                      product.price || 0
                    ).toLocaleString()}
                  </span>


                  <span
                    style={{
                      textDecoration:
                        "line-through",
                      color: "#888",
                      fontSize: "14px",
                    }}
                  >
                    ₹
                    {Math.floor(
                      Number(
                        product.price || 0
                      ) * 1.2
                    ).toLocaleString()}
                  </span>


                  <span
                    style={{
                      background: "#2e7d32",
                      color: "#fff",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    20% OFF
                  </span>

                </div>


                {/* Stock */}

                <p
                  style={{
                    color:
                      product.stock > 0
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                    margin:
                      "0 0 15px 0",
                    fontSize: "14px",
                  }}
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock})`
                    : "Out of Stock"}
                </p>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "auto",
                  }}
                >

                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                    style={{
                      flex: 1,
                      padding: "12px 10px",
                      border: "none",
                      borderRadius: "8px",
                      background: "#ff9800",
                      color: "#fff",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "13px",
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
                        padding: "12px 10px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#2874f0",
                        color: "#fff",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      View Details
                    </button>
                  </Link>

                </div>

              </div>

            </motion.div>

          ))

        ) : (

          /* =================================================
             NO PRODUCTS
          ================================================= */

          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: isMobile
                ? "50px 10px"
                : "80px 20px",
            }}
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="No Products"
              style={{
                width: isMobile
                  ? "120px"
                  : "180px",
                marginBottom: "20px",
              }}
            />


            <h2
              style={{
                color: "#555",
                marginBottom: "10px",
                fontSize: isMobile
                  ? "20px"
                  : "24px",
              }}
            >
              No Products Found
            </h2>


            <p
              style={{
                color: "#888",
                fontSize: isMobile
                  ? "14px"
                  : "17px",
              }}
            >
              Try searching with another
              keyword or category.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Products;