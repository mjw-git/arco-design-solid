import { mergeProps, ParentComponent, Show, splitProps } from 'solid-js';
import { LinkProps } from './interface';
import cs from '../utils/classNames';
import { IconLink } from 'arco-solid-icon';
import { Dynamic } from 'solid-js/web';

const BASE_PREFIX = 'arco-link';
const Link: ParentComponent<LinkProps> = props => {
  const merged = mergeProps({ disabled: false, status: 'default' }, props);
  const [local, rest] = splitProps(merged, [
    'type',
    'children',
    'class',
    'hoverable',
    'status',
    'disabled',
    'icon',
  ]);
  const cls = () =>
    cs(BASE_PREFIX, local.class, {
      [`${BASE_PREFIX}-hoverable`]: local.hoverable,
      [`${BASE_PREFIX}-is-${local.status}`]: local.status,
      [`${BASE_PREFIX}-disabled`]: local.disabled,
      [`${BASE_PREFIX}-hoverless`]: typeof local.hoverable === 'boolean' && !local.hoverable,
    });
  const Tag = () => (local.hoverable ? 'a' : 'span');
  return (
    <Dynamic component={Tag()} class={cls()} {...rest}>
      <Show when={!!local.icon}>
        <span class={`${BASE_PREFIX}-icon`}>
          {typeof local.icon === 'boolean' ? <IconLink /> : local.icon}
        </span>
      </Show>
      {local.children}
    </Dynamic>
  );
};
export default Link;
