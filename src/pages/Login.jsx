import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "role",
        data.role
      );
      localStorage.setItem(
        "userId",
        data.userId
      );
      alert(data.message);

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
   <div className="login-container">
  <div className="login-box">

    <h1>Login</h1>

    <input
      type="email"
      placeholder="Enter Email"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <input
      type="password"
      placeholder="Enter Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button onClick={handleLogin}>
      Login
    </button>

    <p className="register-link">
      New User?
      <a href="/register">
        Create Account
      </a>
    </p>

  </div>
</div>
    );
}

export default Login;