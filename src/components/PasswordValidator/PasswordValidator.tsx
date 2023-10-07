import { memo, useCallback, useMemo, useState } from "react";
import { PasswordValidatorProps } from "./PasswordValidator.types";

function PasswordValidator({ config = [] }: PasswordValidatorProps) {
  const [password, setPassword] = useState("");

  const validations = useMemo(() => {
    const validations = config.map(({ validation, description }) => {
      const isValid =
        validation instanceof RegExp
          ? validation.test(password)
          : validation(password);
      return { isValid, description };
    });
    return validations;
  }, [config, password]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    []
  );

  return (
    <>
      <input
        onChange={handleChange}
        value={password}
        placeholder="password"
        title="Type your password"
        type="password"
      />
      {validations.map(({ isValid, description }) => (
        <p key={description}>
          {isValid ? "✅" : "❌"} {description}
        </p>
      ))}
    </>
  );
}

export default memo(PasswordValidator);
