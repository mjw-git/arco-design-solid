import { JSX, ParentComponent } from "solid-js";

type RowProps = ParentComponent<
  { gutter?: number | number[] } & JSX.HTMLAttributes<HTMLDivElement>
>;
type ColProps = ParentComponent<
  { span?: number; offset?: number } & JSX.HTMLAttributes<HTMLDivElement>
>;
export type { RowProps, ColProps };
