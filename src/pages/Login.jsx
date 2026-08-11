import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://nexastore-backend-rzao.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      alert(data.message || "Login Successful");

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="simple-login-page">

      <div className="simple-login-card">

        {/* Logo */}

        <div className="simple-login-logo">
          <span>NEXA</span>STORE
        </div>


        {/* Heading */}

        <div className="simple-login-heading">

          <span>WELCOME BACK</span>

          <h1>Login</h1>

          <p>
            Login to continue shopping with NexaStore.
          </p>

        </div>


        {/* Email */}

        <div className="simple-login-field">

          <label>Email Address</label>

          <div className="simple-input">

            <span>✉</span>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>


        {/* Password */}

<div className="simple-login-field">

  <label>Password</label>

  <div className="simple-input password-input">

    <span className="password-icon">🔒</span>

    <input
      className="password-field"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
      className="show-password"
      onClick={() =>
        setShowPassword(!showPassword)
      }
    >
      {showPassword ? "Hide" : "Show"}
    </button>

  </div>

</div>


        {/* Login */}

        <button
          className="simple-login-button"
          onClick={handleLogin}
        >
          Login
          <span>→</span>
        </button>


        {/* Admin */}

        <button
          className="simple-admin-button"
          onClick={() =>
            navigate("/admin-login")
          }
        >
          Admin Login
        </button>


        {/* Register */}

        <div className="simple-register">

          <span>
            New to NexaStore?
          </span>

          <button
            onClick={() =>
              navigate("/register")
            }
          >
            Create Account
          </button>

        </div>


        {/* Security */}

        <div className="simple-security">

          <span>🔒</span>

          <div>
            <strong>Secure Login</strong>

            <p>
              Your account information is protected.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;