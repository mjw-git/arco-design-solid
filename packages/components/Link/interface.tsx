import { JSX } from 'solid-js/jsx-runtime';

interface LinkProps extends JSX.ButtonHTMLAttributes<HTMLAnchorElement> {
  icon?: JSX.Element;
  hoverable?: boolean;
  status?: 'error' | 'success' | 'warning' | 'default';
}
export type { LinkProps };
