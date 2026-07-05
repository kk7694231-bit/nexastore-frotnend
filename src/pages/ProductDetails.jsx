import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/${id}`
      );

      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addToCart = () => {
    const exist = cart.find((item) => item._id === product._id);

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

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Product Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        display: "flex",
        gap: "40px",
        boxShadow: "0 5px 20px rgba(0,0,0,.15)",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: 1,
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
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "38px",
            color: "#222",
          }}
        >
          {product.name}
        </h1>

        <p
          style={{
            color: "#ff9800",
            fontSize: "20px",
          }}
        >
          ⭐⭐⭐⭐☆ ({product.rating})
        </p>

        <h2
          style={{
            color: "#e53935",
            fontSize: "36px",
          }}
        >
          ₹{product.price.toLocaleString()}
        </h2>

        <hr />

        <p
          style={{
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          <b>Category :</b> {product.category}
        </p>

        <p
          style={{
            fontSize: "18px",
          }}
        >
          <b>Available Stock :</b> {product.stock}
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
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={addToCart}
            style={{
              background: "#ff9f00",
              color: "#fff",
              border: "none",
              padding: "15px 30px",
              fontSize: "18px",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            🛒 Add To Cart
          </button>

          <button
            style={{
              background: "#fb641b",
              color: "#fff",
              border: "none",
              padding: "15px 30px",
              fontSize: "18px",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1,
            }}
          >
            ⚡ Buy Now
          </button>
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <p>🚚 Free Delivery</p>
          <p>🔄 7 Days Replacement</p>
          <p>🛡 1 Year Warranty</p>
          <p>💳 Secure Payment</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;