import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cart }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    if (!userId) {
      alert("User ID not found. Please login again.");
      navigate("/login");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/products");
      return;
    }

    try {
      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      console.log("USER ID:", userId);
      console.log("TOTAL AMOUNT:", totalAmount);
      console.log("PRODUCTS:", products);

      const response = await axios.post(
        "https://nexastore-backend-rzao.vercel.app/api/orders",
        {
          userId,
          products,
          totalAmount,
          paymentMethod: "COD",
          orderStatus: "Pending",
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Order Placed Successfully");

      navigate("/");
    } catch (error) {
      console.error(
        "ORDER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Order Failed"
      );
    }
  };

  return (
    <div className="checkout-page">

      {/* ================= HEADER ================= */}

      <div className="checkout-header">

        <div>
          <span className="checkout-tag">
            NEXASTORE CHECKOUT
          </span>

          <h1>Checkout</h1>

          <p>
            Complete your order securely and
            get your products delivered to you.
          </p>
        </div>

        <div className="checkout-security">
          🔒 Secure Checkout
        </div>

      </div>


      {/* ================= CHECKOUT LAYOUT ================= */}

      <div className="checkout-layout">


        {/* ================= DELIVERY DETAILS ================= */}

        <div className="checkout-main">

          <div className="checkout-card">

            <div className="checkout-card-heading">

              <div className="checkout-heading-icon">
                📍
              </div>

              <div>
                <h2>Delivery Information</h2>

                <p>
                  Where should we deliver your order?
                </p>
              </div>

            </div>


            <div className="address-field">

              <label>
                Delivery Address
              </label>

              <textarea
                placeholder="Enter your complete delivery address..."
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                rows="6"
              />

              <span>
                Please provide a complete address
                for successful delivery.
              </span>

            </div>

          </div>


          {/* Payment */}

          <div className="checkout-card">

            <div className="checkout-card-heading">

              <div className="checkout-heading-icon">
                💳
              </div>

              <div>
                <h2>Payment Method</h2>

                <p>
                  Select your preferred payment method
                </p>
              </div>

            </div>


            <div className="payment-option selected">

              <div className="payment-radio">
                ✓
              </div>

              <div className="payment-info">

                <strong>
                  Cash on Delivery
                </strong>

                <span>
                  Pay when your order is delivered
                </span>

              </div>

              <div className="payment-badge">
                COD
              </div>

            </div>

          </div>


          {/* Delivery Features */}

          <div className="checkout-features">

            <div>
              <span>🔒</span>

              <div>
                <strong>Secure Payment</strong>
                <p>Your order is protected</p>
              </div>
            </div>

            <div>
              <span>🚚</span>

              <div>
                <strong>Fast Delivery</strong>
                <p>Quick and reliable delivery</p>
              </div>
            </div>

            <div>
              <span>✓</span>

              <div>
                <strong>Quality Products</strong>
                <p>Products you can trust</p>
              </div>
            </div>

          </div>

        </div>


        {/* ================= ORDER SUMMARY ================= */}

        <div className="checkout-summary">

          <div className="checkout-summary-heading">

            <h2>Order Summary</h2>

            <span>
              {totalItems}{" "}
              {totalItems === 1
                ? "Item"
                : "Items"}
            </span>

          </div>


          {/* Products */}

          <div className="checkout-products">

            {cart.map((item) => (

              <div
                key={item._id}
                className="checkout-product"
              >

                <div className="checkout-product-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <span>
                    {item.quantity}
                  </span>

                </div>


                <div className="checkout-product-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>


                <strong>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            ))}

          </div>


          {/* Price Details */}

          <div className="checkout-price-details">

            <div>
              <span>Subtotal</span>

              <strong>
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>


            <div>
              <span>Delivery</span>

              <strong className="free-text">
                FREE
              </strong>
            </div>


            <div>
              <span>Discount</span>

              <strong>
                ₹0
              </strong>
            </div>

          </div>


          <div className="checkout-divider"></div>


          <div className="checkout-total">

            <span>Total Amount</span>

            <strong>
              ₹
              {totalAmount.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          {/* Place Order */}

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            <span>🚀</span>

            Place Order

            <span>→</span>
          </button>


          <p className="checkout-note">
            🔒 Your order details are securely
            processed.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Checkout;