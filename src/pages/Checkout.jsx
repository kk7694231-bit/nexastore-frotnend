import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({ cart }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

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

    try {
      const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

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
      console.error("ORDER ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Order Failed");
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <p
        style={{ color: "white" }}
        className="checkout-subtitle"
      >
        Secure Checkout • Fast Delivery • Premium Experience
      </p>

      <textarea
        placeholder="Enter Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={placeOrder}>
        🚀 Place Order
      </button>
    </div>
  );
}

export default Checkout;