import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        {
          orderStatus: status,
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
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
              <th>Status</th>
              <th>Payment</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.userId?.name}
                </td>

                <td>
                  ₹{order.totalAmount}
                </td>

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
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    value={order.orderStatus}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
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