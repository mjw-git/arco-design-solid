import { JSX, ParentComponent } from "solid-js";
export type CustomCheckBoxProps = {
  value?: CheckBoxValueType;
  checked?: boolean;
  onChange?: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"];
  indeterminate?: boolean;
  disabled?: boolean;
};
export type CheckBoxValueType = string | number;
export type CheckBoxGroupValueType = (string | number)[];
export type CheckBoxProps = ParentComponent<CustomCheckBoxProps> & {
  Group: CheckBoxGroupProps;
};
export type OptionType =
  | { label: JSX.Element; value: string | number; disabled?: boolean }[]
  | string[];
export type CheckBoxGroupProps = ParentComponent<{
  value?: CheckBoxGroupValueType;
  onChange?: (value: CheckBoxGroupValueType) => void;
  options?:OptionType
}>;
