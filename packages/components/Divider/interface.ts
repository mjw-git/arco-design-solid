import { JSX } from 'solid-js';

export interface DividerProps {
  orientation?: 'left' | 'right' | 'center';
  type?: 'horizontal' | 'vertical';
  class?: string;
  style?: JSX.CSSProperties;
}
