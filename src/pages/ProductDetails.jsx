import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log("Product ID:", id);

      const res = await axios.get(
        `${API_URL}/api/products/${id}`
      );

      console.log("Product Response:", res.data);

      setProduct(res.data);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Product Not Found");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
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

    alert("Product Added To Cart");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
  }

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">
        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p className="stock">
          Stock: {product.stock}
        </p>

        <p>{product.description}</p>

        <div className="product-buttons">
          <button
            className="cart-btn"
            onClick={addToCart}
          >
            Add To Cart
          </button>

          <button className="buy-btn">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;