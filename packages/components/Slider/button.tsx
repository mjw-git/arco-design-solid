import { createSignal, JSX } from 'solid-js';
import Trigger from '../Trigger';
import cs from '../utils/classNames';
import { off, on } from '../utils/dom';
import { TooltipPosition } from './interface';
import useMergeValue from '../hooks/useMergeValue';
import { isFunction } from '../utils';
const prefixCls = 'arco-slider';
interface SliderButtonProps {
  style?: JSX.CSSProperties;
  disabled?: boolean;
  prefixCls: string;
  value: number;
  maxValue?: number;
  minValue?: number;
  vertical?: boolean;
  tooltipVisible?: boolean;
  tooltipPosition?: TooltipPosition;
  formatTooltip?: (value: number) => string | JSX.Element;
  getTooltipContainer?: () => Element;
  // 事件
  onMoving?: (x: number, y: number) => void;
  onMoveEnd?: () => void;
  onMoveBegin?: () => void;
  onArrowEvent?: (type: 'addition' | 'subtraction') => void;
}

const triggerPopupAlign = {
  left: 12,
  right: 12,
  top: 12,
  bottom: 12,
};

const SliderButton = (props: SliderButtonProps) => {
  const [isActive, setIsActive] = createSignal(false);
  const [popupVisible, setPopupVisible] = useMergeValue(false, () => props.tooltipVisible);
  let inButtonOrPopup = false;
  let delayTimer: any = null;
  let isDragging = false;
  function handleMouseDown(e: MouseEvent) {
    e.stopPropagation();
    if (props.disabled) return;

    moveStart(e);
    setIsActive(true);
    on(window, 'mousemove', moving);
    on(window, 'touchmove', moving);
    on(window, 'mouseup', moveEnd);
    on(window, 'touchend', moveEnd);
    on(window, 'contextmenu', moveEnd);
  }

  function moveStart(e: MouseEvent) {
    // 如果不阻止默认行为可能会在拖动时产生鼠标选中状态，所以手动处理元素失焦
    e.preventDefault();
    const activeElement = document.activeElement as HTMLElement;
    activeElement && activeElement.blur && activeElement.blur();

    isFunction(props.onMoveBegin) && props.onMoveBegin();
  }
  const position = () => props.tooltipPosition || (props.vertical ? 'right' : 'top');

  const tooltipText = () =>
    isFunction(props.formatTooltip) ? props.formatTooltip(props.value) : props.value;

  function renderTooltipContent(position: TooltipPosition) {
    const tooltipPrefixCls = 'arco-tooltip';
    return (
      <div
        class={cs(`${tooltipPrefixCls}-content`, `${tooltipPrefixCls}-content-${position}`)}
        // onMouseLeave={handleMouseLeave}
        // onMouseEnter={handlePopupMouseEnter}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div class={`${tooltipPrefixCls}-content-inner`}>{tooltipText()}</div>
      </div>
    );
  }

  function handleMouseEnter() {
    inButtonOrPopup = true;
    clearDelayTimer();
    if (!popupVisible()) {
      delayTimer = setTimeout(() => {
        updatePopupVisible(true);
      }, 50);
    }
  }

  function updatePopupVisible(value: boolean) {
    if (isDragging) return;

    const newPopupVisible = 'tooltipVisible' in props ? props.tooltipVisible : value;
    setPopupVisible(newPopupVisible);
  }
  function moving(e) {
    isDragging = true;

    if (e.type === 'touchstart') {
      e.clientY = e.touches[0].clientY;
      e.clientX = e.touches[0].clientX;
    }
    isFunction(props.onMoving) && props.onMoving(e.clientX, e.clientY);
  }

  const moveEnd = () => {
    isDragging = false;
    setIsActive(false);
    offEvents();
    updatePopupVisible(inButtonOrPopup);
    isFunction(props.onMoveEnd) && props.onMoveEnd();
  };

  function offEvents() {
    clearDelayTimer();
    off(window, 'mousemove', moving);
    off(window, 'touchmove', moving);
    off(window, 'mouseup', moveEnd);
    off(window, 'touchend', moveEnd);
    off(window, 'contextmenu', moveEnd);
  }

  function clearDelayTimer() {
    if (delayTimer) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
  }

  function handleMouseLeave() {
    inButtonOrPopup = false;
    if (!isDragging) {
      clearDelayTimer();
      delayTimer = setTimeout(() => {
        updatePopupVisible(false);
      }, 200);
    }
  }

  return (
    <Trigger
      showArrow
      childrenPrefix="arco-tooltip"
      popup={() => renderTooltipContent(position())}
      popupVisible={popupVisible()}
      position={position()}
      popupAlign={triggerPopupAlign}
    >
      <div
        style={props.style}
        role="slider"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        class={cs(`${prefixCls}-button`, { [`${prefixCls}-button-active`]: isActive() })}
      ></div>
    </Trigger>
  );
};

export default SliderButton;
