import { JSX } from "solid-js";
export type EmptyProps = {
  image?: JSX.Element;
  description?: JSX.Element;
  size?: "normal" | "small";
  imageWrapperStyle?:JSX.CSSProperties
};
