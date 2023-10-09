import React from "react";
import "./App.css";
import PasswordValidator from "./components/PasswordValidator/PasswordValidator";
import { Configs } from "./components/PasswordValidator/PasswordValidator.types";

function App() {
  const configs: Configs = [
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
    {
      validation: /^(?:(?![A-Za-z]{2}).)*$/,
      description: "has no consecutive letters",
    },
  ];

  return (
    <form>
      <h1>Password component</h1>
      <PasswordValidator config={configs} />
    </form>
  );
}

export default App;
