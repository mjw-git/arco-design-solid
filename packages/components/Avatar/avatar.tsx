import { createEffect, JSX, mergeProps, ParentComponent, Show, splitProps } from 'solid-js';
import { AvatarProps } from './interface';
import cs from '../utils/classNames';
import toArray from '../utils/toArray';
import { isNumber } from '../utils';
const BASE_PREFIX = 'arco-avatar';
const defaultProps: AvatarProps = {
  shape: 'circle',
  autoFixFontSize: true,
  triggerType: 'button',
};
const Avatar: ParentComponent<AvatarProps> = props => {
  //   const contextProps = useContext(AvatarContext);

  const mergedProps = mergeProps({ ...defaultProps }, props);
  const [local, rest] = splitProps(mergedProps, [
    'class',
    'children',
    'shape',
    'triggerIcon',
    'rtl',
    'triggerIconStyle',
    'triggerType',
    'style',
    'size',
    'autoFixFontSize',
    'onClick',
  ]);
  let avatarRef: HTMLDivElement;
  let textRef: HTMLSpanElement;
  const childrenList = () => toArray(local.children);

  function autoFixFontSizeHandler() {
    if (textRef) {
      const textWidth = textRef.clientWidth;
      const size = local.size || avatarRef.offsetWidth;
      const scale = size / (textWidth + 8);

      if (size && scale < 1) {
        textRef.style.transform = `scale(${scale}) translateX(-50%)`;
      }
    }
  }
  createEffect(() => {
    if (local.autoFixFontSize && local.children) {
      autoFixFontSizeHandler();
    }
  });
  const isImage = () => {
    return (
      childrenList().length === 1 &&
      (childrenList()[0] instanceof HTMLImageElement ||
        childrenList()[0] instanceof HTMLPictureElement)
    );
  };

  const _triggerIconStyle = () => {
    const iconStyle: JSX.CSSProperties = {};
    if (
      local.triggerType === 'button' &&
      (!local.triggerIconStyle || (local.triggerIconStyle && !local.triggerIconStyle.color)) &&
      local.style &&
      local.style['background-color']
    ) {
      iconStyle.color = local.style['background-color'];
    }
    return iconStyle;
  };

  const mergeStyle = () => ({
    ...local.style,
    ..._triggerIconStyle(),
  });

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      `${BASE_PREFIX}-${local.shape}`,
      {
        [`${BASE_PREFIX}-with-trigger-icon`]: local.triggerIcon,
        [`${BASE_PREFIX}-rtl`]: local.rtl,
      },
      local.class
    );

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
  const ref = (
    <div
      onClick={local.onClick}
      ref={el => (avatarRef = el)}
      style={{ ...sizeStyle(), ...mergeStyle() }}
      class={mergeCls()}
      {...rest}
    >
      <Show when={isImage()}>
        <span class={`${BASE_PREFIX}-image`}>{local.children}</span>
      </Show>
      <Show when={!isImage()}>
        <span ref={el => (textRef = el)} class={`${BASE_PREFIX}-text`}>
          {local.children}
        </span>
      </Show>
      <Show when={local.triggerIcon}>
        <div class={`${BASE_PREFIX}-trigger-icon-${local.triggerType}`} style={_triggerIconStyle()}>
          {local.triggerIcon}
        </div>
      </Show>
    </div>
  );
  //   console.log(map, 'gggmaps');
  return ref;
};
export default Avatar;
