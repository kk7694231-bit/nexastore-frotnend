import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders API Response:", res.data);

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log("Orders Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );

      setOrders([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/api/orders/${id}`,
        {
          orderStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order status updated successfully");

      fetchOrders();
    } catch (error) {
      console.log("Update Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update order"
      );
    }
  };

  return (
    <main className="admin-main">

      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">
            ORDER MANAGEMENT
          </p>

          <h1 className="orders-title">
            Manage Orders
          </h1>

          <p className="admin-page-subtitle">
            View and manage customer orders
          </p>
        </div>

        <div className="order-count">
          {orders.length} Orders
        </div>
      </div>

      <div className="orders-table-wrapper">

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">
              🛒
            </div>

            <h2>No Orders Found</h2>

            <p>
              Customer orders will appear here once
              they place an order.
            </p>
          </div>
        ) : (
          <table className="orders-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>

                  <td>
                    <div className="order-user">
                      <div className="order-user-icon">
                        👤
                      </div>

                      <div>
                        <strong>
                          {order.userId?.name ||
                            "Unknown User"}
                        </strong>

                        {order.userId?.email && (
                          <small>
                            {order.userId.email}
                          </small>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="order-total">
                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString()}
                  </td>

                  <td>
                    <span className="payment-badge">
                      {order.paymentMethod || "COD"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        order.orderStatus || "Pending"
                      }`}
                    >
                      {order.orderStatus || "Pending"}
                    </span>
                  </td>

                  <td>
                    <select
                      value={
                        order.orderStatus ||
                        "Pending"
                      }
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </main>
  );
}

export default AdminOrders;