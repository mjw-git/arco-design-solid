import { JSX } from 'solid-js';
import BaseIcon from '../BaseIcon';
export function InfoIcon(props: JSX.IntrinsicElements['span']) {
  return <BaseIcon svgIcon="1" {...props} />;
}

InfoIcon.displayName = 'InfoIcon';
