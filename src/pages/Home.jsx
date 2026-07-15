import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const productsRef = useRef(null);
  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  // மொபைல் திரையைக் கண்டறியும் State
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const banners = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchProducts();

    const slider = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    // திரையின் அளவு மாறும் போது கண்காணிக்கும் Function
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(slider);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const brandMatch =
      selectedBrand === "All" ||
      product.brand === selectedBrand;

    return categoryMatch && brandMatch;
  });

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

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div style={{ boxSizing: "border-box", overflowX: "hidden", width: "100%" }}>
      {/* Hero Slider */}
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 30 : 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        style={{
          width: "100%",
          height: isMobile ? "auto" : "450px",
          minHeight: isMobile ? "380px" : "450px",
          overflow: "hidden",
          position: "relative",
          marginBottom: "40px",
        }}
      >
        <img
          src={banners[currentSlide]}
          alt="Banner"
          style={{
            width: "100%",
            height: isMobile ? "380px" : "450px",
            objectFit: "cover",
            transition: "0.8s",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: isMobile ? "20px" : "70px",
            right: isMobile ? "20px" : "auto",
            transform: "translateY(-50%)",
            color: "#fff",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <h1
            style={{
              color: "#121212",
              fontSize: isMobile ? "32px" : "52px",
              left: isMobile ? "0px" : "40px",
              marginBottom: "20px",
            }}
          >
            Welcome To NexaStore
          </h1>

          <p
            style={{
              color: "#000000",
              width: isMobile ? "100%" : "500px",
              fontSize: isMobile ? "16px" : "22px",
              margin: isMobile ? "0 auto" : "0",
            }}
          >
            India's Best Online Shopping Store for Mobiles, Electronics, Fashion, Gaming and Accessories.
          </p>

          <button
            onClick={scrollToProducts}
            style={{
              marginTop: "30px",
              background: "#ff9800",
              color: "#fff",
              border: "none",
              padding: isMobile ? "12px 28px" : "15px 35px",
              borderRadius: "8px",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "bold",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Shop Now
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "50px",
          gap: isMobile ? "15px" : "20px",
          padding: "0 20px",
        }}
      >
        {[
          { icon: "📱", name: "Mobiles" },
          { icon: "💻", name: "Laptops" },
          { icon: "🎮", name: "Gaming" },
          { icon: "👕", name: "Fashion" },
          { icon: "📺", name: "Electronics" },
          { icon: "⌚", name: "Accessories" },
        ].map((item) => (
          <div
            key={item.name}
            onClick={() => {
              setSelectedCategory(item.name);
              setSelectedBrand("All");
              scrollToProducts();
            }}
            style={{
              width: isMobile ? "140px" : "160px",
              background: "#fff",
              borderRadius: "15px",
              padding: isMobile ? "15px" : "25px",
              textAlign: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,.12)",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: isMobile ? "40px" : "55px" }}>{item.icon}</div>
            <h3 style={{ fontSize: isMobile ? "16px" : "18px", margin: "10px 0 0" }}>{item.name}</h3>
          </div>
        ))}
      </motion.div>

      {/* Mega Sale Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          delay: 0.3,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          margin: isMobile ? "30px 15px" : "40px 20px",
          background: "linear-gradient(135deg,#ff416c,#ff4b2b)",
          borderRadius: "20px",
          padding: isMobile ? "30px 15px" : "50px",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,.15)",
        }}
      >
        <h1 style={{ fontSize: isMobile ? "32px" : "50px", marginBottom: "15px" }}>
          🔥 Mega Sale 2026
        </h1>
        <h2 style={{ fontSize: isMobile ? "22px" : "32px", marginBottom: "10px" }}>
          Up To 70% OFF
        </h2>
        <p style={{ fontSize: isMobile ? "16px" : "20px" }}>
          Mobiles • Laptops • Fashion • Gaming
        </p>
      </motion.div>

      {/* Featured Brands */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          delay: 0.4,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          padding: "0 20px",
          marginBottom: "50px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: isMobile ? "28px" : "35px" }}>
          Top Brands
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit,minmax(180px,1fr))",
            gap: isMobile ? "15px" : "25px",
          }}
        >
          {["Apple", "Samsung", "HP", "Sony", "Dell", "Nike"].map((brand, index) => (
            <motion.div
              key={brand}
              onClick={() => {
                setSelectedBrand(brand);
                setSelectedCategory("All");
                scrollToProducts();
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: isMobile ? "20px" : "30px",
                textAlign: "center",
                boxShadow: "0 5px 15px rgba(0,0,0,.12)",
                cursor: "pointer",
              }}
            >
              <h2 style={{ color: "#2874f0", fontSize: isMobile ? "20px" : "24px", margin: 0 }}>{brand}</h2>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Products */}
      <motion.div
        ref={productsRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
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
        <h2 style={{ fontSize: isMobile ? "28px" : "34px", marginBottom: "30px", textAlign: isMobile ? "center" : "left" }}>
          Featured Products
        </h2>

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "25px",
            width: "100%"
          }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, x: isMobile ? 0 : (index % 2 === 0 ? -40 : 40), y: isMobile ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: isMobile ? 0 : index * 0.05,
                ease: "easeOut",
              }}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,.12)",
                display: "flex",
                flexDirection: "column",
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

              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "18px", margin: "0 0 10px" }}>{product.name}</h3>
                  <p style={{ color: "#666", minHeight: "45px", fontSize: "14px", margin: "0 0 10px" }}>
                    {product.description.substring(0, 60)}...
                  </p>
                  <h2 style={{ color: "#e53935", margin: "0 0 10px" }}>
                    ₹{product.price.toLocaleString()}
                  </h2>
                  <p style={{ color: "#ff9800", margin: "0 0 5px" }}>⭐ {product.rating || 4.5}</p>
                  <p style={{ margin: "0 0 15px", fontSize: "14px", color: "#333" }}>Stock : {product.stock}</p>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                  <button
                    onClick={() => addToCart(product)}
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
                    style={{ flex: 1, textDecoration: "none" }}
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
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
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
        <h2 style={{ textAlign: "center", fontSize: isMobile ? "28px" : "34px", marginBottom: "35px" }}>
          Why Choose NexaStore?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(250px,1fr))",
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  padding: "30px",
                  textAlign: "center",
                  borderRadius: "15px",
                  boxShadow: "0 5px 15px rgba(0,0,0,.12)",
                }}
              >
                <div style={{ fontSize: "50px" }}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Customer Reviews */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
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
        <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: isMobile ? "28px" : "34px" }}>
          Customer Reviews
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          {[
            {
              name: "Rahul",
              review: "Excellent products and super fast delivery.",
            },
            {
              name: "Priya",
              review: "Affordable prices and amazing quality.",
            },
            {
              name: "Arun",
              review: "Best online shopping experience.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,.1)",
              }}
            >
              <h3>{item.name}</h3>
              <p style={{ color: "#ff9800" }}>⭐⭐⭐⭐⭐</p>
              <p>{item.review}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{
          delay: 0.2,
          duration: 0.7,
          ease: "easeOut",
        }}
        style={{
          background: "linear-gradient(135deg,#2874f0,#1565c0)",
          color: "#fff",
          textAlign: "center",
          padding: isMobile ? "40px 20px" : "60px 20px",
        }}
      >
        <h2 style={{ fontSize: isMobile ? "26px" : "36px", margin: 0 }}>Subscribe to our Newsletter</h2>
        <p style={{ margin: "15px 0 30px", fontSize: isMobile ? "14px" : "16px" }}>
          Get updates about new arrivals and offers.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "15px",
            width: isMobile ? "100%" : "320px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            marginRight: isMobile ? "0px" : "10px",
            marginBottom: isMobile ? "15px" : "0px",
          }}
        />

        <button
          style={{
            padding: "15px 25px",
            background: "#ff9800",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            width: isMobile ? "100%" : "auto",
          }}
        >
          Subscribe
        </button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        style={{
          background: "#111",
          color: "#fff",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
            maxWidth: "1300px",
            margin: "auto",
          }}
        >
          <div>
            <h2>NexaStore</h2>
            <p style={{ color: "#bbb", fontSize: "14px", lineHeight: "1.6" }}>
              India's trusted online shopping destination for Electronics, Fashion, Mobiles and Gaming.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>Home</p>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>Products</p>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>Cart</p>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>Orders</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p style={{ color: "#bbb", fontSize: "14px" }}>📍 Coimbatore, Tamil Nadu</p>
            <p style={{ color: "#bbb", fontSize: "14px" }}>📞 +91 9876543210</p>
            <p style={{ color: "#bbb", fontSize: "14px" }}>✉ support@nexastore.com</p>
          </div>

          <div>
            <h3>Follow Us</h3>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>📘 Facebook</p>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>📸 Instagram</p>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>🐦 Twitter</p>
            <p style={{ color: "#bbb", fontSize: "14px", cursor: "pointer" }}>▶ YouTube</p>
          </div>
        </div>

        <hr style={{ margin: "30px 0", borderColor: "#333" }} />
        <p style={{ textAlign: "center", fontSize: "14px", color: "#bbb", margin: 0 }}>
          © 2026 NexaStore. All Rights Reserved.
        </p>
      </motion.footer>
    </div>
  );
}

export default Home;