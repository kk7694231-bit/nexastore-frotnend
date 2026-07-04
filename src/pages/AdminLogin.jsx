return (
  <div className="admin-login-container">
    <div className="admin-login-box">
      <h1>Admin Login</h1>

      <form onSubmit={handleAdminLogin}>

        <div className="admin-input-box">
          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="admin-input-box">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="admin-login-btn">
          Login
        </button>

      </form>
    </div>
  </div>
);