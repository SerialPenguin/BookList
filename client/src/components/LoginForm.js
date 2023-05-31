import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheet/pages/_loginForm.scss"

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

//handles username and password received from the form.
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please provide a username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      //checks the role of the person that logs in and navigates to /admin or /books
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("Token", data.accessToken);
        onLogin(username);
        const jwtArray = data.accessToken.split(".");
        const jwtPayload = JSON.parse(atob(jwtArray[1]));
        if (jwtPayload.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/books");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.log("Error logging in:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;