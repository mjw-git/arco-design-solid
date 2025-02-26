import { JSX } from 'solid-js';
import BaseIcon from '../BaseIcon';
export function Visible(props: JSX.IntrinsicElements['span']) {
  return <BaseIcon svgIcon="1" {...props} />;
}

Visible.displayName = 'Visible';
