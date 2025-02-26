import { JSX } from 'solid-js';
import BaseIcon from '../BaseIcon';
export function Warn(props: JSX.IntrinsicElements['span']) {
  return <BaseIcon svgIcon="1" {...props} />;
}

Warn.displayName = 'Warn';
