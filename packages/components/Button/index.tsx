import { JSX, ParentComponent, Show, mergeProps, splitProps } from 'solid-js';
import classNames from 'classnames';
import { ButtonProps } from './interface';

import handleEvent from '../utils/handleEvent';
import { IconLoading } from 'arco-solid-icon';

const BASE_PREFIX = 'arco-btn';

const Button: ParentComponent<ButtonProps> = props => {
  const merged = mergeProps(
    { size: 'default', type: 'primary', shape: 'square', disabled: false, status: 'default' },
    props
  );
  const [local, rest] = splitProps(merged, [
    'type',
    'htmlType',
    'onClick',
    'class',
    'children',
    'icon',
    'shape',
    'size',
    'status',
    'disabled',
    'loading',
  ]);

  const cls = () =>
    classNames(
      BASE_PREFIX,
      `${BASE_PREFIX}-${local.type}`,
      `${BASE_PREFIX}${local.disabled ? '-disabled' : ''}`,
      `${BASE_PREFIX}-size-${local.size}`,
      local.loading ? `${BASE_PREFIX}-loading` : '',
      local.class,
      {
        [`${BASE_PREFIX}-icon-only`]: !local.children && !!local.icon,
      },
      `${BASE_PREFIX}-shape-${local.shape}`,
      `${BASE_PREFIX}-status-${local.status}`
    );

  const handleClick: JSX.ButtonHTMLAttributes<HTMLButtonElement>['onClick'] = e => {
    handleEvent(e, local.onClick);
  };

  return (
    <button type={local.htmlType || 'button'} class={cls()} onClick={handleClick} {...rest}>
      <Show when={local.loading}>
        <IconLoading />
      </Show>
      <Show when={!local.loading && local.icon}>{local.icon}</Show>
      <Show when={!!local.children}>
        <span>{local.children}</span>
      </Show>
    </button>
  );
};
export default Button;
