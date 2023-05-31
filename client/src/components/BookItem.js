import React, { useState } from "react";
import DeleteBook from "./DeleteBooks";
import EditBook from "./EditBook";
import "../stylesheet/pages/_AdminView.scss"


//recives props (books, onAddToCart) from BookList.

function BookItem({ book, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const addToCart = () => {
    if (quantity > 0) {
      onAddToCart(book, quantity);
      setQuantity(0);
    }
  };
  //handles quantity and saves it in state.
  const handleQuantityChange = (event) => {
    // console.log(event.target.value);
    const input = event.target.value;
    const value = input === "0" ? "" : parseInt(input);
    setQuantity(value >= 0 ? value.toString(): 0); 
  };

  const token = sessionStorage.getItem("Token");
  const loggedIn = !!token; // Check if the token exists

  // Splits the payload and checks if the token role is Admin
  let isLoggedInAsAdmin;
  try {const payLoad = JSON.parse(atob(token.split(".")[1]))
  isLoggedInAsAdmin = payLoad.role === "ADMIN";} 
  catch {isLoggedInAsAdmin = false}
  

  return (
    <div className="render-header" key={book.title}>
      <h3>Title: {book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Quantity: {book.quantity}</p>
      {loggedIn && (
        <div>
          
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button id="amount-btn-minus" onClick={() => setQuantity(Math.max(quantity - 1, 0))}>-</button>
          <button id="amount-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
          <button id="order-btn" onClick={addToCart}>Order</button>
          {isLoggedInAsAdmin && (
        <div className="admin-action">
          <EditBook book={book}  />
          <DeleteBook book={book} />
        </div>
      )}
        </div>
      )}
    </div>
  );
}

export default BookItem;