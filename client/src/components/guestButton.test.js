import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import GuestButton from "./guestButton";
import "@testing-library/jest-dom/extend-expect"; // Import the matcher

test("renders BookList when GuestButton is clicked", async () => {
  render(<GuestButton onGuestClick={() => {}} />);

  const bookButton = screen.getByTestId("book-btn");
  bookButton.click();

  // Wait for the BookList component to be rendered
  await waitFor(() => {
    const bookList = screen.getByText("Book List");
    expect(bookList).toBeInTheDocument();
  });

  // Additional assertions for BookList if needed
});