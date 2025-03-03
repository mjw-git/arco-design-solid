import { For, JSX, mergeProps, ParentComponent, Show, splitProps } from 'solid-js';
import { SpaceProps, SpaceSize } from './interface';
const BASE_PREFIX = 'arco-space';
import cs from '../utils/classNames';
import { isArray, isNumber } from '../utils';
import toArray from '../utils/toArray';
const Space: ParentComponent<SpaceProps> = props => {
  const merge = mergeProps({ size: 'small' as SpaceSize, direction: 'horizontal' }, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'direction',
    'align',
    'wrap',
    'rtl',
    'children',
    'split',
    'rtl',
    'size',
    'wrap',
  ]);
  const innerAlign = () => local.align || (local.direction === 'horizontal' ? 'center' : '');
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-${local.direction}`]: local.direction,
        [`${BASE_PREFIX}-align-${innerAlign()}`]: innerAlign(),
        [`${BASE_PREFIX}-wrap`]: local.wrap,
        [`${BASE_PREFIX}-rtl`]: local.rtl,
      },
      local.class
    );

  function getMargin(size: SpaceSize) {
    if (isNumber(size)) {
      return size;
    }
    switch (size) {
      case 'mini':
        return 4;
      case 'small':
        return 8;
      case 'medium':
        return 16;
      case 'large':
        return 24;
      default:
        return 8;
    }
  }
  const customChild = (children: JSX.Element) => {
    return toArray(children);
  };
  const childrenList = () => customChild(local.children);
  const getMarginStyle = (index: number) => {
    const isLastOne = childrenList().length === index + 1;
    const marginDirection = local.rtl ? 'margin-left' : 'margin-right';
    if (typeof local.size === 'string' || typeof local.size === 'number') {
      const margin = getMargin(local.size);

      if (local.wrap) {
        return isLastOne
          ? { 'margin-bottom': margin + 'px' }
          : {
              [`${marginDirection}`]: margin + 'px',
              'margin-bottom': margin + 'px',
            };
      }
      console.log(isLastOne, index);

      return !isLastOne
        ? {
            [local.direction === 'vertical' ? 'margin-bottom' : marginDirection]: margin + 'px',
          }
        : {};
    }
    if (isArray(local.size)) {
      const marginHorizontal = getMargin(local.size[0]);
      const marginBottom = getMargin(local.size[1]);
      if (local.wrap) {
        return isLastOne
          ? { 'margin-bottom': marginBottom + 'px' }
          : {
              [`${marginDirection}`]: marginHorizontal + 'px',
              'margin-bottom': marginBottom + 'px',
            };
      }
      if (local.direction === 'vertical') {
        return { 'margin-bottom': marginBottom + 'px' };
      }
      return { [`${marginDirection}`]: marginHorizontal + 'px' };
    }
  };

  return (
    <div class={mergeCls()} {...rest}>
      <For each={childrenList()}>
        {(item, index) => {
          const shouldRenderSplit = local.split && index() > 0;
          const style = getMarginStyle(index());
          console.log(style, index());

          return (
            <>
              <Show when={shouldRenderSplit}>{local.split}</Show>
              <div class={`${BASE_PREFIX}-item`} style={style}>
                {item}
              </div>
            </>
          );
        }}
      </For>
    </div>
  );
};
export default Space;
