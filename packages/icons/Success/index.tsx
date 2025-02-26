import { JSX } from 'solid-js';
import BaseIcon from '../BaseIcon';
export function Success(props: JSX.IntrinsicElements['span']) {
  return <BaseIcon svgIcon="1" {...props} />;
}

Success.displayName = 'Success';
