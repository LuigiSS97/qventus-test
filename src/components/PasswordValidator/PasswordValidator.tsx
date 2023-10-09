import React, { useCallback, useState, memo } from "react";
import { PasswordValidatorProps } from "./PasswordValidator.types";
import { PiCheckFatFill } from "react-icons/pi";
import styles from "./PasswordValidator.module.scss";
import useThrottle from "../../hooks/useThrottle/useThrottle";
import useValidation from "../../hooks/useValidation/useValidation";

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

export default memo(PasswordValidator);
