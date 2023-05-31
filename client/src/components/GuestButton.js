import React, { useState } from "react";
import BookList from "./BookList";
import { useNavigate } from "react-router-dom";
import "../stylesheet/pages/_loginForm.scss"

//function that renders the list of book to user without to be logged in.
//recives the prop onGuestClick from App.js
function GuestButton({ onGuestClick }) {
  const [showBookList, setShowBookList] = useState(false);
  const navigate = useNavigate();

  const handleGuestButtonClick = () => {
    setShowBookList(true);
    onGuestClick(); // Call the onGuestClick callback to update the loggedIn state
    navigate("/books");
  };

  return (
    <div>
      <button data-testid="book-btn" className="guest-button" onClick={handleGuestButtonClick}>Guest</button>
      {showBookList && <BookList />}
    </div>
  );
}

export default GuestButton;