import { JSX } from 'solid-js/jsx-runtime';

interface LinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: JSX.Element | boolean;
  hoverable?: boolean;
  disabled?: boolean;
  status?: 'error' | 'success' | 'warning' | 'default';
}
export type { LinkProps };
