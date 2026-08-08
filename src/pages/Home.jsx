import { useEffect, useState, useRef } from "react";
import axios from "axios";
import banner from "../assets/Bannerr.png.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const productsRef = useRef(null);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  // Mobile screen detection
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 768
  );

  // Fetch products + handle screen resize
  useEffect(() => {
    fetchProducts();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const brandMatch =
      selectedBrand === "All" ||
      product.brand === selectedBrand;

    return categoryMatch && brandMatch;
  });

  // Add product to cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item._id === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert("Product Added Successfully");
  };

  // Scroll to products
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        overflowX: "hidden",
        width: "100%",
        background: "#ffffff",
      }}
    >

      {/* =====================================================
          MODERN HERO SECTION
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          width: "100%",
          minHeight: isMobile ? "700px" : "570px",
          background: "#ffffff",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1450px",
            minHeight: isMobile ? "700px" : "570px",
            margin: "0 auto",
            padding: isMobile
              ? "45px 20px"
              : "45px 50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? "30px" : "20px",
            flexDirection: isMobile ? "column" : "row",
            boxSizing: "border-box",
          }}
        >

          {/* ================= LEFT SIDE ================= */}

          <div
            style={{
              flex: "0 0 42%",
              maxWidth: "570px",
              textAlign: isMobile ? "center" : "left",
              zIndex: 3,
              paddingTop: isMobile ? "10px" : "0",
            }}
          >

            {/* Welcome text */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile
                  ? "center"
                  : "flex-start",
                gap: "12px",
                marginBottom: "22px",
              }}
            >
              <span
                style={{
                  width: "42px",
                  height: "3px",
                  background: "#ff6b00",
                  display: "inline-block",
                }}
              />

              <span
                style={{
                  fontSize: isMobile ? "15px" : "18px",
                  fontWeight: "600",
                  color: "#172b4d",
                  letterSpacing: "0.3px",
                }}
              >
                WELCOME TO{" "}
                <span style={{ color: "#ff6b00" }}>
                  NEXASTORE
                </span>
              </span>
            </div>

            {/* Main heading */}

            <h1
              style={{
                margin: 0,
                fontSize: isMobile ? "48px" : "72px",
                lineHeight: "1.03",
                fontWeight: "800",
                color: "#102a43",
                letterSpacing: isMobile
                  ? "-1.5px"
                  : "-2.5px",
              }}
            >
              SHOP MORE.
              <br />

              <span style={{ color: "#ff6b00" }}>
                SAVE MORE.
              </span>
            </h1>

            {/* Description */}

            <p
              style={{
                marginTop: "28px",
                marginBottom: "6px",
                fontSize: isMobile ? "16px" : "19px",
                lineHeight: "1.6",
                color: "#52606d",
              }}
            >
              Discover top quality products at best prices.
            </p>

            <p
              style={{
                marginTop: "0",
                fontSize: isMobile ? "16px" : "19px",
                lineHeight: "1.6",
                color: "#52606d",
              }}
            >
              Your one-stop destination for everything you need.
            </p>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "14px",
                marginTop: "30px",
                justifyContent: isMobile
                  ? "center"
                  : "flex-start",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={scrollToProducts}
                style={{
                  padding: "15px 30px",
                  background: "#102a43",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  minWidth: "145px",
                }}
              >
                SHOP NOW&nbsp; →
              </button>

              <button
                onClick={scrollToProducts}
                style={{
                  padding: "13px 27px",
                  background: "#ffffff",
                  color: "#ff6b00",
                  border: "2px solid #ff6b00",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  minWidth: "165px",
                }}
              >
                EXPLORE OFFERS
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div
            style={{
              flex: "0 0 55%",
              width: isMobile ? "100%" : "55%",
              minHeight: isMobile ? "320px" : "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >

            {/* Orange decorative circle */}

            <div
              style={{
                position: "absolute",
                width: isMobile ? "230px" : "400px",
                height: isMobile ? "230px" : "400px",
                borderRadius: "50%",
                background: "#ff6b00",
                opacity: 0.9,
                right: isMobile ? "5%" : "12%",
                top: isMobile ? "10%" : "5%",
                zIndex: 0,
              }}
            />

            {/* Soft background circle */}

            <div
              style={{
                position: "absolute",
                width: isMobile ? "280px" : "570px",
                height: isMobile ? "280px" : "570px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #f2f4f7 0%, #ffffff 70%)",
                zIndex: 0,
              }}
            />

            {/* Product image */}

            <img
              src={banner}
              alt="NexaStore Products"
              style={{
                width: isMobile ? "100%" : "110%",
                maxWidth: isMobile ? "430px" : "720px",
                height: isMobile ? "330px" : "520px",
                objectFit: "contain",
                position: "relative",
                zIndex: 2,
                display: "block",
              }}
            />
          </div>
        </div>
      </motion.section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "55px",
          gap: isMobile ? "15px" : "20px",
          padding: isMobile
            ? "0 15px"
            : "0 30px",
        }}
      >

        {[
          {
            icon: "📱",
            name: "Mobiles",
          },
          {
            icon: "💻",
            name: "Laptops",
          },
          {
            icon: "🎮",
            name: "Gaming",
          },
          {
            icon: "👕",
            name: "Fashion",
          },
          {
            icon: "📺",
            name: "Electronics",
          },
          {
            icon: "⌚",
            name: "Accessories",
          },
        ].map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelectedCategory(item.name);
              setSelectedBrand("All");
              scrollToProducts();
            }}
            style={{
              width: isMobile
                ? "42%"
                : "160px",
              maxWidth: "170px",
              background: "#ffffff",
              borderRadius: "14px",
              padding: isMobile
                ? "18px 10px"
                : "22px 15px",
              textAlign: "center",
              boxShadow:
                "0 5px 20px rgba(16,42,67,0.10)",
              border:
                "1px solid #f0f0f0",
              cursor: "pointer",
              transition:
                "transform 0.2s ease",
            }}
          >
            <div
              style={{
                fontSize: isMobile
                  ? "38px"
                  : "48px",
                marginBottom: "8px",
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                fontSize: isMobile
                  ? "14px"
                  : "16px",
                margin: 0,
                color: "#102a43",
              }}
            >
              {item.name}
            </h3>
          </div>
        ))}
      </motion.div>


      {/* =====================================================
          FEATURED BRANDS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          padding: "0 20px",
          marginBottom: "50px",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: isMobile
              ? "28px"
              : "35px",
            color: "#102a43",
          }}
        >
          Top Brands
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(6, 1fr)",
            gap: isMobile
              ? "15px"
              : "20px",
            width: "100%",
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          {[
            "Apple",
            "Samsung",
            "HP",
            "Sony",
            "Dell",
            "Nike",
          ].map((brand, index) => (
            <motion.div
              key={brand}
              onClick={() => {
                setSelectedBrand(brand);
                setSelectedCategory("All");
                scrollToProducts();
              }}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: isMobile
                  ? "20px"
                  : "25px",
                textAlign: "center",
                boxShadow:
                  "0 5px 18px rgba(16,42,67,0.09)",
                border:
                  "1px solid #f0f0f0",
                cursor: "pointer",
              }}
            >
              <h2
                style={{
                  color: "#ff6b00",
                  fontSize: isMobile
                    ? "19px"
                    : "23px",
                  margin: 0,
                }}
              >
                {brand}
              </h2>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <motion.div
        ref={productsRef}
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          maxWidth: "1300px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >

        <h2
          style={{
            fontSize: isMobile
              ? "28px"
              : "34px",
            marginBottom: "30px",
            textAlign: isMobile
              ? "center"
              : "left",
            color: "#102a43",
          }}
        >
          Featured Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px",
            width: "100%",
          }}
        >
          {filteredProducts.map(
            (product, index) => (
              <motion.div
                key={product._id}
                initial={{
                  opacity: 0,
                  x: isMobile
                    ? 0
                    : index % 2 === 0
                    ? -40
                    : 40,
                  y: isMobile
                    ? 30
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
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow:
                    "0 8px 20px rgba(16,42,67,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  border:
                    "1px solid #f0f0f0",
                }}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: isMobile
                      ? "180px"
                      : "250px",
                    objectFit: "contain",
                    background: "#f7f8fa",
                    padding: isMobile
                      ? "10px"
                      : "20px",
                  }}
                />

                <div
                  style={{
                    padding: isMobile
                      ? "15px"
                      : "20px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:
                      "space-between",
                  }}
                >

                  <div>

                    <h3
                      style={{
                        fontSize: isMobile
                          ? "15px"
                          : "16px",
                        margin:
                          "0 0 10px",
                        color: "#102a43",
                      }}
                    >
                      {product.name}
                    </h3>

                    <p
                      style={{
                        color: "#666",
                        minHeight: isMobile
                          ? "auto"
                          : "45px",
                        fontSize: isMobile
                          ? "14px"
                          : "16px",
                        margin:
                          "0 0 10px",
                      }}
                    >
                      {product.description
                        ? product.description.substring(
                            0,
                            60
                          ) + "..."
                        : "Quality product available at NexaStore."}
                    </p>

                    <h2
                      style={{
                        color: "#ff6b00",
                        margin:
                          "0 0 10px",
                      }}
                    >
                      ₹
                      {product.price.toLocaleString()}
                    </h2>

                    <p
                      style={{
                        color: "#ff9800",
                        margin:
                          "0 0 5px",
                      }}
                    >
                      ⭐{" "}
                      {product.rating ||
                        4.5}
                    </p>

                    <p
                      style={{
                        margin:
                          "0 0 15px",
                        fontSize: isMobile
                          ? "15px"
                          : "16px",
                        color: "#333",
                      }}
                    >
                      Stock :{" "}
                      {product.stock}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        isMobile
                          ? "column"
                          : "row",
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
                        padding: "12px",
                        width: isMobile
                          ? "100%"
                          : "auto",
                        border: "none",
                        background:
                          "#ff6b00",
                        color: "#fff",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      Add To Cart
                    </button>

                    <Link
                      to={`/products/${product._id}`}
                      style={{
                        flex: 1,
                        textDecoration:
                          "none",
                      }}
                    >
                      <button
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "none",
                          background:
                            "#102a43",
                          color: "#fff",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                          fontWeight:
                            "bold",
                        }}
                      >
                        View Details
                      </button>
                    </Link>

                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>


      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          maxWidth: "1300px",
          margin: "70px auto",
          padding: "0 20px",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            fontSize: isMobile
              ? "28px"
              : "34px",
            marginBottom: "35px",
            color: "#102a43",
          }}
        >
          Why Choose NexaStore?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {[
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Quick and reliable shipping across India.",
            },
            {
              icon: "💳",
              title: "Secure Payments",
              desc: "Multiple safe payment methods available.",
            },
            {
              icon: "🛍️",
              title: "Wide Selection",
              desc: "A broad range of products from top brands.",
            },
            {
              icon: "👍",
              title: "Quality Assurance",
              desc: "Only genuine products with trusted seller support.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: isMobile
                    ? "20px"
                    : "30px",
                  textAlign: "center",
                  borderRadius: "15px",
                  boxShadow:
                    "0 5px 15px rgba(16,42,67,0.10)",
                  border:
                    "1px solid #f0f0f0",
                }}
              >
                <div
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {item.icon}
                </div>

                <h3
                  style={{
                    color: "#102a43",
                  }}
                >
                  {item.title}
                </h3>

                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* =====================================================
          CUSTOMER REVIEWS
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          background: "#f8f9fa",
          padding: "60px 20px",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: isMobile
              ? "28px"
              : "34px",
            color: "#102a43",
          }}
        >
          Customer Reviews
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {[
            {
              name: "Rahul",
              review:
                "Excellent products and super fast delivery.",
            },
            {
              name: "Priya",
              review:
                "Affordable prices and amazing quality.",
            },
            {
              name: "Arun",
              review:
                "Best online shopping experience.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              style={{
                background: "#fff",
                padding: isMobile
                  ? "18px"
                  : "25px",
                borderRadius: "15px",
                boxShadow:
                  "0 5px 15px rgba(16,42,67,0.10)",
              }}
            >
              <h3>{item.name}</h3>

              <p
                style={{
                  color: "#ff9800",
                }}
              >
                ⭐⭐⭐⭐⭐
              </p>

              <p>{item.review}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* =====================================================
    NEWSLETTER + FOOTER
===================================================== */}

<section className="nexa-footer-section">

  {/* Newsletter */}

  <div className="nexa-newsletter">

    <div className="newsletter-content">

      <div className="newsletter-text">
        <span className="newsletter-tag">
          STAY UPDATED
        </span>

        <h2>
          Get the latest from{" "}
          <span>NexaStore</span>
        </h2>

        <p>
          Subscribe to get updates about new products,
          exclusive offers and special deals.
        </p>
      </div>

      <div className="newsletter-form">

        <input
          type="email"
          placeholder="Enter your email address"
        />

        <button>
          Subscribe
        </button>

      </div>

    </div>

  </div>


  {/* Footer */}

  <footer className="nexa-footer">

    <div className="footer-container">

      {/* Brand */}

      <div className="footer-column footer-brand">

        <Link
          to="/"
          className="footer-logo"
        >
          <span>NEXA</span>STORE
        </Link>

        <p>
          Your trusted online shopping destination
          for mobiles, electronics, fashion, gaming
          and accessories.
        </p>

        <div className="footer-social">

          <a href="#" aria-label="Facebook">
            f
          </a>

          <a href="#" aria-label="Instagram">
            ◎
          </a>

          <a href="#" aria-label="Twitter">
            𝕏
          </a>

          <a href="#" aria-label="YouTube">
            ▶
          </a>

        </div>

      </div>


      {/* Quick Links */}

      <div className="footer-column">

        <h3>Quick Links</h3>

        <Link to="/">Home</Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/orders">
          My Orders
        </Link>

      </div>


      {/* Customer Service */}

      <div className="footer-column">

        <h3>Customer Service</h3>

        <Link to="/products">
          Shop
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

        <Link to="/cart">
          Shopping Cart
        </Link>

      </div>


      {/* Contact */}

      <div className="footer-column footer-contact">

        <h3>Contact Us</h3>

        <p>
          <span>📍</span>
          Coimbatore, Tamil Nadu
        </p>

        <p>
          <span>📞</span>
          +91 9876543210
        </p>

        <p>
          <span>✉</span>
          support@nexastore.com
        </p>

      </div>

    </div>


    {/* Bottom */}

    <div className="footer-bottom">

      <p>
        © 2026 <strong>NexaStore</strong>.
        All Rights Reserved.
      </p>

      <div className="footer-bottom-links">
        <span>Privacy Policy</span>
        <span>Terms & Conditions</span>
      </div>

    </div>

  </footer>

</section>
    </div>
  );
}

export default Home;