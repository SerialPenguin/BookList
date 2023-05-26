// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import BookItem from "./bookItem";

// test("should update quantity when input value changes", () => {
//   // Arrange
//   const book = {
//     title: "Book Title",
//     author: "Book Author",
//     quantity: 10
//   };

//   // Render the component
//   render(<BookItem book={book} onAddToCart={() => {}} loggedIn={true} />);

//   // Get the input element
//   const quantityInput = screen.getByDisplayValue("0");

//   // Act
//   fireEvent.change(quantityInput, { target: { value: "5" } });

//   // Assert
//   expect(quantityInput.value).toBe("5");
// });
