import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const dummyProduct = {
    _id: "dummy1",
    name: "HP Victus Gaming Laptop",
    image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
    price: 54999,
    stock: 10,
    category: "Electronics",
    description:
      "HP Victus Gaming Laptop with Ryzen processor, 16GB RAM, 512GB SSD and RTX Graphics. Perfect for gaming, coding and daily work.",
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
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert("Product Added To Cart");
  };

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="rating">
          ⭐ {product.rating} / 5
        </p>

        <h2>₹{product.price.toLocaleString()}</h2>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
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