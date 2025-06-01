import { For, JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import NP, { divide, plus, times } from 'number-precision';
import { SliderProps } from './interface';
import { isFunction, isObject } from '../utils';
import cs from '../utils/classNames';
import SliderButton from './button';
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

  const value = () => {
    if ('value' in props) {
      if (Array.isArray(local.value)) {
        return local.value.sort((a, b) => a - b);
      } else {
        return [local.value ?? 0];
      }
    }
    return Array.isArray(local.defaultValue) ? local.defaultValue : [local.defaultValue || 0];
  };

  function getPosition() {
    position = roadRef.getBoundingClientRect();
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

  function handleMove(x: number, y: number, index: number) {
    isDragging = true;
    const copyVal = value().slice(0);
    const val = getValueByCoords(x, y);
    copyVal[index] = val;
    console.log(val);
    local.onChange?.(Array.isArray(local.value) ? copyVal : val, 'mousemove');
  }

  function getValueByCoords(x: number, y: number): number {
    const { left, top, width, height } = position;
    let roadLength = width;
    let diff = local.reverse ? left + width - x : x - left;
    if (local.vertical) {
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

  // function getValueByCoords(x: number, y: number): number {
  //   const { left, top, width, height } = position;
  //   let roadLength = width;
  //   let diff = local.reverse ? left + width - x : x - left;
  //   if (local.vertical) {
  //     roadLength = height;
  //     diff = local.reverse ? y - top : top + height - y;
  //   }
  //   if (roadLength <= 0) {
  //     return 0;
  //   }
  //   // 通过坐标点偏移算出当前值相对于整个滑动轴的比例位置
  //   let offset = Math.max(divide(diff, roadLength), 0);
  //   offset = Math.min(1, offset);
  //   // 通过偏移值算出当前值在哪个区间
  //   const currentInterval = intervalConfigs.find(config => {
  //     return offset >= config.beginOffset && offset <= config.endOffset;
  //   });
  //   const { begin, beginOffset, step: currentStep, endOffset, end } = currentInterval;
  //   // 当前值对整体来说，多出这个区间的比例
  //   const currentValueOffset = offset - beginOffset;
  //   // 这个区间整体的比例
  //   const currentIntervalOffset = endOffset - beginOffset;
  //   // 当前在这个区间的值 = （在这个区间的比例（相对于整体） / 这个区间相对于整体的比例）* 这个区间的总值
  //   const valueInInterval = (currentValueOffset / currentIntervalOffset) * (end - begin);
  //   // 算出当前值在这个区间的步数
  //   const stepNum = Math.round(valueInInterval / currentStep);
  //   // 当前值 = 区间起始值 + 区间步数 * 步长
  //   return plus(begin, times(stepNum, currentStep));
  // }

  // function onRoadMouseDown(e) {
  //   getPosition();
  //   const val = getValueByCoords(e.clientX, e.clientY);
  //   if (rangeConfig.draggableBar && inRange(val)) {
  //     barStartDragVal.current = getLegalValue(val);
  //     on(window, 'mousemove', onBarMouseMove);
  //     on(window, 'mouseup', onBarMouseUp);
  //   } else {
  //     handleJumpClick(val);
  //   }
  // }

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
          // onMouseDown={}
        >
          <div class={`${prefixCls}-bar`} style={getBarStyle()} />
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
