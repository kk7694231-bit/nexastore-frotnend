import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/${id}`
      );

      setProduct(data);

      fetchRelatedProducts(data.category, data._id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (
    category,
    currentId
  ) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products?category=${category}`
      );

      const filtered = data
        .filter((item) => item._id !== currentId)
        .slice(0, 3);

      setRelatedProducts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    const exist = cart.find(
      (item) => item._id === product._id
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
        },
      ]);
    }

    alert("Product Added Successfully");
  };

  const buyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "120px",
        }}
      >
        Loading...
      </h2>
    );
  }

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "120px",
          color: "red",
        }}
      >
        Product Not Found
      </h2>
    );
  } 
    return (
    <>
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "30px",
          background: "#fff",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,.15)",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "350px",
            textAlign: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "450px",
              height: "450px",
              objectFit: "contain",
              borderRadius: "12px",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "350px",
          }}
        >
          <span
            style={{
              background: "#28a745",
              color: "#fff",
              padding: "6px 15px",
              borderRadius: "20px",
            }}
          >
            In Stock
          </span>

          <h1
            style={{
              fontSize: "38px",
              marginTop: "20px",
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              color: "#ff9800",
              fontSize: "20px",
              margin: "15px 0",
            }}
          >
            ⭐⭐⭐⭐☆ ({product.rating})
          </div>

          <h2
            style={{
              color: "#e53935",
              fontSize: "36px",
            }}
          >
            ₹{product.price.toLocaleString()}
          </h2>

          <p style={{ marginTop: "20px" }}>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Available Stock:</strong> {product.stock}
          </p>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.8",
              color: "#555",
            }}
          >
            {product.description}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <strong>Quantity</strong>

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              style={{
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
            >
              -
            </button>

            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              style={{
                width: "35px",
                height: "35px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "35px",
            }}
          >
            <button
              onClick={addToCart}
              style={{
                flex: 1,
                background: "#ff9f00",
                color: "#fff",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              🛒 Add To Cart
            </button>

            <button
              onClick={buyNow}
              style={{
                flex: 1,
                background: "#fb641b",
                color: "#fff",
                border: "none",
                padding: "15px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "bold",
              }}
            >
              ⚡ Buy Now
            </button>
          </div>

          <div
            style={{
              marginTop: "35px",
              background: "#f5f5f5",
              padding: "20px",
              borderRadius: "10px",
              lineHeight: "2",
            }}
          >
            <p>🚚 Free Delivery</p>
            <p>🔄 7 Days Replacement</p>
            <p>🛡 1 Year Warranty</p>
            <p>💳 Secure Payments</p>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "50px auto",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          Related Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          {relatedProducts.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,.15)",
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "contain",
                }}
              />

              <h3>{item.name}</h3>

              <p
                style={{
                  color: "#ff9800",
                }}
              >
                ⭐⭐⭐⭐☆
              </p>

              <h2
                style={{
                  color: "#e53935",
                }}
              >
                ₹{item.price.toLocaleString()}
              </h2>

              <Link
                to={`/products/${item._id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <button
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    background: "#2874f0",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  View Product
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;