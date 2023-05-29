import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import DeleteBook from "./DeleteBooks";

describe("DeleteBook", () => {
  beforeEach(() => {
    jest.spyOn(window, "fetch").mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ success: true }),
    });
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it("removes a book when delete button is clicked", async () => {
    // Mock the book data
    const book = {
      title: "Book Title",
      author: "Book Author",
      quantity: 10,
    };

    // Render the component
    render(<DeleteBook book={book} />);

    // Click the Delete button
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Wait for the delete operation to complete
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledTimes(1);
    });

    // Check if the book was deleted successfully
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/admin/books",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: sessionStorage.getItem("Token")
        },
        body: JSON.stringify({ title: book.title }),
      }
    );
  });
});