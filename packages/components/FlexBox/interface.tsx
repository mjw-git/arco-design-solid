import { JSX, ParentComponent } from "solid-js";

interface FlexBoxSelfProps {
  gap?: number;
  wrap?: JSX.CSSProperties['flex-wrap'];
  direction?: JSX.CSSProperties["flex-direction"];
  align?: JSX.CSSProperties["align-items"];
  justify?: JSX.CSSProperties["justify-content"];
  split?: JSX.Element;
}
export type FlexBoxProps = ParentComponent<
  JSX.IntrinsicElements["div"] & FlexBoxSelfProps
>;
