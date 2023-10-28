import React, { useState } from "react";
import "./Login.css"; // Create a CSS file for your styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/proxy-auth", {
        login_id: loginId,
        password: password,
      });

      if (response.status === 200) {
        const receivedToken = response.data.access_token;
        localStorage.setItem("bearerToken", receivedToken);
        console.log(receivedToken);
        setToken(receivedToken);
        navigate("/get");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <div className="login-container">
      <h1>Authentication Example</h1>
      <div className="form-group">
        <label htmlFor="loginId">Login ID:</label>
        <input
          type="text"
          id="loginId"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="login-button" onClick={handleLogin}>
          Authenticate
        </button>
      </div>
      {token && (
        <div className="token-display">
          <h2>Token:</h2>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
