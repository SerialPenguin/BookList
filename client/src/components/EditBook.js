import React, { useState } from "react";
import { buildFetchOptions } from "../util";

export default function EditBook({ book }) {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);

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

      const options = buildFetchOptions(updatedBook, "PUT");
      const response = await fetch("http://localhost:3000/admin/books", options);
      const data = await response.json();
      console.log("Update Book response:", data);

      if (response.ok) {
        // Book details updated successfully
        console.log("Book details updated successfully");
      } else {
        console.warn("Error updating book:", data);
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };
 
  return (
    <div>
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
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}