import React, { useState } from "react";


function SearchInput({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };


  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      
    </div>
  );
}

export default SearchInput;


// import React, { useState } from "react";

// function SearchInput({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/library/books`);
//       const data = await response.json();
//       const filteredBooks = data.filter((book) =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       onSearch(filteredBooks);
//     } catch (error) {
//       console.error("Error searching books:", error);
//     }
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
