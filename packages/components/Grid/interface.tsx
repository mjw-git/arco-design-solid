import { JSX } from 'solid-js';

type RowProps = {
  align?: JSX.CSSProperties['align-items'];
  class?: string;
  style?: JSX.CSSProperties;
  justify?: JSX.CSSProperties['justify-content'];
};
type ColProps = {
  style?: JSX.CSSProperties;
  offset?: number;
  span?: number;
  class?: string;
};

export type { RowProps, ColProps };
