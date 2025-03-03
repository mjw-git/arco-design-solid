import { For, mergeProps, ParentComponent, splitProps, children, JSX } from 'solid-js';
import { AvatarGroupProps } from './interface';
import cs from '../utils/classNames';
import { isNumber } from '../utils';
const BASE_PREFIX = 'arco-avatar-group';
const defaultProps: AvatarGroupProps = {
  shape: 'circle',
  autoFixFontSize: true,
};

const Group: ParentComponent<AvatarGroupProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'rtl',
    'class',
    'children',
    'maxCount',
    'maxStyle',
    'zIndexAscend',
    'size',
    'shape',
    'autoFixFontSize',
  ]);
  const mergeCls = () => cs(BASE_PREFIX, { [`${BASE_PREFIX}-rtl`]: local.rtl }, local.class);
  // const childrenList = () => toArray(local.children);
  const resolvedChildren = children(() => local.children);

  // // 通过调用 resolvedChildren() 获取 JSX 数组
  // const childrenArray = () =>
  //   Array.isArray(resolvedChildren()) ? resolvedChildren() : [resolvedChildren()];
  // console.log(childrenArray(), 'jjjj');

  const avatarsToRender = () => {
    if (isNumber(local.maxCount)) {
      return resolvedChildren.toArray().slice(0, local.maxCount);
    }
  };
  const avatarCount = () => resolvedChildren.toArray().length;
  return (
    <div class={mergeCls()} {...rest}>
      <For each={resolvedChildren.toArray()}>
        {(item: JSX.Element, index) => {
          const isFirst = local.rtl
            ? index() === (avatarsToRender() ?? []).length - 1
            : index() === 0;
          const stackedStyle = {
            'z-index': local.zIndexAscend ? index() + 1 : avatarCount() - index(),
            'margin-left': local.size ? (!isFirst ? -local.size / 4 : 0) + 'px' : '',
          };
          const props = {
            size: local.size,
            shape: local.shape,
            rtl: local.rtl,
            autoFixFontSize: local.autoFixFontSize,
            style: stackedStyle,
          };
          const sizeStyle: () => JSX.CSSProperties = () => {
            if (local.size) {
              return {
                width: local.size + 'px',
                height: local.size + 'px',
                'font-size': isNumber(local.size) ? local.size / 2 + 'px' : '',
              };
            }
            return {};
          };

          return item;
          // map.set(item, {
          //   size: local.size,
          //   shape: local.shape,
          //   rtl: local.rtl,
          //   autoFixFontSize: local.autoFixFontSize,
          //   style: stackedStyle,
          // });
          // console.log(map, 'gggmap');

          return item;
        }}
      </For>
    </div>
  );
};
export default Group;
