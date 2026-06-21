import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://nexastore-backend-l4s3.vercel.app/api/auth/login",
        {
          email,
          password
        }
      );

      if (res.data.role !== "admin") {
        alert("You are not an admin");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Admin Login Successful");
      navigate("/admin");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  const handleAdminSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://nexastore-backend-l4s3.vercel.app/api/auth/admin/register",
        {
          name,
          email,
          password
        }
      );

      alert(res.data.message);

      setIsSignup(false);

    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div>
      <h1>
        {isSignup ? "Admin Signup" : "Admin Login"}
      </h1>

      <form
        onSubmit={
          isSignup
            ? handleAdminSignup
            : handleAdminLogin
        }
      >
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
            <br /><br />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          {isSignup
            ? "Signup"
            : "Login"}
        </button>
      </form>

      <br />

      <button
        onClick={() =>
          setIsSignup(!isSignup)
        }
      >
        {isSignup
          ? "Already have an account? Login"
          : "Create Admin Account"}
      </button>
    </div>
  );
}

export default AdminLogin;