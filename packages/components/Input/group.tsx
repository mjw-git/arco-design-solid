import { ParentComponent, splitProps } from 'solid-js';
import { InputGroupProps } from './interface';
import cs from '../utils/classNames';

const BASE_PREFIX = 'arco-input-group';

const Group: ParentComponent<InputGroupProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'compact', 'children']);
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-compact`]: local.compact,
      },
      local.class
    );
  return (
    <div class={mergeCls()} {...rest}>
      {local.children}
    </div>
  );
};
export default Group;
