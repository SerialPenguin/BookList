import React, { useState } from "react";
//searchValues gets a value from searchTerm and export that value to Booklist
export const searchValues = { value: ""}

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm === "")
    {sessionStorage.removeItem("version"); return}
    try {
      //GET req to /books/search/:query to filter through all the books in server.
      const response = await fetch(`http://localhost:3000/library/books/search/${searchTerm}`);
      const data = await response.json();
      const filteredBooks = data.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearch(filteredBooks);
    } catch (error) {
      console.log("Error searching books:", error);
    }
  };

  return (
    <div>
      <input
        className="search-input-field"
        type="text"
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value); searchValues.value = e.target.value}}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchInput;