import React, { useState } from "react";
import { buildFetchOptions } from "../util";
import "../stylesheet/pages/_AdminView.scss"


//logic to update a book, change title, author and quantity using states
export default function EditBook({ book }) {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const handleUpdate = async () => {
    try {
      const updatedBook = {
        previous: {
          title: book.title,
          author: book.author,
          quantity: book.quantity,
        },
        current: {
          title: newTitle,
          author: newAuthor,
          quantity: newQuantity,
        },
      };
      //PUT req to the server with the updated book version
      const options = buildFetchOptions(updatedBook, "PUT");
      const response = await fetch("http://localhost:3000/admin/books", options);
      const data = await response.json();
      console.log("Update Book response:", data);

      if (response.ok) {
        // Book details updated successfully
        console.log("Book details updated successfully");
      } else {
        console.log("Error updating book:", data);
      }
    } catch (error) {
      console.log("Error updating book:", error);
    }
  };
 
  return (
    <>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New Title"
      />
      <input
        type="text"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
        placeholder="New Author"
      />
      <input
        type="number"
        value={newQuantity}
        onChange={(e) => setNewQuantity(e.target.value)}
        placeholder="New Quantity"
      />
      <button id="update-btn" onClick={handleUpdate}>Update</button>
    </>
  );
}