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

        /* ==============================
           MAIN PRODUCT DETAILS
        ============================== */

        .product-details-container {
          width: calc(100% - 40px);
          max-width: 1200px;
          margin: 40px auto;
          padding: 30px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 45px;

          box-sizing: border-box;
        }


        /* ==============================
           IMAGE BOX
        ============================== */

        .product-image-section {
          width: 100%;
          min-height: 500px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f7f8fa;

          border: 1px solid #e5e5e5;
          border-radius: 14px;

          padding: 25px;
          box-sizing: border-box;
        }


        .product-details-image {
          width: 100%;
          height: 450px;

          object-fit: contain;

          display: block;
        }


        /* ==============================
           PRODUCT INFORMATION
        ============================== */

        .product-info-section {
          width: 100%;
          min-width: 0;
        }


        .product-title {
          font-size: 38px;
          color: #102a43;
          margin: 0 0 10px;
          line-height: 1.2;
        }


        .product-rating {
          color: #ff9800;
          font-size: 20px;
          margin: 8px 0;
        }


        .product-price {
          color: #e53935;
          font-size: 36px;
          margin: 10px 0 15px;
        }


        .product-info-section hr {
          border: none;
          border-top: 1px solid #ddd;
          margin: 15px 0 20px;
        }


        .product-info-text {
          font-size: 17px;
          color: #333;
          margin: 8px 0;
        }


        .product-description {
          margin-top: 25px;
          line-height: 1.8;
          color: #555;
          font-size: 16px;
        }


        /* ==============================
           BUTTONS
        ============================== */

        .product-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }


        .product-button {
          flex: 1;

          color: #ffffff;
          border: none;

          padding: 15px 20px;

          font-size: 17px;
          font-weight: 600;

          border-radius: 8px;

          cursor: pointer;

          min-height: 55px;
        }


        .cart-button {
          background: #ff9f00;
        }


        .buy-button {
          background: #fb641b;
        }


        .product-button:hover {
          opacity: 0.9;
        }


        /* ==============================
           BENEFITS
        ============================== */

        .product-benefits {
          margin-top: 30px;

          padding: 18px;

          background: #f5f5f5;

          border-radius: 10px;

          color: #333;
        }


        .product-benefits p {
          margin: 10px 0;
          font-size: 15px;
        }


        /* ==============================
           TABLET
        ============================== */

        @media (max-width: 900px) {

          .product-details-container {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 25px;
          }


          .product-image-section {
            min-height: 400px;
          }


          .product-details-image {
            height: 350px;
          }

        }


        /* ==============================
           MOBILE
        ============================== */

        @media (max-width: 768px) {

          .product-details-container {
            width: calc(100% - 20px);

            margin: 20px auto;

            padding: 12px;

            border-radius: 14px;

            display: flex;
            flex-direction: column;

            gap: 20px;

            box-shadow:
              0 4px 15px rgba(0, 0, 0, 0.10);
          }


          /* IMAGE HAS ITS OWN BORDERED BOX */

          .product-image-section {
            width: 100%;

            height: 280px;
            min-height: 280px;

            padding: 15px;

            background: #f8f9fa;

            border: 2px solid #e6e6e6;

            border-radius: 12px;

            box-sizing: border-box;
          }


          .product-details-image {
            width: 100%;
            height: 245px;

            object-fit: contain;
          }


          /* DETAILS FULL WIDTH */

          .product-info-section {
            width: 100%;
          }


          .product-title {
            font-size: 28px;

            margin: 0 0 5px;

            line-height: 1.2;
          }


          .product-rating {
            font-size: 16px;

            margin: 5px 0;
          }


          .product-price {
            font-size: 27px;

            margin: 7px 0 12px;
          }


          .product-info-section hr {
            margin: 12px 0 16px;
          }


          .product-info-text {
            font-size: 14px;

            margin: 7px 0;
          }


          .product-description {
            font-size: 14px;

            line-height: 1.7;

            margin-top: 18px;
          }


          /* BUTTONS */

          .product-buttons {
            display: flex;

            gap: 10px;

            margin-top: 22px;
          }


          .product-button {
            padding: 13px 8px;

            font-size: 15px;

            min-height: 55px;
          }


          /* BENEFITS */

          .product-benefits {
            margin-top: 20px;

            padding: 13px;

            border-radius: 9px;
          }


          .product-benefits p {
            font-size: 13px;

            margin: 7px 0;
          }

        }


        /* ==============================
           SMALL MOBILE
        ============================== */

        @media (max-width: 400px) {

          .product-details-container {
            width: calc(100% - 14px);

            padding: 10px;

            gap: 16px;
          }


          .product-image-section {
            height: 240px;
            min-height: 240px;

            padding: 12px;
          }


          .product-details-image {
            height: 210px;
          }


          .product-title {
            font-size: 25px;
          }


          .product-rating {
            font-size: 15px;
          }


          .product-price {
            font-size: 25px;
          }


          .product-description {
            font-size: 13px;
          }


          .product-button {
            font-size: 14px;

            padding: 11px 5px;
          }

        }

        `}
      </style>


      {/* ==========================================
          PRODUCT DETAILS CONTAINER
      =========================================== */}

      <div className="product-details-container">


        {/* ==========================================
            PRODUCT IMAGE
        =========================================== */}

        <div className="product-image-section">

          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />

        </div>


        {/* ==========================================
            PRODUCT INFORMATION
        =========================================== */}

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


          {/* ==========================================
              BUTTONS
          =========================================== */}

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


          {/* ==========================================
              BENEFITS
          =========================================== */}

          <div className="product-benefits">

            <p>
              🚚 Free Delivery
            </p>

            <p>
              🔄 7 Days Replacement
            </p>

            <p>
              🛡 1 Year Warranty
            </p>

            <p>
              💳 Secure Payment
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;