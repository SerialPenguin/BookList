import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  it("successfully registers a new account", async () => {
    const mockFetch = jest.spyOn(window, "fetch");
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ accessToken: "fakeAccessToken" }),
    });

    const onRegisterMock = jest.fn();

    render(
      <MemoryRouter>
        <RegisterForm onRegister={onRegisterMock} />
      </MemoryRouter>
    );

    // Fill in the registration form
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password:");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

    // Submit the registration form
    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    // Wait for the fetch request to be made
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Wait for the fetch request parameters to match
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "testuser", password: "password123" }),
      });
    });

    // Wait for the onRegister function to be called
    await waitFor(() => {
      expect(onRegisterMock).toHaveBeenCalledTimes(1);
    });

    // Wait for the onRegister function parameters to match
    await waitFor(() => {
      expect(onRegisterMock).toHaveBeenCalledWith("testuser");
    });

    // Wait for the sessionStorage to be updated
    await waitFor(() => {
      expect(sessionStorage.getItem("Token")).toEqual("fakeAccessToken");
    });

    // Restore the original fetch function
    mockFetch.mockRestore();
  });
});