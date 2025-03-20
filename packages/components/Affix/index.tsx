import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  ParentComponent,
  Show,
  splitProps,
} from 'solid-js';
import { AffixProps } from './interface';
import { isFunction, isObject, isUndefined, isWindow } from '../utils';
import cs from '../utils/classNames';
import ResizeObserver from '../utils/resizeObserver';
import throttleByRaf from '../utils/throttleByRaf';
import { off, on } from '../utils/dom';
function getTargetRect(target: HTMLElement | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight,
      }
    : target.getBoundingClientRect();
}

type AffixHandle = {
  updatePosition: () => void;
};

const defaultProps = {
  offsetTop: 0,
  target: () => window,
};
const prefixCls = 'arco-affix';
const Affix: ParentComponent<AffixProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'style',
    'affixClassName',
    'affixStyle',
    'offsetTop',
    'offsetBottom',
    'target',
    'targetContainer',
    'children',
    'onChange',
  ]);

  const [state, setState] = createSignal<{
    status: 'MEASURE_DONE' | 'MEASURE_START';
    isFixed: boolean;
    sizeStyles: JSX.CSSProperties;
    fixedStyles: JSX.CSSProperties;
  }>({
    status: 'MEASURE_DONE',
    isFixed: false,
    sizeStyles: {},
    fixedStyles: {},
  });
  let lastIsFixed = state().isFixed;
  let wrapperRef: HTMLDivElement | null;
  let targetRef: HTMLElement | Window | null;
  const mergeCls = () => cs({ [prefixCls]: state().isFixed }, local.affixClassName);

  const updatePosition = throttleByRaf(() => {
    setState({
      status: 'MEASURE_START',
      isFixed: false,
      fixedStyles: {},
      sizeStyles: {},
    });
  });
  createEffect(() => {
    const status = state().status;
    if (status !== 'MEASURE_START' || !wrapperRef || !targetRef) return;
    const offsetType = isUndefined(local.offsetBottom) ? 'top' : 'bottom';
    const wrapperRect = wrapperRef.getBoundingClientRect();
    const targetRect = getTargetRect(targetRef);
    let newIsFixed = false;
    let newFixedStyles = {};
    if (offsetType === 'top') {
      newIsFixed = wrapperRect.top - targetRect.top < (local.offsetTop || 0);
      newFixedStyles = newIsFixed
        ? {
            position: 'fixed',
            top: `${targetRect.top + (local.offsetTop || 0)}px`,
          }
        : {};
    } else {
      newIsFixed = targetRect.bottom - wrapperRect.bottom < (local.offsetBottom || 0);
      newFixedStyles = newIsFixed
        ? {
            position: 'fixed',
            bottom: `${window.innerHeight - targetRect.bottom + (local.offsetBottom || 0)}px`,
          }
        : {};
    }
    const newSizeStyles = newIsFixed
      ? {
          width: wrapperRef.offsetWidth + 'px',
          height: wrapperRef.offsetHeight + 'px',
        }
      : {};
    setState({
      status: 'MEASURE_DONE',
      isFixed: newIsFixed,
      sizeStyles: newSizeStyles,
      fixedStyles: { ...newFixedStyles, ...newSizeStyles },
    });
    if (newIsFixed !== lastIsFixed) {
      lastIsFixed = newIsFixed;
      isFunction(local.onChange) && local.onChange(newIsFixed);
    }
  });

  createEffect(() => {
    targetRef = local.target && isFunction(local.target) ? local.target() : null;
    if (targetRef) {
      on(targetRef, 'scroll', updatePosition);
      on(targetRef, 'resize', updatePosition);
    }
  });

  onCleanup(() => {
    if (targetRef) {
      off(targetRef, 'scroll', updatePosition);
      off(targetRef, 'resize', updatePosition);
    }
    updatePosition.cancel();
  });

  createEffect(() => {
    updatePosition.cancel();
    local.target, local.targetContainer, local.offsetTop, local.offsetBottom, updatePosition();
  });

  return (
    <ResizeObserver getTargetDomNode={() => wrapperRef}>
      <div ref={el => (wrapperRef = el)} style={local.style} class={local.class} {...rest}>
        <Show when={state().isFixed}>
          <div style={state().sizeStyles} />
        </Show>
        <div
          class={mergeCls()}
          style={{
            ...state().fixedStyles,
            ...(isObject(local.affixStyle) ? local.affixStyle : {}),
          }}
        >
          <ResizeObserver onResize={updatePosition}>{local.children || <span />}</ResizeObserver>
        </div>
      </div>
    </ResizeObserver>
  );
};
export default Affix;
