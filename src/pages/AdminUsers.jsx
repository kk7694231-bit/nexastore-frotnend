import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:5000/api/admin/users",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users-page">

  <h1>Manage Users</h1>

  <div className="users-grid">

    {users.map((user) => (

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

          Joined:
          {" "}
          {new Date(
            user.createdAt
          ).toLocaleDateString()}

        </div>

      </div>

    ))}

  </div>

</div>
  );
}

export default AdminUsers;