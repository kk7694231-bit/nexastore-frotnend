import { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const API_URL = "https://nexastore-backend-rzao.vercel.app";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Users API Response:", res.data);

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.log("Users Error:", error);

      setUsers([]);
    }
  };

  return (
    <main className="users-page">

      <div className="admin-page-header">
        <div>
          <p className="admin-page-label">
            USER MANAGEMENT
          </p>

          <h1>Manage Users</h1>

          <p className="admin-page-subtitle">
            View registered customers and account details
          </p>
        </div>

        <div className="user-count">
          {users.length} Users
        </div>
      </div>

      <div className="users-grid">

        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="user-card"
            >

              <div className="user-card-top">

                <div className="user-avatar">
                  {user.name
                    ? user.name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}
                </div>

                <span className="role-badge">
                  {user.role || "user"}
                </span>

              </div>

              <h3>
                {user.name || "Unknown User"}
              </h3>

              <p className="user-email">
                {user.email}
              </p>

              <div className="user-history">
                <span>📅</span>

                Joined{" "}

                {user.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </div>

            </div>
          ))
        ) : (
          <div className="empty-users">

            <div className="empty-users-icon">
              👥
            </div>

            <h2>No Users Found</h2>

            <p>
              Registered users will appear here.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}

export default AdminUsers;