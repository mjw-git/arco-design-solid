import { createContext } from "solid-js";
export interface RowContextProps{
    horizontalGutter?: number; verticalGutter?:number
}
export const RowContext = createContext<RowContextProps>(
  {}
);
