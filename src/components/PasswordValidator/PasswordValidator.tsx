import React, { useCallback, useState } from "react";
import { PasswordValidatorProps } from "./PasswordValidator.types";
import { PiCheckFatFill } from "react-icons/pi";
import styles from "./PasswordValidator.module.scss";
import { useThrottle } from "../../hooks/useDebounce/useDebounce";
import { useValidation } from "../../hooks/useValidate/useValidate";

const {
  validatorWrapper,
  descriptionWrapper,
  icon,
  iconSuccess,
  descriptionText,
  input,
} = styles;

function PasswordValidator({ config = [] }: PasswordValidatorProps) {
  const [password, setPassword] = useState<string>("");
  const [validation, setValidation] = useState<
    { isValid: boolean; description: string }[] | []
  >([]);

  const handleInputChangeThrottled = useThrottle((value) => {
    useValidation(value, config, setValidation);
  }, 300);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("event.target.value");

      setPassword(event.target.value);

      handleInputChangeThrottled(event.target.value);
    },
    [handleInputChangeThrottled]
  );

  return (
    <div className={validatorWrapper} data-testid="validator">
      <input
        onChange={handleChange}
        value={password}
        className={input}
        placeholder="password"
        title="Type your password"
        type="password"
      />
      <div className={descriptionWrapper}>
        {validation.map(({ isValid, description }) => (
          <p key={description} className={descriptionText}>
            <span
              role="img"
              aria-label="status"
              className={`${icon} ${isValid && iconSuccess}`}
            >
              {isValid ? (
                <PiCheckFatFill
                  style={{
                    fill: "white",
                  }}
                  data-testid="success-icon"
                />
              ) : (
                "X"
              )}
            </span>
            {description}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PasswordValidator;
