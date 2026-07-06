import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const productsRef = useRef(null);
  const API_URL =
    "https://nexastore-backend-rzao.vercel.app";

  const banners = [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
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

    return () => clearInterval(slider);
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

  const filteredProducts =
  selectedCategory === "All"
    ? products
    : products.filter(
        (product) => product.category === selectedCategory
      );

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
    const scrollToProducts = () => {
  productsRef.current?.scrollIntoView({
    behavior: "smooth",
  });
  };

  return (
    <>
      {/* Hero Slider */}

      <div
        style={{
          width: "100%",
          height: "450px",
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
            height: "450px",
            objectFit: "cover",
            transition: "0.8s",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "70px",
            transform: "translateY(-50%)",
            color: "#fff",
          }}
        >
          <h1
            style={{
              color: "#0a0a0a",
              fontSize: "58px",
              marginBottom: "20px",
            }}
          >
            Welcome To NexaStore
          </h1>

          <p
            style={{
              color: "#0a0a0a",
              width: "500px",
              fontSize: "22px",
            }}
          >
            India's Best Online Shopping Store for
            Mobiles, Electronics, Fashion, Gaming and
            Accessories.
          </p>

          <button
            onClick={scrollToProducts}
            style={{
              marginTop: "30px",
              background: "#ff9800",
              color: "#fff",
              border: "none",
              padding: "15px 35px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          marginBottom: "50px",
          gap: "20px",
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
    scrollToProducts();
  }}
  style={{
    width: "160px",
    background: "#fff",
    borderRadius: "15px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,.12)",
    cursor: "pointer",
  }}
>
            <div
              style={{
                fontSize: "55px",
              }}
            >
              {item.icon}
            </div>

            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
            {/* Mega Sale Banner */}

      <div
        style={{
          margin: "40px 20px",
          background:
            "linear-gradient(135deg,#ff416c,#ff4b2b)",
          borderRadius: "20px",
          padding: "50px",
          color: "#fff",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,.15)",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            marginBottom: "15px",
          }}
        >
          🔥 Mega Sale 2026
        </h1>

        <h2
          style={{
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Up To 70% OFF
        </h2>

        <p
          style={{
            fontSize: "20px",
          }}
        >
          Mobiles • Laptops • Fashion • Gaming
        </p>
      </div>

      {/* Featured Brands */}

      <div
        style={{
          padding: "20px",
          marginBottom: "50px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "35px",
          }}
        >
          Top Brands
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "25px",
          }}
        >
          {[
            "Apple",
            "Samsung",
            "HP",
            "Sony",
            "Dell",
            "Nike",
          ].map((brand) => (
            <div
              key={brand}
              style={{
                background: "#fff",
                borderRadius: "15px",
                padding: "30px",
                textAlign: "center",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.12)",
              }}
            >
              <h2
                style={{
                  color: "#2874f0",
                }}
              >
                {brand}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}

      <div
        ref={productsRef}
        style={{
        maxWidth: "1300px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            fontSize: "34px",
            marginBottom: "30px",
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
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,.12)",
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
                    color: "#666",
                    minHeight: "45px",
                  }}
                >
                  {product.description.substring(
                    0,
                    60
                  )}
                  ...
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

                <p>Stock : {product.stock}</p>

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
            {/* Why Choose Us */}

      <div
        style={{
          maxWidth: "1300px",
          margin: "70px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "34px",
            marginBottom: "35px",
          }}
        >
          Why Choose NexaStore?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {[
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Free delivery across India.",
            },
            {
              icon: "💳",
              title: "Secure Payment",
              desc: "100% Secure Payment Gateway.",
            },
            {
              icon: "🔄",
              title: "Easy Returns",
              desc: "7 Days Easy Replacement.",
            },
            {
              icon: "📞",
              title: "24/7 Support",
              desc: "Customer support anytime.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                padding: "30px",
                textAlign: "center",
                borderRadius: "15px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.12)",
              }}
            >
              <div style={{ fontSize: "50px" }}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}

      <div
        style={{
          background: "#f8f9fa",
          padding: "60px 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "34px",
          }}
        >
          Customer Reviews
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
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
          ].map((item) => (
            <div
              key={item.name}
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.1)",
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
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2874f0,#1565c0)",
          color: "#fff",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h2 style={{ fontSize: "36px" }}>
          Subscribe to our Newsletter
        </h2>

        <p
          style={{
            margin: "15px 0 30px",
          }}
        >
          Get updates about new arrivals and offers.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "15px",
            width: "320px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            marginRight: "10px",
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
          }}
        >
          Subscribe
        </button>
      </div>

      {/* Footer */}

      <footer
        style={{
          background: "#111",
          color: "#fff",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "30px",
            maxWidth: "1300px",
            margin: "auto",
          }}
        >
          <div>
            <h2>NexaStore</h2>

            <p>
              India's trusted online shopping
              destination for Electronics,
              Fashion, Mobiles and Gaming.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>

            <p>Home</p>
            <p>Products</p>
            <p>Cart</p>
            <p>Orders</p>
          </div>

          <div>
            <h3>Contact</h3>

            <p>📍 Coimbatore, Tamil Nadu</p>
            <p>📞 +91 9876543210</p>
            <p>✉ support@nexastore.com</p>
          </div>

          <div>
            <h3>Follow Us</h3>

            <p>📘 Facebook</p>
            <p>📸 Instagram</p>
            <p>🐦 Twitter</p>
            <p>▶ YouTube</p>
          </div>
        </div>

        <hr
          style={{
            margin: "30px 0",
            borderColor: "#333",
          }}
        />

        <p
          style={{
            textAlign: "center",
          }}
        >
          © 2026 NexaStore. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;