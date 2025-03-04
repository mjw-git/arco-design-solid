import { ParentComponent, splitProps } from 'solid-js';
import { RadioProps } from './interface';
import cs from '../utils/classNames';
const BASE_PREFIX = 'arco-radio';

const Radio: ParentComponent<RadioProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'disabled', 'checked']);
  const classNames = () =>
    cs(
      `${BASE_PREFIX}${context.type === 'button' ? '-button' : ''}`,
      {
        [`${BASE_PREFIX}-checked`]: local.checked,
        [`${BASE_PREFIX}-disabled`]: local.disabled,
      },
      local.class
    );
  return (
    <label>
      <input onChange={e => {}} />
    </label>
  );
};
export default Radio;
