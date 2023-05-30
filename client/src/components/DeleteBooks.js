import { buildFetchOptions } from "../util";

export default function DeleteBook({ book }) {
  const handleDelete = async () => {
    try {
      const options = buildFetchOptions({ title: book.title }, "DELETE");
      const response = await fetch("http://localhost:3000/admin/books", options);
      const data = await response.json();
      console.log("Delete Book response:", data);

      if (response.ok) {
        // Boken har tagits bort, utför lämpliga åtgärder
        console.log("Book deleted successfully");
        // Uppdatera boklistan om det behövs
      } else {
        console.warn("Error deleting book:", data);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
 
  return <button id="delete-btn" onClick={handleDelete}>Delete</button>;
}