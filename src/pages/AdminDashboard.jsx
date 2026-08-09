import { useEffect, useState } from "react";
import axios from "axios";

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
        "https://nexastore-backend-rzao.vercel.app/api/admin/dashboard",
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
    <main className="admin-main">

      {/* ================= HEADER ================= */}

      <div className="admin-dashboard-header">

        <div>
          <span className="admin-dashboard-tag">
            NEXASTORE ADMIN
          </span>

          <h1 className="dashboard-title">
            Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Monitor your store performance and activity.
          </p>
        </div>

        <div className="admin-status">
          <span className="status-dot"></span>
          Store Active
        </div>

      </div>


      {/* ================= STAT CARDS ================= */}

      <div className="dashboard-cards">

        {/* Users */}

        <div className="dashboard-card users-card">

          <div className="dashboard-card-top">

            <div className="dashboard-icon">
              👥
            </div>

            <span className="dashboard-label">
              CUSTOMERS
            </span>

          </div>

          <h3>
            Total Users
          </h3>

          <p>
            {data.totalUsers.toLocaleString("en-IN")}
          </p>

          <span className="dashboard-card-footer">
            Registered users
          </span>

        </div>


        {/* Products */}

        <div className="dashboard-card products-card">

          <div className="dashboard-card-top">

            <div className="dashboard-icon">
              📦
            </div>

            <span className="dashboard-label">
              INVENTORY
            </span>

          </div>

          <h3>
            Total Products
          </h3>

          <p>
            {data.totalProducts.toLocaleString("en-IN")}
          </p>

          <span className="dashboard-card-footer">
            Products listed
          </span>

        </div>


        {/* Orders */}

        <div className="dashboard-card orders-card">

          <div className="dashboard-card-top">

            <div className="dashboard-icon">
              🛒
            </div>

            <span className="dashboard-label">
              SALES
            </span>

          </div>

          <h3>
            Total Orders
          </h3>

          <p>
            {data.totalOrders.toLocaleString("en-IN")}
          </p>

          <span className="dashboard-card-footer">
            Orders received
          </span>

        </div>


        {/* Revenue */}

        <div className="dashboard-card revenue-card">

          <div className="dashboard-card-top">

            <div className="dashboard-icon">
              ₹
            </div>

            <span className="dashboard-label">
              REVENUE
            </span>

          </div>

          <h3>
            Total Revenue
          </h3>

          <p>
            ₹
            {data.totalRevenue.toLocaleString("en-IN")}
          </p>

          <span className="dashboard-card-footer">
            Store earnings
          </span>

        </div>

      </div>


      {/* ================= STORE SUMMARY ================= */}

      <div className="dashboard-summary">

        <div className="summary-card">

          <div className="summary-header">

            <div>
              <span className="summary-tag">
                STORE OVERVIEW
              </span>

              <h2>
                Store Summary
              </h2>

              <p>
                A quick overview of your NexaStore.
              </p>
            </div>

            <div className="summary-icon">
              📊
            </div>

          </div>


          <div className="summary-stats">

            <div className="summary-stat">

              <span className="summary-stat-icon">
                👥
              </span>

              <div>
                <span>
                  Users Registered
                </span>

                <strong>
                  {data.totalUsers.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>


            <div className="summary-stat">

              <span className="summary-stat-icon">
                📦
              </span>

              <div>
                <span>
                  Products Listed
                </span>

                <strong>
                  {data.totalProducts.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>


            <div className="summary-stat">

              <span className="summary-stat-icon">
                🛒
              </span>

              <div>
                <span>
                  Orders Received
                </span>

                <strong>
                  {data.totalOrders.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>


            <div className="summary-stat">

              <span className="summary-stat-icon revenue-summary-icon">
                ₹
              </span>

              <div>
                <span>
                  Total Revenue
                </span>

                <strong>
                  ₹
                  {data.totalRevenue.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default AdminDashboard;