export type Config = {
  validation: RegExp | ((value: string) => boolean);
  description: string;
};

export type Configs = Config[];

export interface PasswordValidatorProps {
  config: Array<Config>;
}
