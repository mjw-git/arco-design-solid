import { JSX, mergeProps, ParentComponent, splitProps, useContext } from 'solid-js';
import { RowContext } from './RowContext';
import { ColProps } from './interface';
import classNames from 'classnames';

const BASE_PREFIX = 'arco-col';
const Col: ParentComponent<ColProps> = props => {
  const state = useContext(RowContext);
  const merged = mergeProps({ span: 24 }, props);
  const [local, rest] = splitProps(merged, ['span', 'class', 'style', 'offset']);

  const mergeCls = () =>
    classNames(
      BASE_PREFIX,
      local.span ? `${BASE_PREFIX}-${local.span}` : '',
      local.offset ? `${BASE_PREFIX}-offset-${local.offset}` : '',
      local.class
    );

  const style = () => {
    return {
      'padding-left': `${(state.horizontalGutter || 0) / 2}px`,
      'padding-right': `${(state.horizontalGutter || 0) / 2}px`,
      ...(local.style as JSX.CSSProperties),
    };
  };

  return (
    <div class={mergeCls()} style={style()} {...rest}>
      {props.children}
    </div>
  );
};
export default Col;
