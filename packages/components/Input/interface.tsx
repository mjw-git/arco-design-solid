import { JSX, ParentComponent } from "solid-js";
interface InputProps {
  defaultValue?: string;
  value?: string;
  prefixIcon?: JSX.Element;
  allowClear?: boolean;
  suffixIcon?: JSX.Element;
  showCount?: boolean;
  onEnterPress?: (value: string) => void;
  clearAll?: () => void;
}
export type TextAreaProps = ParentComponent<
  JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    showCount?: boolean;
    defaultValue?: string;
  }
>;
export type PasswordInputProps = ParentComponent<
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "value"> &
    Omit<InputProps, "type" | "suffixIcon">
>;
export type SearchInputProps = ParentComponent<
  Omit<JSX.InputHTMLAttributes<Omit<HTMLInputElement, "maxLength">>, "value"> &
    Omit<InputProps, "type" | "suffixIcon" | "showCount"> & {
      onSearch?: (value: string) => void;
    }
>;
export type BaseInputProps = ParentComponent<
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "value"> & InputProps
> & {
  Password: PasswordInputProps;
  Search: SearchInputProps;
  TextArea: TextAreaProps;
};
