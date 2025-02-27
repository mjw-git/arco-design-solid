import { JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { RowProps } from './interface';
import cs from '../utils/classNames';
import { RowContext } from './RowContext';

const BASE_PREFIX = 'arco-row';
const Row: ParentComponent<RowProps> = props => {
  const merged = mergeProps({ align: 'start', justify: 'start' }, props);
  const [local, rest] = splitProps(merged, ['align', 'class', 'justify', 'children']);
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-align-${local.align}`]: local.align,
        [`${BASE_PREFIX}-justify-${local.justify}`]: local.justify,
      },
      local.class
    );

  return (
    <div class={mergeCls()} {...rest}>
      {local.children}
    </div>
  );
};
export default Row;
