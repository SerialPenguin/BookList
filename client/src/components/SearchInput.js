// import React, { useState } from "react";


// function SearchInput({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };


//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         placeholder="Search..."
//       />
//       <button onClick={handleSearch}>Search</button>
      
//     </div>
//   );
// }

// export default SearchInput;


import React, { useState } from "react";

export const searchValues = { value: ""}

function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (searchTerm === "")
    return
    try {
      const response = await fetch(`http://localhost:3000/library/books/search/${searchTerm}`);
      const data = await response.json();
      const filteredBooks = data.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      onSearch(filteredBooks);
    } catch (error) {
      console.error("Error searching books:", error);
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
