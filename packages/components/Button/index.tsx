import { JSX, ParentComponent, mergeProps, splitProps, children } from 'solid-js';
import cs from '../utils/classNames';
import { ButtonProps } from './interface';

import { IconLoading } from 'arco-solid-icon';

const BASE_PREFIX = 'arco-btn';
function processChildren(childList?: JSX.Element) {
  const childrenList: JSX.Element[] = [];
  const list = children(() => childList);

  let isPrevChildPure = false;
  list.toArray().forEach(child => {
    const isCurrentChildPure = typeof child === 'string' || typeof child === 'number';
    if (isCurrentChildPure && isPrevChildPure) {
      const lastIndex = childrenList.length - 1;
      const lastChild = childrenList[lastIndex];
      childrenList[lastIndex] = `${lastChild}${child}`;
    } else {
      childrenList.push(child);
    }
    isPrevChildPure = isCurrentChildPure;
  });

  return childrenList.map(child => (typeof child === 'string' ? <span>{child}</span> : child));
}
const defaultProps: ButtonProps = {
  size: 'default',
  htmlType: 'button',
  type: 'default',
  shape: 'square',
};
const Button: ParentComponent<ButtonProps> = props => {
  const merged = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(merged, [
    'type',
    'style',
    'htmlType',
    'onClick',
    'class',
    'children',
    'icon',
    'anchorProps',
    'shape',
    'size',
    'status',
    'disabled',
    'loading',
    'iconOnly',
    'loadingFixedWidth',
    'long',
    'href',
  ]);

  const iconNode = () => (local.loading ? <IconLoading /> : local.icon);
  const _type = () => (local.type === 'default' ? 'secondary' : local.type);

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      `${BASE_PREFIX}-${_type()}`,
      `${BASE_PREFIX}-size-${local.size}`,
      `${BASE_PREFIX}-shape-${local.shape}`,
      {
        [`${BASE_PREFIX}-long`]: local.long,
        [`${BASE_PREFIX}-status-${local.status}`]: local.status,
        [`${BASE_PREFIX}-loading-fixed-width`]: local.loadingFixedWidth,
        [`${BASE_PREFIX}-loading`]: local.loading,
        [`${BASE_PREFIX}-link`]: local.href,
        [`${BASE_PREFIX}-icon-only`]:
          local.iconOnly || (!local.children && local.children !== 0 && iconNode),
        [`${BASE_PREFIX}-disabled`]: local.disabled,
        // [`${BASE_PREFIX}-two-chinese-chars`]: isTwoCNChar,
      },
      local.class
    );

  const handleClick = (event: any): void => {
    if (local.loading || local.disabled) {
      typeof event?.preventDefault === 'function' && event.preventDefault();
      return;
    }
    local.onClick && local.onClick(event);
  };

  const InnerContent = () => (
    <>
      {iconNode()}
      {processChildren(local.children)}
    </>
  );

  const component = () => {
    if (local.href) {
      return (
        <a
          style={local.style}
          {...rest}
          {...local.anchorProps}
          class={mergeCls()}
          onClick={e => {
            handleClick(e);
          }}
          href={local.disabled ? undefined : local.href}
        >
          {InnerContent()}
        </a>
      );
    }
    return (
      <button
        {...rest}
        style={local.style}
        class={mergeCls()}
        type={local.htmlType}
        disabled={local.disabled}
        onClick={handleClick}
      >
        {InnerContent()}
      </button>
    );
  };
  return component();
};
export default Button;
