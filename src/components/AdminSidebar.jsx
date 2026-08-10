import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "admin-nav-link active"
      : "admin-nav-link";
  };


  return (

    <aside className="admin-sidebar">

      <div className="admin-sidebar-logo">
        <span>NEXA</span>STORE
      </div>


      <div className="admin-sidebar-label">
        ADMIN PANEL
      </div>


      <nav className="admin-nav">

        <Link
          to="/admin"
          className={isActive("/admin")}
        >
          <span>📊</span>
          Dashboard
        </Link>


        <Link
          to="/admin/products"
          className={isActive("/admin/products")}
        >
          <span>📦</span>
          Products
        </Link>


        <Link
          to="/admin/orders"
          className={isActive("/admin/orders")}
        >
          <span>🛒</span>
          Orders
        </Link>


        <Link
          to="/admin/users"
          className={isActive("/admin/users")}
        >
          <span>👥</span>
          Users
        </Link>


        <Link
          to="/admin/analytics"
          className={isActive("/admin/analytics")}
        >
          <span>📈</span>
          Analytics
        </Link>

      </nav>


      <div className="admin-sidebar-bottom">

        <Link
          to="/"
          className="back-store-link"
        >
          ← Back to Store
        </Link>

      </div>

    </aside>

  );
}

export default AdminSidebar;