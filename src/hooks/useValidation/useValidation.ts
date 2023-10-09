export type Validation = {
  isValid: boolean;
  description: string;
};

export type ValidationCallback = React.Dispatch<
  React.SetStateAction<Validation[] | []>
>;

export type ValidationConfig = {
  validation: RegExp | ((pass: string) => boolean);
  description: string;
};

const useValidation = (
  pass: string,
  cfg: ValidationConfig[],
  callback: ValidationCallback
): void => {
  const validations: Validation[] = cfg.map(({ validation, description }) => {
    const isValid =
      validation instanceof RegExp ? validation.test(pass) : validation(pass);
    return { isValid, description };
  });
  callback(validations);
};

export default useValidation;
