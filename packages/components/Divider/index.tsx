import { mergeProps, ParentComponent, Show, splitProps } from 'solid-js';
import { DividerProps } from './interface';
import cs from '../utils/classNames';
const BASE_PREFIX = 'arco-divider';
const Divider: ParentComponent<DividerProps> = props => {
  const merged = mergeProps({ orientation: 'center', type: 'horizontal' }, props);
  const [local, rest] = splitProps(merged, ['orientation', 'type', 'class', 'style', 'children']);
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      `${BASE_PREFIX}-${local.type}`,
      { [`${BASE_PREFIX}-with-text`]: local.children },
      { [`${BASE_PREFIX}-with-text-${local.orientation}`]: local.children },
      local.class
    );
  const mergeTextCls = () => cs(`${BASE_PREFIX}-text`, `${BASE_PREFIX}-text-${local.orientation}`);
  return (
    <div role="separator" class={mergeCls()} {...rest}>
      <Show when={local.children && local.type === 'horizontal'}>
        <span class={mergeTextCls()}>{local.children}</span>
      </Show>
    </div>
  );
};
export default Divider;
