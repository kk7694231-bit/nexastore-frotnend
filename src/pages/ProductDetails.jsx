import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dummyProduct = {
    _id: "dummy1",
    name: "HP Victus Gaming Laptop",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
    price: 54999,
    stock: 10,
    category: "Electronics",
    description:
      "HP Victus Gaming Laptop with Ryzen processor, 16GB RAM, 512GB SSD and RTX Graphics. Perfect for gaming, coding and gaming performance.",
    rating: 4.8,
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://nexastore-backend-rzao.vercel.app/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log("Using Dummy Product");
      setProduct(dummyProduct);
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
                quantity: item.quantity + quantity,
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

    alert("Product Added To Cart");
  };

  const buyNow = () => {
    alert("Proceeding to Checkout...");
  };

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
        display: "flex",
        flexWrap: "wrap",
        gap: "40px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          flex: "1",
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
            borderRadius: "15px",
            background: "#f5f5f5",
            padding: "20px",
          }}
        />
      </div>

      <div
        style={{
          flex: "1",
          minWidth: "350px",
        }}
      >
        <span
          style={{
            background: "#28a745",
            color: "#fff",
            padding: "6px 15px",
            borderRadius: "20px",
            fontSize: "14px",
          }}
        >
          In Stock
        </span>

        <h1
          style={{
            marginTop: "15px",
            fontSize: "38px",
            color: "#222",
          }}
        >
          {product.name}
        </h1>

        <div
          style={{
            color: "#ff9800",
            fontSize: "22px",
            margin: "15px 0",
          }}
        >
          ⭐⭐⭐⭐⭐ ({product.rating || 4.8})
        </div>

        <h2
          style={{
            color: "#e53935",
            fontSize: "36px",
          }}
        >
          ₹{product.price.toLocaleString()}
        </h2>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          <strong>Category:</strong> {product.category}
        </p>

        <p
          style={{
            fontSize: "18px",
          }}
        >
          <strong>Stock:</strong> {product.stock}
        </p>

        <p
          style={{
            marginTop: "20px",
            color: "#555",
            lineHeight: "1.8",
            fontSize: "17px",
          }}
        >
          {product.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <strong>Quantity:</strong>

          <button
            onClick={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              background: "#ddd",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            -
          </button>

          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {quantity}
          </span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              background: "#ddd",
              cursor: "pointer",
              fontSize: "20px",
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
              background: "#ff9900",
              color: "#fff",
              border: "none",
              padding: "16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
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
              padding: "16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            ⚡ Buy Now
          </button>
        </div>

        <div
          style={{
            marginTop: "35px",
            background: "#f8f8f8",
            padding: "20px",
            borderRadius: "10px",
            lineHeight: "2",
          }}
        >
          <h3>🚚 Free Delivery</h3>
          <p>Delivery within 3-5 business days.</p>

          <h3>🔄 Easy Returns</h3>
          <p>7 Days Replacement Policy.</p>

          <h3>🛡 Warranty</h3>
          <p>1 Year Manufacturer Warranty.</p>

          <h3>💳 Secure Payment</h3>
          <p>UPI, Cards, Net Banking & Cash on Delivery.</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;