import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      const res = await axios.get(
        `http://localhost:5000/api/orders/user/${userId}`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="order-card"
        >
          <h3>
            Order ID: {order._id}
          </h3>

          <p>
            Status:
            {order.orderStatus}
          </p>

          <p>
            Amount:
            ₹{order.totalAmount}
          </p>

          <p>
            Products:
            {order.products.length}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;