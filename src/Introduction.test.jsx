import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 
import userEvent from "@testing-library/user-event";
import Introduction from "./Introduction";



// Mock localStorage
beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn((key) => {
    return key === "name" ? "John Doe" : key === "location" ? "New York" : null;
  });
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

describe("Introduction Form", () => {
  it("renders the form with name input first", async () => {
    render(<Introduction />);
    expect(await screen.findByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("updates name input correctly", async () => {
    render(<Introduction />);
    const nameInput = await screen.findByPlaceholderText("Enter your name");
    await userEvent.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");
  });

  it("proceeds to step 2 only when name is entered", async () => {
    render(<Introduction />);
    const proceedButton = await screen.findByText("PROCEED");

    // Initially disabled
    fireEvent.click(proceedButton);
    expect(await screen.findByPlaceholderText("Enter your name")).toBeInTheDocument();

    // Enter name
    const nameInput = await screen.findByPlaceholderText("Enter your name");
    await userEvent.type(nameInput, "John Doe");

    // Click proceed
    fireEvent.click(proceedButton);
    await waitFor(() => expect(screen.getByPlaceholderText("Enter your location")).toBeInTheDocument());
  });

  it("does not proceed if name is empty", async () => {
    render(<Introduction />);
    const proceedButton = await screen.findByText("PROCEED");
    fireEvent.click(proceedButton);
    expect(await screen.findByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("back button appears on step 2", async () => {
    render(<Introduction />);
    const nameInput = await screen.findByPlaceholderText("Enter your name");
    await userEvent.type(nameInput, "John Doe");

    const proceedButton = await screen.findByText("PROCEED");
    fireEvent.click(proceedButton);

    await waitFor(() => expect(screen.findByText("BACK")).toBeInTheDocument());
  });

  it("submits form successfully", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Success" }),
      })
    ) 

    render(<Introduction />);
    const nameInput = await screen.findByPlaceholderText("Enter your name");
    await userEvent.type(nameInput, "John Doe");

    fireEvent.click(await screen.findByText("PROCEED"));

    const locationInput = await screen.findByPlaceholderText("Enter your location");
    await userEvent.type(locationInput, "New York");

    fireEvent.click(await screen.findByText("START ANALYSIS"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "https://wk7wmfz7x8.execute-api.us-east-2.amazonaws.com/live/FES_Virtual_Internship_1/level2",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ name: "John Doe", location: "New York" }),
        })
      )
    );
  });

  it("displays error if API call fails", async () => {
    global.fetch = jest.fn(() => Promise.reject("API Error"));

    render(<Introduction />);
    const nameInput = await screen.findByPlaceholderText("Enter your name");
    await userEvent.type(nameInput, "John Doe");

    fireEvent.click(await screen.findByText("PROCEED"));

    const locationInput = await screen.findByPlaceholderText("Enter your location");
    await userEvent.type(locationInput, "New York");

    fireEvent.click(await screen.findByText("START ANALYSIS"));

    await waitFor(() =>
      expect(screen.findByText("Error submitting data. Please try again.")).toBeInTheDocument()
    );
  });
});
