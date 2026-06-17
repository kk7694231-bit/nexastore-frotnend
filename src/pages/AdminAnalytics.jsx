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

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData({
        totalUsers: res.data.totalUsers,
        totalProducts: res.data.totalProducts,
        totalOrders: res.data.totalOrders,
        totalRevenue: res.data.totalRevenue,
      });

      setSalesHistory(
        res.data.salesHistory || []
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="analytics-page">

      <h1>
        📊 Sales Analytics
      </h1>

      <div className="analytics-cards">

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{data.totalUsers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Products</h3>
          <p>{data.totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{data.totalOrders}</p>
        </div>

        <div className="dashboard-card">
          <h3>Revenue</h3>
          <p>
            ₹
            {data.totalRevenue.toLocaleString()}
          </p>
        </div>

      </div>

      <div className="chart-container">

        <h2>
          Revenue History
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >
          <LineChart
            data={salesHistory}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="_id" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AdminAnalytics;