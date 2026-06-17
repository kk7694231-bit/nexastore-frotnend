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

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <h2 style={{ color: "#ff6b6b" }}>
  Your Cart Is Empty 🛒
</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="cart-item"
        >

          <img
            src={item.image}
            alt={item.name}
          />

          <div>
            <h3>{item.name}</h3>

            <p>
              ₹{item.price.toLocaleString()}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <button
                onClick={() =>
                  decreaseQty(item._id)
                }
              >
                -
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

              <button
                onClick={() =>
                  deleteItem(item._id)
                }
              >
                Delete
              </button>
            </div>

          </div>

        </div>
      ))}

      <div className="cart-summary">

        <h2 className="total-price">
          Total: ₹
          {totalPrice.toLocaleString()}
        </h2>

<button
  onClick={() =>
    window.location.href =
      "/checkout"
  }
>
  Proceed To Checkout
</button>

      </div>

    </div>
  );
}

export default Cart;