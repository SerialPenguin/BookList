import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditBook from "./EditBook";

test("should update the title of the book", () => {
  // Arrange
  const initialTitle = "Initial Title";
  const newTitle = "New Title";
  const book = {
    title: initialTitle,
    author: "Author",
    quantity: 1,
  };

  // Act
  render(<EditBook book={book} />);
  const titleInput = screen.getByPlaceholderText("New Title");
  fireEvent.change(titleInput, { target: { value: newTitle } });
  fireEvent.click(screen.getByText("Update"));

  // Assert
  expect(titleInput.value).toBe(newTitle);
});