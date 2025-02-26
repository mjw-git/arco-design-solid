import { JSX, splitProps } from 'solid-js';
import BaseIcon from '../BaseIcon';
import classNames from 'classnames';
export function LoadingIcon(props: JSX.IntrinsicElements['span']) {
  const [local, rest] = splitProps(props, ['class']);
  const mergeCls = () => classNames(local.class, 'sld-icon-loading-action');
  return <BaseIcon class={mergeCls()} svgIcon="11" {...rest} />;
}

LoadingIcon.displayName = 'LoadingIcon';
