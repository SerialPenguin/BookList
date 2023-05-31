import React from "react";
import { useNavigate } from "react-router-dom";
import ("../stylesheet/pages/_UsersView.scss")


//Navigated the user back to /admin/books but also removes the version number saved in sessionStorage. It also looks for a username.
const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    sessionStorage.removeItem("version");
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      navigate("/admin/books", { state: { username: storedUsername } });
    } else {
      navigate("/admin/books");
    }
  };

  return (
    <button className="userBack-btn" onClick={handleBack}>Back</button>
  );
};

export default BackButton;