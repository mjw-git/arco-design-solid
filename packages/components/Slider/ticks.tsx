import { plus, times } from 'number-precision';
import { For } from 'solid-js';
import cs from '../utils/classNames';
interface TicksProps {
  value: number[];
  min: number;
  max: number;
  prefixCls: string;
  vertical?: boolean;
  reverse?: boolean;
  step: number;
}
const Ticks = (props: TicksProps) => {
  const ticks = () => {
    const tickNum = Math.floor((props.max - props.min) / props.step);
    const tickList = [];
    for (let i = 1; i <= tickNum; i++) {
      const currentTickValue = plus(props.min, times(i, props.step));
      if (currentTickValue >= props.max || currentTickValue <= props.min) continue;
      tickList.push({
        isActive:
          props.value.length === 1
            ? currentTickValue <= props.value[0]
            : currentTickValue >= props.value[0] &&
              currentTickValue <= props.value[props.value.length - 1],
        value: currentTickValue,
        offset: `${(currentTickValue / (props.max - props.min)) * 100}%`,
      });
    }
    return tickList;
  };
  return (
    <div class={`${props.prefixCls}-ticks`}>
      <For each={ticks()}>
        {item => {
          return (
            <div
              class={cs(`${props.prefixCls}-tick`, {
                [`${props.prefixCls}-tick-active`]: item.isActive,
              })}
              style={
                props.vertical
                  ? { [props.reverse ? 'top' : 'bottom']: item.offset }
                  : { [props.reverse ? 'right' : 'left']: item.offset }
              }
            />
          );
        }}
      </For>
    </div>
  );
};

export default Ticks;
