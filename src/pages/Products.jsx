import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  useLocation,
} from "react-router-dom";

function Products({
  cart,
  setCart,
}) {
  const [products, setProducts] =
    useState([]);

  const location = useLocation();

  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search
      );

    const keyword =
      params.get("keyword") || "";

    const category =
      params.get("category") || "";

    axios
      .get(
        `http://localhost:5000/api/products?keyword=${keyword}&category=${category}`
      )
      .then((res) =>
        setProducts(res.data)
      )
      .catch((err) =>
        console.log(err)
      );
  }, [location.search]);

  const addToCart = (product) => {
    const existingItem =
      cart.find(
        (item) =>
          item._id === product._id
      );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
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
  };

  return (
    <div className="products-container">
      {products.map((product) => (
       <div
  key={product._id}
  className="product-card"
>
  <span className="trending-badge">
    🔥 Trending
  </span>

  <img
    src={product.image}
    alt={product.name}
  />

  <Link to={`/products/${product._id}`}>
    <h3>{product.name}</h3>
  </Link>

  <div className="rating">
    ⭐⭐⭐⭐⭐
  </div>

 <div className="price-box">

  <span className="new-price">
    ₹{product.price}
  </span>

  <span className="old-price">
    ₹{Math.floor(product.price * 1.2)}
  </span>

  <span className="offer-badge">
    20% OFF
  </span>

</div>

  <button
    onClick={() => addToCart(product)}
  >
    Add To Cart
  </button>
</div>
      ))}
    </div>
  );
}

export default Products;