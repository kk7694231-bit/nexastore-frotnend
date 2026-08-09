import React from "react";

function Cart({ cart, setCart }) {
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteItem = (id) => {
    setCart(
      cart.filter((item) => item._id !== id)
    );
  };

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* ================= EMPTY CART ================= */

  if (cart.length === 0) {
    return (
      <div className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <span className="cart-tag">
            NEXASTORE
          </span>

          <h1>Your Cart Is Empty</h1>

          <p>
            Looks like you haven't added anything
            to your shopping cart yet.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() =>
              window.location.href = "/products"
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* ================= HEADER ================= */}

      <div className="cart-header">

        <div>
          <span className="cart-tag">
            NEXASTORE
          </span>

          <h1>Shopping Cart</h1>

          <p>
            Review your items before checkout
          </p>
        </div>

        <div className="cart-item-count">
          <strong>{totalItems}</strong>

          <span>
            {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>

      </div>


      {/* ================= CART LAYOUT ================= */}

      <div className="cart-layout">


        {/* ================= PRODUCTS ================= */}

        <div className="cart-products">

          <div className="cart-section-title">

            <h2>
              Your Cart
            </h2>

            <span>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}
            </span>

          </div>


          {cart.map((item) => (

            <div
              key={item._id}
              className="cart-product"
            >

              {/* Product Image */}

              <div className="cart-product-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

              </div>


              {/* Product Information */}

              <div className="cart-product-info">

                <h3>
                  {item.name}
                </h3>

                <p className="cart-product-price">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

                <span className="cart-product-label">
                  In Stock
                </span>


                {/* Quantity */}

                <div className="cart-product-actions">

                  <div className="quantity-control">

                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                    >
                      +
                    </button>

                  </div>


                  <button
                    className="remove-cart-btn"
                    onClick={() =>
                      deleteItem(item._id)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>


              {/* Item Total */}

              <div className="cart-item-total">

                <span>
                  Item Total
                </span>

                <strong>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

          ))}


          {/* Continue Shopping */}

          <button
            className="continue-shopping-link"
            onClick={() =>
              window.location.href = "/products"
            }
          >
            ← Continue Shopping
          </button>

        </div>


        {/* ================= SUMMARY ================= */}

        <div className="cart-summary-card">

          <div className="summary-header">

            <h2>
              Order Summary
            </h2>

            <span>
              🛒
            </span>

          </div>


          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong className="free-delivery">
              FREE
            </strong>

          </div>


          <div className="summary-row">

            <span>
              Discount
            </span>

            <strong>
              ₹0
            </strong>

          </div>


          <div className="summary-divider"></div>


          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>


          <button
            className="checkout-btn"
            onClick={() =>
              window.location.href =
                "/checkout"
            }
          >
            Proceed To Checkout
            <span>→</span>
          </button>


          <div className="secure-checkout">

            <span>
              🔒
            </span>

            <div>
              <strong>
                Secure Checkout
              </strong>

              <p>
                Your information is protected
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;