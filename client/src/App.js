import React, { useState } from "react";
import LoginForm from "./components/loginForm";
import BookList from "./components/bookList";
import GuestButton from "./components/guestButton";
import RegisterForm from "./components/registerForm";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleRegister = (username) => {
    setShowRegisterForm(false);
    handleLogin(username);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <BookList loggedIn={loggedIn} />
        </div>
      ) : (
        <div>
          {showRegisterForm ? (
            <RegisterForm onRegister={handleRegister} />
          ) : (
            <div>
              <LoginForm onLogin={handleLogin} />
              <GuestButton onGuestClick={() => handleLogin("Guest")} />
              <button onClick={handleRegisterClick}>Register</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;