import cs from '../utils/classNames';
import { JSX, splitProps } from 'solid-js';
interface HoverProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  size?: 'small' | 'mini' | 'default' | 'large';
  className?: string;
  prefix?: string;
  disabled?: boolean;
  onClick?: (e: Event) => void;
}
const BASE_PREFIX = 'arco-icon-hover';
export default function IconHover(props: HoverProps) {
  const [local, rest] = splitProps(props, [
    'class',
    'disabled',
    'style',
    'size',
    'disabled',
    'prefix',
    'children',
  ]);
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${local.prefix}-icon-hover`]: local.prefix,
        [`${BASE_PREFIX}-size-${local.size}`]: local.size && local.size !== 'default',
        [`${BASE_PREFIX}-disabled`]: local.disabled,
      },
      local.class
    );

  return (
    <span class={mergeCls()} onClick={props.onClick} {...rest}>
      {local.children}
    </span>
  );
}
