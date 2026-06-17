import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data);
    } catch (error) {
      console.log(error);
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

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-details">
      <img
        src={product.image}
        alt={product.name}
      />

      <h1>{product.name}</h1>

      <h2>
        ₹{product.price.toLocaleString()}
      </h2>

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
  );
}

export default ProductDetails;