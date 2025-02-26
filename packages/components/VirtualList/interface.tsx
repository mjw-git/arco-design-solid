import { JSX } from 'solid-js';

export type RenderFunc<T> = (item: T, index: number) => JSX.Element;
export type VirtualListProps<T> = {
  height: number;
  data: T[];
  children: RenderFunc<T>;
  itemHeight: number;
} & Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'>;
