import { For, JSX, mergeProps, ParentComponent, Show, splitProps } from 'solid-js';
import { TypographyParagraphProps, TypographyTextProps, TypographyTitleProps } from './interface';
import { Dynamic } from 'solid-js/web';
import cs from '../utils/classNames';
import { isObject } from '../utils';
export const BASE_PREFIX = 'arco-typography';
type BaseProps = TypographyParagraphProps &
  TypographyTitleProps &
  TypographyTextProps & {
    componentType?: 'Title' | 'Paragraph' | 'Text';
  };
const Base: ParentComponent<BaseProps> = props => {
  const merged = mergeProps({ heading: 1 }, props);
  const [local, rest] = splitProps(merged, [
    'children',
    'componentType',
    'heading',
    'class',
    'type',
    'bold',
    'disabled',
    'underline',
    'code',
    'delete',
    'mark',
    'style',
  ]);
  const componentType = () => {
    if (local.componentType === 'Text') {
      return 'span';
    }
    if (local.componentType === 'Title') {
      return `h${local.heading}`;
    }
    if (local.componentType === 'Paragraph') {
      return 'div';
    }
    return 'article';
  };
  const mergeCls = () => {
    return cs(BASE_PREFIX, local.class, {
      [`${BASE_PREFIX}-${local.type}`]: !!local.type,
      [`${BASE_PREFIX}-disabled`]: !!local.disabled,
    });
  };
  const mergeStyle: () => JSX.CSSProperties = () => {
    return {
      backgroundColor: isObject(local.mark) && local.mark.color ? local.mark.color : undefined,
      ...local.style,
    };
  };
  const wrapperComponentType = () => {
    const components = [];
    if (local.bold) {
      components.push('b');
    }
    if (local.underline) {
      components.push('u');
    }
    if (local.delete) {
      components.push('del');
    }
    if (local.code) {
      components.push('code');
    }
    if (local.mark) {
      components.push('mark');
    }
    return components;
  };
  return (
    <Dynamic component={componentType()} style={mergeStyle()} class={mergeCls()} {...rest}>
      <For each={wrapperComponentType()}>
        {(item, index) => (
          <Dynamic component={item}>
            <Show when={index() === wrapperComponentType().length - 1}>{local.children}</Show>
          </Dynamic>
        )}
      </For>
      <Show when={wrapperComponentType().length === 0}>{local.children}</Show>
    </Dynamic>
  );
};
export default Base;
