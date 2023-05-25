import React, { useState } from "react";
import LoginForm from "./components/loginForm";
import BookList from "./components/bookList";
import GuestButton from "./components/guestButton";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
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
          <LoginForm onLogin={handleLogin} />
          <GuestButton onGuestClick={() => handleLogin("Guest")} />
        </div>
      )}
    </div>
  );
}

export default App;



