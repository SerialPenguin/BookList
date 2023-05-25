import React, { useState } from "react";
import BookList from "./bookList";
import Cart from "./cart";

function LibraryPage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    const updatedCartItems = [...cartItems, book];
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h1>Library Page</h1>
      <BookList addToCart={addToCart} />
      <Cart cartItems={cartItems} />
    </div>
  );
}

export default LibraryPage;