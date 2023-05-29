import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BookList from "./components/bookList";
import GuestButton from "./components/GuestButton";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogOutBtn from "./components/LogOut";
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
            <div>
              <h2>Welcome, {localStorage.getItem("username")}!</h2>
              <LogOutBtn setUsername={setUsername} setLoggedIn={setLoggedIn} />
              <BookList loggedIn={loggedIn} />
            </div>
          }
        />
        <Route
          path="/admin"
          element={<AdminBooks username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />} // Pass the username as a prop
        />
        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/books" element={<AdminBooks/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;





  //     return (
  //   <div>
  //     {loggedIn ? (
  //       <div>
  //         <h2>Welcome, {username}!</h2>
  //         <button onClick={handleLogout}>Logout</button>
  //         <BookList loggedIn={loggedIn} />
  //       </div>
  //     ) : (
  //       <div>
  //         {showRegisterForm ? (
  //           <RegisterForm onRegister={handleRegister} />
  //         ) : (
  //           <div>
  //             <LoginForm onLogin={handleLogin} />
  //             <GuestButton onGuestClick={() => handleLogin("Guest")} />
  //             <button onClick={handleRegisterClick}>Register</button>
  //           </div>
  //         )}
  //       </div>
  //     )}
  //   </div>
  // );
// }




// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginForm from "./components/loginForm";
// import BookList from "./components/bookList";
// import GuestButton from "./components/guestButton";
// import RegisterForm from "./components/registerForm";

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [showRegisterForm, setShowRegisterForm] = useState(false);

//   const handleLogin = (username) => {
//     setLoggedIn(true);
//     setUsername(username);
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     setUsername("");
//     sessionStorage.removeItem("Token");
//   };

//   const handleRegisterClick = () => {
//     setShowRegisterForm(true);
//   };

//   const handleRegister = (username) => {
//     setShowRegisterForm(false);
//     handleLogin(username);
//   };

//   return (
//     <Router>
//       <div>
//         {loggedIn ? (
//           <div>
//             <h2>Welcome, {username}!</h2>
//             <button onClick={handleLogout}>Logout</button>
//             <Routes>
//               <Route path="/" element={<BookList />} />
//               <Route path="/admin/*" element={<AdminRoutes />} />
//             </Routes>
//           </div>
//         ) : (
//           <div>
//             {showRegisterForm ? (
//               <RegisterForm onRegister={handleRegister} />
//             ) : (
//               <div>
//                 <Routes>
//                   <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      
//                   <Route path="/books" element={<GuestButton onGuestClick={() => handleLogin("Guest")} />} />
                  
//                 </Routes>
//                 <button onClick={handleRegisterClick}>Register</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// function AdminRoutes() {
//   return (
//     <Routes>
//       {/* Place your admin routes here */}
//       <Route path="/users" element={<UserManagement />} />
//       <Route path="/books" element={<BookManagement />} />
//     </Routes>
//   );
// }

// function UserManagement() {
//   return <h2>User Management</h2>;
// }

// function BookManagement() {
//   return <h2>Book Management</h2>;
// }

// export default App;