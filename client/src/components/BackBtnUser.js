import React from "react";
import { useNavigate } from "react-router-dom";

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
    <button onClick={handleBack}>Back</button>
  );
};

export default BackButton;