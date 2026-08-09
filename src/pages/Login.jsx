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
    <div className="auth-page">

      <div className="auth-container">

        {/* Left Branding */}

        <div className="auth-brand">

          <div className="auth-logo">
            <span>NEXA</span>STORE
          </div>

          <h2>
            Shop smarter.
            <br />
            Live better.
          </h2>

          <p>
            Discover quality products, great prices
            and a simple shopping experience with
            NexaStore.
          </p>

          <div className="auth-benefits">

            <div>
              <span>🛍️</span>
              <p>
                Wide range of products
              </p>
            </div>

            <div>
              <span>🔒</span>
              <p>
                Secure shopping
              </p>
            </div>

            <div>
              <span>🚚</span>
              <p>
                Fast delivery
              </p>
            </div>

          </div>

        </div>


        {/* Login Card */}

        <div className="login-card">

          <div className="login-heading">

            <span className="login-tag">
              WELCOME BACK
            </span>

            <h1>
              Login
            </h1>

            <p>
              Login to continue shopping with NexaStore.
            </p>

          </div>


          {/* Email */}

          <div className="login-field">

            <label>
              Email Address
            </label>

            <div className="login-input-wrapper">

              <span>
                ✉
              </span>

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

          <div className="login-field">

            <label>
              Password
            </label>

            <div className="login-input-wrapper">

              <span>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
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


          {/* Login Button */}

          <button
            className="login-submit"
            onClick={handleLogin}
          >
            Login
            <span>→</span>
          </button>


          {/* Admin */}

          <button
            className="admin-login-link"
            onClick={() =>
              navigate("/admin-login")
            }
          >
            Admin Login
          </button>


          {/* Register */}

          <div className="login-register">

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

          <div className="login-security">

            <span>
              🔒
            </span>

            <div>
              <strong>
                Secure Login
              </strong>

              <p>
                Your account information is protected.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;