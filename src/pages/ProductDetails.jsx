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

  if (loading) {
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

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Product Not Found
      </h2>
    );
  }

  return (
    <>
      <style>
        {`
          .product-details-container {
            max-width: 1200px;
            margin: 40px auto;
            background: #fff;
            padding: 30px;
            border-radius: 15px;
            display: flex;
            gap: 40px;
            box-shadow: 0 5px 20px rgba(0,0,0,.15);
            box-sizing: border-box;
          }

          .product-image-section {
            flex: 1;
            min-width: 0;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          }

          .product-details-image {
            width: 100%;
            max-width: 450px;
            height: 450px;
            object-fit: contain;
          }

          .product-info-section {
            flex: 1;
            min-width: 0;
          }

          .product-title {
            font-size: 38px;
            color: #222;
            margin-top: 0;
          }

          .product-rating {
            color: #ff9800;
            font-size: 20px;
          }

          .product-price {
            color: #e53935;
            font-size: 36px;
          }

          .product-info-text {
            font-size: 18px;
          }

          .product-description {
            margin-top: 20px;
            line-height: 1.8;
            color: #555;
          }

          .product-buttons {
            display: flex;
            gap: 20px;
            margin-top: 30px;
          }

          .product-button {
            color: #fff;
            border: none;
            padding: 15px 20px;
            font-size: 18px;
            border-radius: 8px;
            cursor: pointer;
            flex: 1;
            font-weight: 600;
          }

          .cart-button {
            background: #ff9f00;
          }

          .buy-button {
            background: #fb641b;
          }

          .product-benefits {
            margin-top: 30px;
            padding: 20px;
            background: #f5f5f5;
            border-radius: 10px;
          }

          @media (max-width: 768px) {

            .product-details-container {
              width: calc(100% - 20px);
              margin: 20px auto;
              padding: 18px;
              border-radius: 12px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              gap: 18px;
              box-shadow: 0 4px 15px rgba(0,0,0,.12);
            }

            .product-image-section {
              flex: 0 0 90px;
              width: 90px;
              display: flex;
              justify-content: center;
              align-items: flex-start;
            }

            .product-details-image {
              width: 90px;
              height: 90px;
              max-width: 90px;
              object-fit: contain;
              background: #f7f7f7;
              border-radius: 8px;
              padding: 5px;
              box-sizing: border-box;
            }

            .product-info-section {
              flex: 1;
              width: auto;
              min-width: 0;
            }

            .product-title {
              font-size: 27px;
              line-height: 1.2;
              margin: 0 0 5px;
            }

            .product-rating {
              font-size: 15px;
              margin: 4px 0;
            }

            .product-price {
              font-size: 25px;
              margin: 5px 0 10px;
            }

            .product-info-text {
              font-size: 14px;
              margin: 6px 0;
            }

            .product-description {
              font-size: 14px;
              line-height: 1.6;
              margin-top: 18px;
            }

            .product-buttons {
              display: flex;
              gap: 10px;
              margin-top: 20px;
            }

            .product-button {
              padding: 12px 8px;
              font-size: 15px;
              min-height: 70px;
            }

            .product-benefits {
              margin-top: 20px;
              padding: 12px;
              font-size: 13px;
            }

            .product-benefits p {
              margin: 7px 0;
            }
          }

          @media (max-width: 400px) {

            .product-details-container {
              width: calc(100% - 14px);
              padding: 14px;
              gap: 12px;
            }

            .product-image-section {
              flex: 0 0 75px;
              width: 75px;
            }

            .product-details-image {
              width: 75px;
              height: 75px;
              max-width: 75px;
            }

            .product-title {
              font-size: 24px;
            }

            .product-price {
              font-size: 23px;
            }

            .product-description {
              font-size: 13px;
            }

            .product-button {
              font-size: 14px;
              padding: 10px 5px;
            }
          }
        `}
      </style>

      <div className="product-details-container">

        {/* PRODUCT IMAGE */}

        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />
        </div>

        {/* PRODUCT DETAILS */}

        <div className="product-info-section">

          <h1 className="product-title">
            {product.name}
          </h1>

          <p className="product-rating">
            ⭐⭐⭐⭐☆ ({product.rating || 0})
          </p>

          <h2 className="product-price">
            ₹{product.price.toLocaleString()}
          </h2>

          <hr />

          <p className="product-info-text">
            <b>Category :</b>{" "}
            {product.category}
          </p>

          <p className="product-info-text">
            <b>Available Stock :</b>{" "}
            {product.stock}
          </p>

          <p className="product-description">
            {product.description}
          </p>

          {/* BUTTONS */}

          <div className="product-buttons">

            <button
              onClick={addToCart}
              className="product-button cart-button"
            >
              🛒 Add To Cart
            </button>

            <button
              className="product-button buy-button"
            >
              ⚡ Buy Now
            </button>

          </div>

          {/* BENEFITS */}

          <div className="product-benefits">

            <p>🚚 Free Delivery</p>

            <p>🔄 7 Days Replacement</p>

            <p>🛡 1 Year Warranty</p>

            <p>💳 Secure Payment</p>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;