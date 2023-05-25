import React, { useState } from "react";
import BookList from "./bookList";

function GuestButton({ onGuestClick }) {
  const [showBookList, setShowBookList] = useState(false);

  const handleGuestButtonClick = () => {
    setShowBookList(true);
    onGuestClick(); // Call the onGuestClick callback to update the loggedIn state
  };

  return (
    <div>
      <button data-testid="book-btn" onClick={handleGuestButtonClick}>Guest</button>
      {showBookList && <BookList />}
    </div>
  );
}

export default GuestButton;