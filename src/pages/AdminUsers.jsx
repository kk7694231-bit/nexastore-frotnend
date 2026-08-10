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
      console.log(error);
      setUsers([]);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main className="users-page">
        <h1>Manage Users</h1>

        <div className="users-grid">
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="user-card"
              >
                <h3>{user.name}</h3>

                <p>{user.email}</p>

                <span className="role-badge">
                  {user.role}
                </span>

                <div className="user-history">
                  Joined{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            ))
          ) : (
            <h3>No Users Found</h3>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminUsers;