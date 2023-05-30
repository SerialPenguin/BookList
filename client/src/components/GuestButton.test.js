import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import GuestButton from "./guestButton";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("GuestButton", () => {
  it("navigates to /books when the guest button is clicked", async () => {
    const navigateMock = jest.fn();

    useNavigate.mockReturnValue(navigateMock);

    render(
      <Router>
        <GuestButton onGuestClick={jest.fn()} />
      </Router>
    );

    // Click the Guest button
    const guestButton = screen.getByTestId("book-btn");
    fireEvent.click(guestButton);

    // Wait for navigation to complete
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    // Check the arguments passed to navigateMock
    expect(navigateMock).toHaveBeenCalledWith("/books");
  });
});
