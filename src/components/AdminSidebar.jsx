import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>NEXASTORE</h2>

      <ul>
        <li>
          <Link to="/admin">📊 Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/products">📦 Products</Link>
        </li>

        <li>
          <Link to="/admin/orders">🛒 Orders</Link>
        </li>

        <li>
          <Link to="/admin/users">👥 Users</Link>
        </li>

        <li>
          <Link to="/admin/analytics">📈 Analytics</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;