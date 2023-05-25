import React from "react";
import BookList from "./bookList";
import Cart from "./cart";

function ParentComponent() {
  const handleAddToCart = (book) => {
    console.log("Adding to cart:", book);
    // Add your cart logic here
  };

  return (
    <div>
      <h1>My App</h1>
      <BookList addToCart={handleAddToCart} />
      <Cart />
    </div>
  );
}

export default ParentComponent;