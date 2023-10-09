import React from "react";
import { render } from "@testing-library/react";
import useValidation, {
  ValidationConfig,
  ValidationCallback,
} from "./useValidation";

// Mock the ValidationCallback
const mockCallback: ValidationCallback = jest.fn();

// Helper function to render a test component using the hook
const renderTestComponent = (pass: string, cfg: ValidationConfig[]) => {
  const TestComponent: React.FC = () => {
    useValidation(pass, cfg, mockCallback);
    return null;
  };
  render(<TestComponent />);
};

describe("useValidation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the callback with correct validations for valid input", async () => {
    const validPassword = "validPassword1";

    renderTestComponent(validPassword, validationConfig);

    expect(mockCallback).toHaveBeenCalledWith([
      { isValid: true, description: "has at least one uppercase letter" },
      { isValid: true, description: "At least 8 characters" },
    ]);
  });

  it("should call the callback with correct validations for invalid input", async () => {
    const invalidPassword = "short";

    renderTestComponent(invalidPassword, validationConfig);

    expect(mockCallback).toHaveBeenCalledWith([
      { isValid: false, description: "has at least one uppercase letter" },
      { isValid: false, description: "At least 8 characters" },
    ]);
  });
});

const validationConfig: ValidationConfig[] = [
  {
    validation: /[A-Z]/,
    description: "has at least one uppercase letter",
  },
  {
    validation: (pass: string) => pass.length >= 8,
    description: "At least 8 characters",
  },
];
