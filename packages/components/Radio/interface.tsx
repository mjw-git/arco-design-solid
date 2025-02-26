import { JSX, ParentComponent } from "solid-js";
import { OptionType } from "../CheckBox/interface";
export type RadioValueType = string | number;
export type RadioGroupValueType = string | number;
export type RadioProps = ParentComponent<{
  value?: RadioValueType;
  checked?: boolean;
  disabled?: boolean;
  onChange?: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"];
}> & {
  Group: RadioGroupProps;
};
export type RadioGroupProps = ParentComponent<{
  value?: RadioGroupValueType;
  onChange?: (value: RadioGroupValueType) => void;
  options?: OptionType;
}>;
