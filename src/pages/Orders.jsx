import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/orders/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders Response:", res.data);

      setOrders(res.data.orders || []);

    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card"
          >
            <h3>Order ID: {order._id}</h3>

            <p>
              <strong>Amount:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>

            <hr />

            <h4>Products</h4>

            {order.products?.map((item) => (
              <div key={item._id}>
                <p>
                  {item.productId?.name || "Product"}
                </p>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;