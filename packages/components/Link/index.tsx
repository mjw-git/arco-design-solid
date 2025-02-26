import { mergeProps, splitProps } from 'solid-js';
import { LinkProps } from './interface';
import classNames from 'classnames';

const BASE_PREFIX = 'arco-link';
const Link = (props: LinkProps) => {
  const merged = mergeProps(
    { size: 'default', type: 'primary', shape: 'square', disabled: false, status: 'default' },
    props
  );
  const [local, rest] = splitProps(merged, [
    'type',
    'children',
    'onClick',
    'class',
    'icon',
    'hoverable',
    'status',
  ]);
  const cls = () => classNames(BASE_PREFIX, local.class);
  return (
    <a class={cls()} {...rest}>
      {local.children}
    </a>
  );
};
export default Link;
