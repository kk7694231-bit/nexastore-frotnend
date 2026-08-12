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
      console.log("Analytics Error:", error);

      setData({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
      });

      setSalesHistory([]);
    }
  };

  return (
    <main className="analytics-page">

      {/* PAGE HEADER */}
      <div className="analytics-header">
        <span className="analytics-label">
          STORE INSIGHTS
        </span>

        <h1>
          📊 Sales Analytics
        </h1>

        <p>
          Track your store performance, orders and revenue.
        </p>
      </div>


      {/* ANALYTICS CARDS */}
      <div className="analytics-cards">

        {/* USERS */}
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


        {/* PRODUCTS */}
        <div className="dashboard-card">
          <div className="analytics-card-top">
            <span className="analytics-icon">
              📦
            </span>

            <span className="analytics-card-label">
              INVENTORY
            </span>
          </div>

          <h3>Total Products</h3>

          <p>
            {data.totalProducts.toLocaleString()}
          </p>
        </div>


        {/* ORDERS */}
        <div className="dashboard-card">
          <div className="analytics-card-top">
            <span className="analytics-icon">
              🛒
            </span>

            <span className="analytics-card-label">
              SALES
            </span>
          </div>

          <h3>Total Orders</h3>

          <p>
            {data.totalOrders.toLocaleString()}
          </p>
        </div>


        {/* REVENUE */}
        <div className="dashboard-card">
          <div className="analytics-card-top">
            <span className="analytics-icon">
              💰
            </span>

            <span className="analytics-card-label">
              EARNINGS
            </span>
          </div>

          <h3>Total Revenue</h3>

          <p>
            ₹{data.totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

      </div>


      {/* REVENUE CHART */}
      <div className="chart-container">

        <div className="chart-header">
          <div>
            <span className="chart-label">
              PERFORMANCE
            </span>

            <h2>
              Revenue History
            </h2>

            <p>
              Your store revenue over time
            </p>
          </div>

          <div className="chart-total">
            <span>Total Revenue</span>

            <strong>
              ₹{data.totalRevenue.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>


        {/* CHART */}
        <div className="analytics-chart">

          {salesHistory.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={400}
            >
              <LineChart
                data={salesHistory}
                margin={{
                  top: 20,
                  right: 20,
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
                  stroke="#8b98a7"
                  tick={{
                    fill: "#8b98a7",
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#8b98a7"
                  tick={{
                    fill: "#8b98a7",
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `₹${value}`
                  }
                />

                <Tooltip
                  contentStyle={{
                    background: "#151515",
                    border:
                      "1px solid rgba(212,175,55,0.35)",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                  labelStyle={{
                    color: "#d4af37",
                  }}
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString(
                      "en-IN"
                    )}`,
                    "Revenue",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D4AF37"
                  strokeWidth={4}
                  dot={{
                    r: 4,
                    fill: "#D4AF37",
                  }}
                  activeDot={{
                    r: 7,
                  }}
                />

              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-sales-data">

              <div className="no-sales-icon">
                📈
              </div>

              <h3>
                No Sales Data Yet
              </h3>

              <p>
                Revenue history will appear here
                once customers place orders.
              </p>

            </div>
          )}

        </div>

      </div>

    </main>
  );
}

export default AdminAnalytics;