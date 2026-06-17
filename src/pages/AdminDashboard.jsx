import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

return (
  <div className="admin-container">
    <AdminSidebar />

    <main className="admin-main">

      <h1
  className="dashboard-title"
  style={{ color: "white" }}
>
  Admin Dashboard
</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>👥 Total Users</h3>
          <p>{data.totalUsers}</p>
        </div>

        <div className="dashboard-card">
          <h3>📦 Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <h3>🛒 Total Orders</h3>
          <p>{data.totalOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>💰 Revenue</h3>
          <p>
            ₹{data.totalRevenue.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="dashboard-summary">

        <div className="summary-card">
          <h2>Store Summary</h2>

          <p>
            Users Registered:
            <strong>
              {" "}
              {data.totalUsers}
            </strong>
          </p>

          <p>
            Products Listed:
            <strong>
              {" "}
              {data.totalProducts}
            </strong>
          </p>

          <p>
            Orders Received:
            <strong>
              {" "}
              {data.totalOrders}
            </strong>
          </p>

        </div>

      </div>

    </main>
  </div>
);
}

export default AdminDashboard;
