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

      setOrders(res.data.orders || res.data);

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to fetch orders");
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

      alert("Order status updated");
      fetchOrders();

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="admin-main">
        <h1 className="orders-title" style={{ color: "white" }}>
          Manage Orders
        </h1>

        <div className="orders-table-wrapper">
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
                  <td>{order.userId?.name || "Unknown User"}</td>

                  <td>₹{order.totalAmount}</td>

                  <td>{order.paymentMethod}</td>

                  <td>
                    <span
                      className={`status-badge ${order.orderStatus}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td>
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminOrders;