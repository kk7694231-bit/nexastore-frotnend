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
        "https://nexastore-backend-rzao.vercel.app/api/auth/login",
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

    <a href="/admin-login">admin login</a>

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