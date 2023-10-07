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

  const onSubmit = (password: string) => {
    console.log(password);
  };

  return (
    <form>
      <h1>Sign Up</h1>
      <input placeholder="email" type="email" />
      <PasswordValidator config={configs} onSubmit={onSubmit} />
    </form>
  );
}

export default App;
