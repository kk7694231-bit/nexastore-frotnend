import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function AdminAnalytics() {
  const [data, setData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/admin/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "REAL ANALYTICS DATA:",
        res.data
      );

      setData({
        totalUsers: res.data.totalUsers || 0,
        totalProducts: res.data.totalProducts || 0,
        totalOrders: res.data.totalOrders || 0,
        totalRevenue: res.data.totalRevenue || 0,
      });

      setSalesHistory(
        Array.isArray(res.data.salesHistory)
          ? res.data.salesHistory
          : []
      );

    } catch (error) {
      console.log(
        "Analytics Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="admin-main">
        <div className="analytics-loading">
          Loading Analytics...
        </div>
      </main>
    );
  }

  return (
    <main className="admin-main">

      {/* HEADER */}

      <div className="analytics-header">

        <span className="analytics-label">
          STORE INSIGHTS
        </span>

        <h1>📊 Sales Analytics</h1>

        <p>
          Track your store performance,
          orders and revenue.
        </p>

      </div>


      {/* STAT CARDS */}

      <div className="analytics-cards">

        <div className="dashboard-card">

          <div className="analytics-card-top">
            <span className="analytics-icon">
              👥
            </span>

            <span className="analytics-card-label">
              CUSTOMERS
            </span>
          </div>

          <h3>Total Users</h3>

          <p>
            {data.totalUsers.toLocaleString()}
          </p>

        </div>


        <div className="dashboard-card">

          <div className="analytics-card-top">
            <span className="analytics-icon">
              📦
            </span>

            <span className="analytics-card-label">
              PRODUCTS
            </span>
          </div>

          <h3>Total Products</h3>

          <p>
            {data.totalProducts.toLocaleString()}
          </p>

        </div>


        <div className="dashboard-card">

          <div className="analytics-card-top">
            <span className="analytics-icon">
              🛒
            </span>

            <span className="analytics-card-label">
              ORDERS
            </span>
          </div>

          <h3>Total Orders</h3>

          <p>
            {data.totalOrders.toLocaleString()}
          </p>

        </div>


        <div className="dashboard-card">

          <div className="analytics-card-top">
            <span className="analytics-icon">
              💰
            </span>

            <span className="analytics-card-label">
              REVENUE
            </span>
          </div>

          <h3>Total Revenue</h3>

          <p>
            ₹{data.totalRevenue.toLocaleString("en-IN")}
          </p>

        </div>

      </div>


      {/* GRAPH */}

      <div className="chart-container">

        <div className="chart-header">

          <div>
            <span className="chart-label">
              SALES PERFORMANCE
            </span>

            <h2>
              Revenue History
            </h2>

            <p>
              Revenue generated from your
              actual orders
            </p>
          </div>

          <div className="chart-total">

            <span>
              Total Revenue
            </span>

            <strong>
              ₹{data.totalRevenue.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>


        {salesHistory.length > 0 ? (

          <div className="analytics-chart">

            <ResponsiveContainer
              width="100%"
              height={400}
            >

              <LineChart
                data={salesHistory}
                margin={{
                  top: 20,
                  right: 30,
                  left: 10,
                  bottom: 20,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />

                <XAxis
                  dataKey="_id"
                  stroke="#999"
                  tick={{
                    fill: "#999",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  stroke="#999"
                  tick={{
                    fill: "#999",
                    fontSize: 12,
                  }}
                  tickFormatter={(value) =>
                    `₹${value}`
                  }
                />

                <Tooltip
                  contentStyle={{
                    background: "#151515",
                    border:
                      "1px solid #D4AF37",
                    borderRadius: "10px",
                  }}
                  labelStyle={{
                    color: "#D4AF37",
                  }}
                  formatter={(value, name) => {

                    if (name === "revenue") {
                      return [
                        `₹${Number(value).toLocaleString(
                          "en-IN"
                        )}`,
                        "Revenue",
                      ];
                    }

                    return [
                      value,
                      "Orders",
                    ];
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D4AF37"
                  strokeWidth={4}
                  dot={{
                    r: 5,
                    fill: "#D4AF37",
                  }}
                  activeDot={{
                    r: 8,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        ) : (

          <div className="no-sales-data">

            <div className="no-sales-icon">
              📈
            </div>

            <h3>
              No Sales Data Yet
            </h3>

            <p>
              Once customers place orders,
              your revenue graph will appear here.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}

export default AdminAnalytics;