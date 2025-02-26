import { JSX } from 'solid-js';
// import loading from "../svg/empty.svg?raw";
import BaseIcon from '../BaseIcon';
export function SdEmpty(props: JSX.IntrinsicElements['span']) {
  return <BaseIcon svgIcon="1" {...props} />;
}

SdEmpty.displayName = 'SearchIcon';
