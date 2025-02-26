import { Show, mergeProps, splitProps } from 'solid-js';
import { EmptyProps } from './interface';

const Empty = (props: EmptyProps) => {
  const mergedProps = mergeProps({ size: 'normal' }, props);
  const [local] = splitProps(mergedProps, ['image', 'description', 'size', 'imageWrapperStyle']);

  return (
    <div class="sld-empty-container">
      <div class="sld-empty-image" style={{ height: local.size === 'small' ? '30px' : '60px' }}>
        <Show when={local.image}>{local.image}</Show>
      </div>
      <div class="sld-empty-description">{local.description || 'No Data'}</div>
    </div>
  );
};
export default Empty;
