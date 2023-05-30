import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BookList from "./components/BookList";
import GuestButton from "./components/GuestButton";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogOutBtn from "./components/LogOutBtn";
import RegisterBtn from "./components/Register";
import AdminBooks from "./components/AdminView";
import Users from "./components/Users";



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedIn(true);
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const handleRegister = (username) => {
    handleLogin(username);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    sessionStorage.removeItem("Token"); // Remove token from session storage
    localStorage.removeItem("username");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <div>
              <LoginForm onLogin={handleLogin} />
              <GuestButton onGuestClick={() => handleLogin("Guest")} />
              <RegisterBtn />
            </div>
          }
        />
        <Route
          path="/auth/register"
          element={
            <div>
              <RegisterForm onRegister={handleRegister} />
            </div>
          }
        />
        <Route
          path="/books"
          element={
            <div className="admin-books-container">
              <h2>Welcome, {localStorage.getItem("username")}!</h2>
              <LogOutBtn onLogout={handleLogout} setLoggedIn={setLoggedIn} setUsername={setUsername} />
              <BookList loggedIn={loggedIn} />
            </div>
          }
        />
        <Route
          path="/admin"
          element={<AdminBooks username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />} // Pass the username as a prop
        />
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/books" element={<AdminBooks username={username} setUsername={setUsername} setLoggedIn={setLoggedIn}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

