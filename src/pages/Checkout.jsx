import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cart }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

if (!token) {
  alert("Please Login First");
  navigate("/login");
  return;
}
    try {
      const userId = localStorage.getItem("userId");

      const totalPrice = cart.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      );

      const products = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));
      console.log("CART =", JSON.stringify(cart, null, 2));
console.log("PRODUCTS =", JSON.stringify(products, null, 2));
    await axios.post(
  "http://localhost:5000/api/orders",
  {
    userId,
    products,
    totalAmount: totalPrice,
    paymentMethod: "COD",
    orderStatus: "Pending",
  }
);

      alert("Order Placed Successfully");
    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <p style={{ color: "white" }} className="checkout-subtitle">
  Secure Checkout • Fast Delivery • Premium Experience
</p>

      <textarea
        placeholder="Enter Delivery Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
      />

      <button onClick={placeOrder}>
  🚀 Place Order
</button>
    </div>
  );
}

export default Checkout;