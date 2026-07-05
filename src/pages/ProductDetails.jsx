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
      const { data } = await axios.get(
        `${API_URL}/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 404) {
        alert("Product not found");
      } else {
        alert("Unable to load product");
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
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
      <img src={product.image} alt={product.name} />

      <div className="product-info">
        <h1>{product.name}</h1>

        <h2>₹{product.price.toLocaleString()}</h2>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <p>{product.description}</p>

        <div className="product-buttons">
          <button className="cart-btn" onClick={addToCart}>
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