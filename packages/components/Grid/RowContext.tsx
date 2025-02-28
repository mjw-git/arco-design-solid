import { createContext } from 'solid-js';
export interface RowContextProps {
  gutter?: [number, number];
  horizontalGutter?: number;
  verticalGutter?: number;
}
export const RowContext = createContext<RowContextProps>({});
