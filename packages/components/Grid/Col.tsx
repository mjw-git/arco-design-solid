import { JSX, splitProps, useContext } from 'solid-js';
import { RowContext } from './RowContext';
import { ColProps } from './interface';
import classNames from 'classnames';

const BASE_PREFIX = 'sld-col';
const Col: ColProps = props => {
  const state = useContext(RowContext);
  // state.horizontalGutter
  const [local, rest] = splitProps(props, ['span', 'class', 'style', 'offset']);
  const mergeCls = () =>
    classNames(
      BASE_PREFIX,
      local.class,
      local.span ? `${BASE_PREFIX}-span-${local.span}` : '',
      local.offset ? `${BASE_PREFIX}-offset-${local.offset}` : ''
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
