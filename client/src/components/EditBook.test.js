import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditBook from "./EditBook";

test("should update the title of the book", () => {
  // Sets the variables needed
  const initialTitle = "Initial Title";
  const newTitle = "New Title";
  const initialAuthor = "Initial Author";
  const newAuthor = "New Author";
  const initialQuantity = 25;
  const newQuantity = 50;
  const book = {
    title: initialTitle,
    author: initialAuthor,
    quantity: initialQuantity,
  };

  // Changes the title
  render(<EditBook book={book} />);
  const titleInput = screen.getByPlaceholderText("New Title");
  const authorInput = screen.getByPlaceholderText("New Author");
  const quantityInput = screen.getByPlaceholderText("New Quantity"); // Update this line
  fireEvent.change(titleInput, { target: { value: newTitle } });
  fireEvent.change(authorInput, { target: { value: newAuthor } });
  fireEvent.change(quantityInput, { target: { value: newQuantity } });
  fireEvent.click(screen.getByText("Update"));

  // Checks that the title has been changed
  expect(titleInput.value).toBe(newTitle);
  expect(authorInput.value).toBe(newAuthor);
  expect(quantityInput.value).toBe(newQuantity.toString());
});