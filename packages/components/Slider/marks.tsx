import { For, JSX, ParentComponent } from 'solid-js';
import { isFunction } from '../utils';

type MaskType = {
  key: number | string;
  content: any;
};
interface MaskProps {
  data?: Record<string, JSX.Element>;
  vertical?: boolean;
  prefixCls?: string;
  onMouseDown?: (val: number) => void;
  reverse?: boolean;
  max: number;
  min: number;
}

const Marks: ParentComponent<MaskProps> = props => {
  const formatData = () => {
    const keys = Object.keys(props.data ?? {}).sort((a, b) => Number(a) - Number(b));
    return keys.map(key => {
      return {
        key: Number(key),
        content: props?.data?.[key],
      };
    });
  };
  return (
    <div class={`${props.prefixCls}-marks`}>
      <For each={formatData()}>
        {item => {
          const offset = `${(item.key / (props.max - props.min)) * 100}%`;
          return (
            <div
              style={
                props.vertical
                  ? { [props.reverse ? 'top' : 'bottom']: offset }
                  : { [props.reverse ? 'right' : 'left']: offset }
              }
              class={`${props.prefixCls}-marks-text`}
              aria-hidden
              onMouseDown={e => {
                e.stopPropagation();

                isFunction(props.onMouseDown) && props.onMouseDown(item.key);
              }}
            >
              {item.content}
            </div>
          );
        }}
      </For>
    </div>
  );
};
export default Marks;
