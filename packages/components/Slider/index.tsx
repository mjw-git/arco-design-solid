import {
  createEffect,
  createSignal,
  For,
  JSX,
  mergeProps,
  ParentComponent,
  splitProps,
} from 'solid-js';
import NP, { divide, plus, times } from 'number-precision';
import { SliderProps } from './interface';
import { isFunction, isObject, isUndefined } from '../utils';
import cs from '../utils/classNames';
import SliderButton from './button';
import Ticks from './ticks';
NP.enableBoundaryChecking(false);

const defaultProps: SliderProps = {
  max: 100,
  min: 0,
  step: 1,
};
const prefixCls = 'arco-slider';
const Slider: ParentComponent<SliderProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'style',
    'defaultValue',
    'tooltipVisible',
    'tooltipPosition',
    'disabled',
    'disabled',
    'min',
    'max',
    'range',
    'step',
    'step',
    'showTicks',
    'marks',
    'getTooltipContainer',
    'onAfterChange',
    'onChange',
    'onlyMarkValue',

    'vertical',
    'value',
    'showInput',
    'reverse',
    'getIntervalConfig',
  ]);

  let isDragging = false;
  let roadRef: HTMLDivElement;

  let position = {
    left: 0,
    height: 0,
    top: 0,
    width: 0,
  };

  const [value, setValue] = createSignal(
    isUndefined(local.defaultValue)
      ? []
      : Array.isArray(local.defaultValue)
        ? local.defaultValue
        : [local.defaultValue!]
  );
  createEffect(() => {
    if ('value' in props) {
      if (Array.isArray(local.value)) {
        setValue(local.value.sort((a, b) => a - b));
      } else {
        setValue([local.value!]);
      }
      return;
    }
  });

  // const value = () => {
  //   if ('value' in props) {
  //     if (Array.isArray(local.value)) {
  //       return local.value.sort((a, b) => a - b);
  //     } else {
  //       return [local.value ?? 0];
  //     }
  //   }
  //   return Array.isArray(local.defaultValue) ? local.defaultValue : [local.defaultValue || 0];
  // };

  function getPosition() {
    position = roadRef.getBoundingClientRect();
  }

  function onRoadMouseDown(e: MouseEvent) {
    getPosition();
    const val = getValueByCoords(e.clientX, e.clientY);

    handleJumpClick(val);
  }
  function handleJumpClick(val: number) {
    if (local.disabled) return;
    const index = findNearestIndex(val);
    const copyVal = value().slice(0);
    copyVal[index] = val;
    setValue(copyVal);
    local.onChange?.(Array.isArray(local.value) ? copyVal : val, 'click');
  }

  const getBarStyle = () => {
    let beginOffset = '0%';
    let endOffset = '0%';
    const allValue = local.max! - local.min!;

    if (value().length === 1) {
      endOffset = `${divide((allValue - value()[0]) / allValue) * 100}%`;
    } else {
      beginOffset = `${divide(value()[0] / allValue) * 100}%`;
      endOffset = `${divide((allValue - value()[value().length - 1]) / allValue) * 100}%`;
    }
    return local.vertical
      ? {
          [local.reverse ? 'top' : 'bottom']: beginOffset,
          [local.reverse ? 'bottom' : 'top']: endOffset,
        }
      : {
          [local.reverse ? 'right' : 'left']: beginOffset,
          [local.reverse ? 'left' : 'right']: endOffset,
        };
  };

  function getBtnStyle(offset: number): JSX.CSSProperties {
    const allValue = local.max! - local.min!;
    const percent = `${divide(offset / allValue) * 100}%`;
    return local.vertical
      ? { [local.reverse ? 'top' : 'bottom']: percent }
      : { [local.reverse ? 'right' : 'left']: percent };
  }

  function handleMoveEnd() {
    isDragging = false;
  }

  function findNearestIndex(val: number) {
    if (value().length === 1) return 0;
    const copyVal = value().slice(0);
    let min = Infinity;
    let index = 0;
    copyVal.forEach((item, i) => {
      const diff = Math.abs(item - val);
      if (diff < min) {
        min = diff;
        index = i;
      }
    });
    return index;
  }

  function handleMove(x: number, y: number, index: number) {
    isDragging = true;
    const copyVal = value().slice(0);
    const val = getValueByCoords(x, y);
    copyVal[index] = val;
    setValue(copyVal);
    local.onChange?.(Array.isArray(local.value) ? copyVal : val, 'mousemove');
  }

  function getValueByCoords(x: number, y: number): number {
    const { left, top, width, height } = position;
    let roadLength = width;
    let diff = local.reverse ? left + width - x : x - left;
    if (local.vertical) {
      x;
      roadLength = height;
      diff = local.reverse ? y - top : top + height - y;
    }
    if (roadLength <= 0) {
      return 0;
    }
    if (diff > roadLength) {
      diff = roadLength;
    }
    if (diff < 0) {
      diff = 0;
    }
    const percent = divide(diff, roadLength);
    const val = (local.max! - local.min!) * percent;
    const currentStepNum = Math.floor(val / local.step!);
    const rest = val % local.step!;
    return plus(
      local.min!,
      times(currentStepNum, local.step!),
      rest <= local.step! / 2 ? 0 : local.step!
    );

    // return 0;
  }

  return (
    <div
      {...rest}
      class={cs(
        prefixCls,
        {
          [`${prefixCls}-vertical`]: local.vertical,
          [`${prefixCls}-with-marks`]: local.marks,
          [`${prefixCls}-reverse`]: local.reverse,
        },
        local.class
      )}
      style={local.style}
    >
      <div class={`${prefixCls}-wrapper`}>
        <div
          ref={el => (roadRef = el)}
          class={cs(`${prefixCls}-road`, {
            [`${prefixCls}-road-disabled`]: local.disabled,
            [`${prefixCls}-road-vertical`]: local.vertical,
          })}
          onMouseDown={onRoadMouseDown}
        >
          <div class={`${prefixCls}-bar`} style={getBarStyle()} />
          {local.showTicks && (
            <Ticks
              reverse={local.reverse}
              step={local.step!}
              vertical={local.vertical}
              prefixCls={prefixCls}
              value={value()}
              max={local.max!}
              min={local.min!}
            />
          )}
          <For each={value()}>
            {(val, index) => {
              return (
                <SliderButton
                  onMoveBegin={getPosition}
                  style={getBtnStyle(val)}
                  onMoveEnd={handleMoveEnd}
                  value={val}
                  onMoving={(x, y) => handleMove(x, y, index())}
                  vertical={local.vertical}
                  prefixCls={prefixCls}
                  disabled={local.disabled}
                ></SliderButton>
              );
            }}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Slider;
