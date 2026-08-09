import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://nexastore-backend-rzao.vercel.app/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="simple-register-page">

      <div className="simple-register-card">

        {/* Logo */}

        <div className="simple-register-logo">
          <span>NEXA</span>STORE
        </div>


        {/* Heading */}

        <div className="simple-register-heading">

          <span>JOIN NEXASTORE</span>

          <h1>Create Account</h1>

          <p>
            Create your account and start shopping
            with NexaStore.
          </p>

        </div>


        <form onSubmit={handleRegister}>

          {/* Full Name */}

          <div className="simple-register-field">

            <label>Full Name</label>

            <div className="simple-register-input">

              <span>👤</span>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

          </div>


          {/* Email */}

          <div className="simple-register-field">

            <label>Email Address</label>

            <div className="simple-register-input">

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

          <div className="simple-register-field">

            <label>Password</label>

            <div className="simple-register-input">

              <span>🔒</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="register-show-password"
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


          {/* Create Account */}

          <button
            type="submit"
            className="create-account-button"
          >
            Create Account
            <span>→</span>
          </button>

        </form>


        {/* Login */}

        <div className="already-account">

          <span>
            Already have an account?
          </span>

          <button
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        </div>


        {/* Security */}

        <div className="register-security">

          <span>🔒</span>

          <div>
            <strong>
              Secure Account
            </strong>

            <p>
              Your personal information is protected.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;