import React from "react";
import { useNavigate } from "react-router-dom";
import ("../stylesheet/pages/_UsersView.scss")

const BackButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
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