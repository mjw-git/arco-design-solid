import { JSX } from 'solid-js/jsx-runtime';

interface ButtonProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon?: JSX.Element;
  disabled?: boolean;
  shape?: 'circle' | 'round' | 'square' | '==';
  size?: 'mini' | 'small' | 'default' | 'large';
  type?: 'primary' | 'secondary' | 'dashed' | 'text' | 'outline';
  status?: 'warning' | 'danger' | 'success' | 'default';
  htmlType?: JSX.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loading?: boolean;
}
export type { ButtonProps };
