import { buildFetchOptions } from "../util";


//Sends a DELETE request to the server based on the books title while using a helper function to verify role
export default function DeleteBook({ book }) {
  const handleDelete = async () => {
    try {
      const options = buildFetchOptions({ title: book.title }, "DELETE");
      const response = await fetch("http://localhost:3000/admin/books", options);
      const data = await response.json();
      console.log("Delete Book response:", data);

      if (response.ok) {
        // The book has been removed, take necessary actions
        console.log("Book deleted successfully");
        // Update the booklist if needed
      } else {
        console.log("Error deleting book:", data);
      }
    } catch (error) {
      console.log("Error deleting book:", error);
    }
  };
 
  return <button id="delete-btn" onClick={handleDelete}>Delete</button>;
}