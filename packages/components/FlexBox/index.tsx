import classNames from 'classnames';
import { JSX, mergeProps, splitProps } from 'solid-js';
import { FlexBoxProps } from './interface';
const BASE_PREFIX = 'sld-flex-box';
const FlexBox: FlexBoxProps = props => {
  const mergedProps = mergeProps({ gap: 8 }, props);
  const [local, reset] = splitProps(mergedProps, [
    'style',
    'gap',
    'align',
    'justify',
    'split',
    'children',
    'direction',
    'wrap',
    'class',
  ]);

  const mergeCls = () => classNames(local.class, `${BASE_PREFIX}-container`);

  const style = () => {
    const customStyle: JSX.CSSProperties = {
      gap: `${local.gap}px`,
      ...(local.style as JSX.CSSProperties),
    };
    if (local.wrap) {
      customStyle['flex-wrap'] = local.wrap;
    }
    if (local.align) {
      customStyle['align-items'] = local.align;
    }

    if (local.justify) {
      customStyle['justify-content'] = local.justify;
    }

    if (local.direction) {
      customStyle['flex-direction'] = local.direction;
    }

    return customStyle;
  };

  const customChild = () => {
    if (local.split && Array.isArray(local.children)) {
      const custom: JSX.Element = [];
      local.children.forEach((item, index) => {
        if (index === 0) {
          custom.push(
            <div class={`${BASE_PREFIX}-item`} style={{}}>
              {item}
            </div>
          );
        } else {
          custom.push(local.split, item);
        }
      });
      return custom;
    } else {
      return props.children;
    }
  };

  return (
    <div class={mergeCls()} style={{ ...style() }} {...reset}>
      {customChild()}
    </div>
  );
};
export default FlexBox;
