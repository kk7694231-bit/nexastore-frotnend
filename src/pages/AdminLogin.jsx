import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://nexastore-backend-rzao.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      if (data.role !== "admin") {
        alert("You are not an admin");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      alert("Admin Login Successful");

      navigate("/admin");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="simple-admin-page">

      <div className="simple-admin-card">

        {/* Logo */}

        <div className="simple-admin-logo">
          <span>NEXA</span>STORE
        </div>


        {/* Heading */}

        <div className="simple-admin-heading">

          <span>ADMIN PORTAL</span>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage your NexaStore store.
          </p>

        </div>


        {/* Form */}

        <form onSubmit={handleAdminLogin}>

          {/* Email */}

          <div className="simple-admin-field">

            <label>
              Admin Email
            </label>

            <div className="simple-admin-input">

              <span>✉</span>

              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>


          {/* Password */}

          <div className="simple-admin-field">

            <label>
              Admin Password
            </label>

            <div className="simple-admin-input">

              <span>🔒</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter admin password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="admin-show-password"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* Login */}

          <button
            type="submit"
            className="simple-admin-login-btn"
          >
            Login
            <span>→</span>
          </button>

        </form>


        {/* Back to customer login */}

        <button
          className="back-to-login"
          onClick={() =>
            navigate("/login")
          }
        >
          ← Back to Customer Login
        </button>


        {/* Security */}

        <div className="admin-security">

          <span>🛡️</span>

          <div>
            <strong>
              Secure Admin Access
            </strong>

            <p>
              Authorized administrators only.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminLogin;