import React, { useEffect, useState } from "react";
import BookItem from "./BookItem";
import SearchInput from "./SearchInput";
import { searchValues } from "./SearchInput";
import "../stylesheet/pages/_bookList.scss"


function BookList({ loggedIn, onPurchase }) {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  //logic for short polling
  useEffect(() => {
    sessionStorage.removeItem("version");
    fetchBooks();
    const pollingInterval = setInterval(fetchBooks, 2000); // Poll every 2 seconds

    return () => clearInterval(pollingInterval);
  }, []);
  //fetching version number to see if it has changed
  const fetchBooks = async () => {
    if (searchValues.value.length > 0) 
    return
    try {
      const response = await fetch("http://localhost:3000/library/books");
      const data = await response.json();
      if (sessionStorage.getItem("version") === data.version) {
        return
      }
      sessionStorage.setItem("version" ,data.version)
      // console.log("Received data:", data);

      if (Array.isArray(data.books)) {
        setBooks(data.books);
      } else {
        console.log("Invalid data format:", data);
      }
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };


  const handleBackToAllBooks = () => {
    setSearchResults([]);
    setShowSearchResults(false);
  };


  // Finds the index of the book and creates copies of the book array then prepares and updates the books quantity to the server
  const handleAddToCart = (book, quantity) => {
    console.log(`Added ${quantity} ${book.title}(s) to order`);
  
    const bookIndex = books.findIndex(
      (item) => item.title === book.title && item.author === book.author
    );
  
    if (bookIndex !== -1) {
      const updatedBooks = [...books];
      const updatedBook = { ...updatedBooks[bookIndex] };
      updatedBook.quantity = Math.max(updatedBook.quantity - quantity, 0);
      updatedBooks[bookIndex] = updatedBook;
  
      setBooks(updatedBooks);
  
      // Find the book in the JSON data
      const bookData = books.find(
        (data) => data.title === book.title && data.author === book.author
      );
  
      if (bookData) {
        // Sends a request to save the number of books ordered
        fetch("http://localhost:3000/library/user/books", {
          method: "POST",
          headers: {
            authorization: sessionStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: bookData.title, 
            quantity: quantity,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to save the number of books ordered.");
            }
          })
          .catch((error) => {
            console.log("Error saving the number of books ordered:", error);
          });
      }
    }
  };

  return (
    <div className="book-container">
      <h2>Book List</h2>
      {showSearchResults ? (
        <div>
          <button onClick={handleBackToAllBooks}>Back to All Books</button>
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <BookItem
                key={book.title + "book"}
                book={book}
                onAddToCart={handleAddToCart}
                loggedIn={loggedIn}
                onPurchase={onPurchase}
              />
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      ) : (
        <div>
          <SearchInput onSearch={setBooks} />
          {books.length > 0 ? (
            books.map((book) => (
              <BookItem
                key={book.title + "book"}
                book={book}
                onAddToCart={handleAddToCart}
                loggedIn={loggedIn}
                onPurchase={onPurchase}
              />
            ))
          ) : (
            <p>Loading books...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookList;
