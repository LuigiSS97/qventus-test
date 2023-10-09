import React from "react";
import PasswordValidator from "./PasswordValidator.tsx";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-icons/pi", () => {
  return {
    PiCheckFatFill: jest.fn(() => <span>MockIcon</span>),
  };
});

describe("PasswordValidator Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders the component without errors", () => {
    render(<PasswordValidator config={config} />);

    const validatorElement = screen.getByTestId("validator");

    expect(validatorElement).toBeInTheDocument();
  });

  it("updates the input value and validates the password", () => {
    render(<PasswordValidator config={config} />);

    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(passwordInput, { target: { value: "test" } });
  });

  it("updates the UI with correct icon which show all the validated conditions", async () => {
    render(<PasswordValidator config={config} />);

    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(passwordInput, { target: { value: "Type@1" } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const validatedConfig = require("react-icons/pi");

    expect(validatedConfig.PiCheckFatFill).toBeCalledTimes(config.length);
  });

  it("updates the UI with correct icon when the conditions are not valid", async () => {
    render(<PasswordValidator config={config} />);

    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(passwordInput, { target: { value: "a" } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    const validatedConfig = require("react-icons/pi");

    expect(validatedConfig.PiCheckFatFill).not.toBeCalled();
  });
});

const config = [
  {
    validation: /[!@#$%^&*]+/,
    description: "Has one or more special characters",
  },
  {
    validation: /\d/,
    description: "has one or more numbers/digits",
  },
  {
    validation: /[A-Z]/,
    description: "has at least pne uppercase letter",
  },
];
