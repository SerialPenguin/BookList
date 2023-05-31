import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheet/pages/_loginForm.scss"


//handles logic to registrate a new user with username and password
//prop from App.js
//error handles in state
function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    //post req to the server
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

//saves Token if response is ok.
  if (response.ok) {
    const data = await response.json();
    sessionStorage.setItem("Token", data.accessToken);
    onRegister(username);

    // Display success message for 2 seconds before redirecting
    const successMessage = "Account Successfully Created";
    setError(successMessage);
    setTimeout(() => {
      setError("");
      navigate("/");
    }, 2000);
  } else {
    setError("Registration failed");
  }
} catch (error) {
  console.log("Error registering:", error);
  setError("An error occurred while registering");
}
};

  return (
    <div className="login-container">
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleRegisterFormSubmit}>
        <div>
          <label htmlFor="registerUsername">Username:</label>
          <input
            type="text"
            id="registerUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="registerPassword">Password:</label>
          <input
            type="password"
            id="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;