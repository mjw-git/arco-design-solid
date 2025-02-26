import { JSX } from "solid-js";
export type SelectOptionType = {
  label: JSX.Element;
  value: string | number;
  disabled?: boolean;
}[];
export type SelectOptionWrapperProps = {
  open?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;
export type SelectProps = {
  options?: SelectOptionType;
  disabled?: boolean;
  showSearch?: boolean;
} & JSX.HTMLAttributes<HTMLDivElement>;
