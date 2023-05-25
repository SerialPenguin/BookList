import React, { useEffect, useState } from "react";
import BookItem from "./bookItem";

function BookList({ loggedIn }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/library/books");
      const data = await response.json();
      console.log("Received data:", data);

      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        console.warn("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleAddToCart = (book, quantity) => {
    console.log(`Added ${quantity} ${book.title}(s) to the cart`);
  
    const updatedBooks = books.map((item) => {
      if (item.id === book.id) {
        return {
          ...item,
          quantity: Math.max(item.quantity - quantity, 0),
        };
      }
      return item;
    });
  
    setBooks(updatedBooks);
  };
  

  return (
    <div>
      <h2>Book List</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onAddToCart={handleAddToCart}
            loggedIn={loggedIn}
          />
        ))
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
}

export default BookList;