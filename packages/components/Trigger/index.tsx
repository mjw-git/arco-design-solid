import { Transition } from 'solid-transition-group';
import { toArrayDom } from '../utils/toArray';
import getStyle, { getBoundingClientRect } from './getPopupStyle';
import { MouseLocationType, TriggerProps } from './interface';
import ResizeObserverPolyfill from 'resize-observer-polyfill';

import {
  children,
  createComponent,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  onMount,
  ParentComponent,
  splitProps,
} from 'solid-js';
import ResizeObserverComponent from '../utils/resizeObserver';
import throttleByRaf from '../utils/throttleByRaf';
import { Portal, style } from 'solid-js/web';
import { isFunction, isObject } from '../utils';
import { contains, getScrollElements, isScrollElement, off, on } from '../utils/dom';
import { caf } from '../utils/raf';
import cs from '../utils/classNames';
import { Esc } from '../utils/keycode';

const BASE_PREFIX = 'arco-trigger';
export type EventsByTriggerNeedType =
  | 'onClick'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onMouseMove'
  | 'onFocus'
  | 'onBlur'
  | 'onContextMenu'
  | 'onKeyDown';

function getDOMPos(
  dom: HTMLElement,
  options: {
    boundaryDistance: TriggerProps['boundaryDistance'];
    position: TriggerProps['position'];
  }
) {
  if (!dom) {
    return {};
  }
  const { width, height, left, right } = getBoundingClientRect(dom, options);
  return {
    width,
    height,
    left,
    right,
  };
}
function splitChildrenStyle(
  obj: JSX.CSSProperties,
  keys: (keyof JSX.CSSProperties)[]
): { picked: JSX.CSSProperties; omitted: JSX.CSSProperties } {
  const picked: JSX.CSSProperties = {};
  const omitted: JSX.CSSProperties = { ...obj };
  keys.forEach((key: keyof JSX.CSSProperties) => {
    if (obj && key in obj) {
      picked[key as any] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
}

const defaultProps = {
  blurToHide: true,
  // clickToClose: true,
  class: 'fadeIn',
  trigger: 'hover' as const,
  position: 'bottom' as const,
  duration: 200,
  unmountOnExit: true,
  popupAlign: {},
  popupHoverStay: true,
  clickOutsideToClose: true,
  escToClose: false,
  mouseLeaveToClose: true,
  containerScrollToClose: false,
  getDocument: () => window.document as any,
  autoFixPosition: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  autoFitPosition: true,
};

const Trigger: ParentComponent<TriggerProps> = props => {
  let triggerRef: HTMLSpanElement;
  let popupContainer: HTMLDivElement;
  let rootElementRef: HTMLElement;
  let arrowStyle: JSX.CSSProperties;
  let handleClickOutside: boolean = false;
  let hasPopupMouseDown = false;
  let observerContainer: HTMLElement | null;
  let handleWindowResize: boolean;
  let updatePositionTimer: any = null;
  let childrenDom = null;
  let delayTimer: any = null;
  let mousedownToHide = false;
  let mouseDownTimeout: any;

  let childrenDomSize: ReturnType<typeof getDOMPos> = {};
  let scrollElements: (HTMLElement | Window)[] | null = [];

  let unmount = false;
  let rafId = 0;
  let isDidMount = false;
  let realPosition: string;
  let triggerRefDestoried: boolean = false;
  const merge = mergeProps(defaultProps, props);
  //   const [local, rest] = splitProps(merge, [
  //     'trigger',
  //     'popup',
  //     'children',
  //     'defaultPopupVisible',
  //     'style',
  //     'getPopupContainer',
  //   ]);
  let mouseLocation: MouseLocationType = {
    clientX: 0,
    clientY: 0,
  };
  const [popupStyle, setPopupStyle] = createSignal<JSX.CSSProperties>({});
  const [popupVisible, setPopupVisible] = createSignal(merge.defaultPopupVisible);
  createEffect(() => {
    if ('popupVisible' in props) {
      setPopupVisible(props.popupVisible);
    }
  });

  const onMouseMove = (e: any) => {
    triggerPropsEvent('onMouseMove', e);
    setMouseLocation(e);
    if (popupVisible()) {
      update();
    }
  };
  const onMouseEnter = (e: any) => {
    const mouseEnterDelay = merge.mouseEnterDelay;
    triggerPropsEvent('onMouseEnter', e);
    clearDelayTimer();
    handleSetPopupVisible(true, mouseEnterDelay || 0);
  };
  const onKeyDown = (e: { keyCode: any; which: any }) => {
    const keyCode = e.keyCode || e.which;
    triggerPropsEvent('onKeyDown', e);
    if (keyCode === Esc.code) {
      onPressEsc(e);
    }
  };

  const onPressEsc = (e: { key: string }) => {
    const escToClose = merge.escToClose;
    if (escToClose && e && e.key === Esc.key && popupVisible()) {
      handleSetPopupVisible(false);
    }
  };

  createEffect(() => {
    // const dom = getChildren();

    // rootElementRef.addEventListener('click', onClick);
    if (isHoverTrigger() && !merge.disabled) {
      rootElementRef.addEventListener('mouseenter', onMouseEnter);
      rootElementRef.addEventListener('mouseleave', onMouseLeave);
      if (isClickToHide()) {
        rootElementRef.addEventListener('click', clickToHidePopup);
      }
      if (merge.alignPoint) {
        rootElementRef.addEventListener('mousemove', onMouseMove);
      }
    }
    if (isContextMenuTrigger() && !merge.disabled) {
      rootElementRef.addEventListener('contextmenu', onContextMenu);
      rootElementRef.addEventListener('click', clickToHidePopup);
    }
    if (isClickTrigger() && !merge.disabled) {
      rootElementRef.addEventListener('click', onClick);
    }
    if (isFocusTrigger() && !merge.disabled) {
      rootElementRef.addEventListener('focus', onFocus);
      if (isBlurToHide()) {
        rootElementRef.addEventListener('blur', onBlur);
      }
    }
    if (!merge.disabled) {
      rootElementRef.addEventListener('keydown', onKeyDown);
    }
    if (merge.childrenPrefix && popupVisible()) {
      rootElementRef.className = rootElementRef.className
        ? `${rootElementRef.className} ${merge.childrenPrefix}-open`
        : `${merge.childrenPrefix}-open`;
    }
    if (isFocusTrigger()) {
      rootElementRef.setAttribute('tabindex', merge.disabled ? '-1' : '0');
    }
  });

  const isClickTrigger = () => {
    const trigger = merge.trigger;
    return ([].concat(trigger as any) as string[]).indexOf('click') > -1;
  };

  const isFocusTrigger = () => {
    const trigger = merge.trigger;
    return [].concat(trigger).indexOf('focus') > -1;
  };
  const isBlurToHide = () => {
    return isFocusTrigger() && merge.blurToHide;
  };
  const isHoverTrigger = () => {
    const trigger = merge.trigger;
    return [].concat(trigger).indexOf('hover') > -1;
  };

  const isMouseLeaveToClose = () => {
    return isHoverTrigger() && merge.mouseLeaveToClose;
  };

  const isPopupHoverHide = () => {
    return isHoverTrigger() && !merge.popupHoverStay;
  };
  const isContextMenuTrigger = () => {
    const trigger = merge.trigger;
    return [].concat(trigger).indexOf('contextMenu') > -1;
  };

  const showPopup = (callback: () => void = () => {}) => {
    const popupStyle = getPopupStyle();
    setPopupStyle(() => {
      callback?.();
      return popupStyle ?? {};
    });
  };
  //TODO:
  const triggerPropsEvent = (eventName: EventsByTriggerNeedType, e: any) => {
    // const child: any = null;
    // const childHandler = child && child.props && child.props[eventName];

    const propsHandler = merge?.[eventName];

    // if (isFunction(childHandler)) {
    //   childHandler(e);
    // }
    if (isFunction(propsHandler)) {
      propsHandler(e);
    }
    return propsHandler;
  };

  const clickToHidePopup = (e: any) => {
    if (popupVisible()) {
      mousedownToHide = true;
    }

    // triggerPropsEvent('onClick', e);

    if (isClickToHide() && popupVisible) {
      handleSetPopupVisible(!popupVisible, 0);
    }
  };

  const onContextMenu = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    triggerPropsEvent('onContextMenu', e);
    setMouseLocation(e);

    if (!popupVisible()) {
      handleSetPopupVisible(true, 0);
    } else {
      // 更新位置
      merge.alignPoint && update();
    }
  };

  const setMouseLocation = (e: { clientX: any; clientY: any }) => {
    if (merge.alignPoint) {
      mouseLocation = {
        clientX: e.clientX,
        clientY: e.clientY,
      };
    }
  };

  const onClick = (e: any) => {
    if (popupVisible()) {
      mousedownToHide = true;
    }
    triggerPropsEvent('onClick', e);
    setMouseLocation(e);
    if (isClickToHide() && popupVisible()) {
      return;
    }
    handleSetPopupVisible(!popupVisible(), 0);
  };

  const onFocus = (e: any) => {
    const focusDelay = merge.focusDelay;
    const onFocus = () => {
      triggerPropsEvent('onFocus', e);
    };

    clearDelayTimer();
    if (!mousedownToHide) {
      if (popupVisible()) {
        onFocus?.();
      } else {
        handleSetPopupVisible(true, focusDelay || 0, onFocus);
      }
    }
    mousedownToHide = false;
  };

  const onBlur = (e: any) => {
    handleSetPopupVisible(false, 200, () => triggerPropsEvent('onBlur', e));
  };

  const isClickToHide = () => {
    if (isClickTrigger() || isContextMenuTrigger()) {
      const clickToClose = 'clickToClose' in merge ? merge.clickToClose : true;
      return clickToClose;
    }
    // 2.44.0 及之前版本 clickToClose 对 hover触发不生效。
    // 2.44.1 之后只有在props直接传入clickToClose 时才生效于 hover 触发方式，避免如以下用法前后表现不一致
    // <Trigger><Trigger trigger="click"><button>sss</button></a></Trigger></Trigger>
    return isHoverTrigger() && props.clickToClose;
  };

  const handleSetPopupVisible = (visible: boolean, delay = 0, callback?: () => void) => {
    const onVisibleChange = merge.onVisibleChange;
    if (visible !== popupVisible()) {
      delayToDo(delay, () => {
        onVisibleChange && onVisibleChange(visible);
        if (!('popupVisible' in merge)) {
          if (visible) {
            setPopupVisible(() => {
              showPopup(callback);
              return true;
            });
          } else {
            setPopupVisible(() => {
              showPopup(callback);
              return false;
            });
          }
        } else {
          callback?.();
        }
      });
    } else {
      callback?.();
    }
  };

  const onClickOutside = (e: { target: any }) => {
    const onClickOutside = merge.onClickOutside;
    const clickOutsideToClose = merge.clickOutsideToClose;
    //   const { onClickOutside, clickOutsideToClose } = this.getMergedProps([
    //     'onClickOutside',
    //     'clickOutsideToClose',
    //   ]);
    const triggerNode = triggerRef;
    const childrenDom = rootElementRef;

    if (
      !contains(triggerNode, e.target) &&
      !contains(childrenDom, e.target) &&
      !hasPopupMouseDown
    ) {
      onClickOutside?.();
      if (clickOutsideToClose) {
        // 以下判断条件避免onVisibleChange触发两次
        // blurToHide 为true时不需要执行，因为onBlur里会执行setPopupVisible
        // hover 触发方式，不执行以下逻辑。因为mouseLeave里会执行setPopupVisible
        if (!isBlurToHide() && !isHoverTrigger()) {
          handleSetPopupVisible(false);
        }
      }
    }
  };
  const handleUpdatePosition = throttleByRaf(() => {
    updatePopupPosition();
  });
  let resizeObserver = new ResizeObserverPolyfill(() => {
    handleUpdatePosition();
  });

  const offClickOutside = () => {
    if (handleClickOutside) {
      const clickOutsideToClose = merge.clickOutsideToClose;
      const getDocument = merge.getDocument;

      const root = isFunction(getDocument) && (getDocument as Function)();

      off(root, 'mousedown', onClickOutside, {
        capture: isObject(clickOutsideToClose) ? clickOutsideToClose.capture : false,
      });
      handleClickOutside = false;
    }
  };
  const offContainerResize = () => {
    if (resizeObserver && observerContainer) {
      resizeObserver.unobserve(observerContainer);
      observerContainer = null;
    }
  };
  const onContainerResize = () => {
    // containerParent 相当于是通过getPopupContainer传入的节点
    // 因为 this.popupContainer 会被挂载到getPopupContainer返回的节点上
    const containerParent = popupContainer?.parentNode;
    if (resizeObserver && observerContainer !== containerParent) {
      // 说明containerParent变了，取消之前的监听，监听新的container
      offContainerResize();
      containerParent && resizeObserver.observe(containerParent as HTMLElement);
      observerContainer = containerParent as HTMLElement;
    }
  };

  const offWindowResize = () => {
    handleWindowResize = false;
    off(window, 'resize', handleUpdatePosition);
  };

  const handleScroll = () => {
    if (props.containerScrollToClose) {
      handleSetPopupVisible(false);
    } else if (props.updateOnScroll) {
      handleUpdatePosition();
    }
  };

  const getRootElement = (): HTMLElement => {
    childrenDom = rootElementRef;
    return childrenDom;
  };

  const onContainersScroll = (props: TriggerProps) => {
    if (scrollElements) {
      return;
    }
    scrollElements = getScrollElements(
      rootElementRef,
      popupContainer?.parentNode as HTMLDivElement
    );

    // 弹出层挂载载 body 且 body 不是滚动元素时，需要额外检测 document.documentElement 是否是滚动元素
    // 默认 html,body 不限制宽高时，滚动事件仅能在 window 上监听
    // fix: https://github.com/arco-design/arco-design/issues/1599
    if (
      props.containerScrollToClose &&
      popupContainer?.parentNode === document.body &&
      scrollElements.indexOf(document.body) === -1 &&
      isScrollElement(document.documentElement)
    ) {
      scrollElements.push(window);
    }

    scrollElements.forEach(item => {
      on(item, 'scroll', handleScroll);
    });
  };

  const offScrollListeners = () => {
    (scrollElements || []).forEach(item => {
      off(item, 'scroll', handleScroll);
    });
    scrollElements = null;
  };

  createEffect(() => {
    if (popupVisible()) {
      update();
    }
    if (!popupVisible()) {
      offClickOutside();
      offContainerResize();
      offWindowResize();
      offScrollListeners();
      return;
    }
    const rect = getDOMPos(rootElementRef, {
      boundaryDistance: props.alignPoint ? {} : props.boundaryDistance,
      position: props.position,
    });
    if (JSON.stringify(rect) !== JSON.stringify(childrenDomSize)) {
      updatePopupPosition();
      childrenDomSize = rect;
    }
    onContainerResize();
    if (props.updateOnScroll || props.containerScrollToClose) {
      onContainersScroll(props);
    }
    if (!handleWindowResize) {
      on(window, 'resize', handleUpdatePosition);
      handleWindowResize = true;
    }
    if (!handleClickOutside) {
      const root = isFunction(merge.getDocument) && (merge.getDocument as Function)();
      if (root) {
        // clickOutside 必须监听mousedown。
        // 1. 如果事件目标元素在click后被移除，document.onclick被触发时已经没有该元素，会错误触发clickOutside逻辑，隐藏popup。
        // 2. 点击label标签，会触发对应input元素的点击事件，导致触发clickOutside，隐藏popup。
        on(root, 'mousedown', onClickOutside, {
          capture: isObject(props.clickOutsideToClose) ? props.clickOutsideToClose.capture : false,
        });
        handleClickOutside = true;
      }
    }
  });

  const clearTimer = () => {
    if (updatePositionTimer) {
      if (updatePositionTimer.cancel) {
        updatePositionTimer.cancel();
      } else {
        clearTimeout(updatePositionTimer);
        updatePositionTimer = null;
      }
    }
    if (delayTimer) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
    if (mouseDownTimeout) {
      clearTimeout(mouseDownTimeout);
      mouseDownTimeout = null;
    }
  };

  const onPopupMouseDown = () => {
    hasPopupMouseDown = true;

    clearTimeout(mouseDownTimeout);
    mouseDownTimeout = setTimeout(() => {
      hasPopupMouseDown = false;
    }, 0);
  };

  const clearDelayTimer = () => {
    if (delayTimer) {
      clearTimeout(delayTimer);
      delayTimer = null;
    }
  };

  const delayToDo = (delay: number, callback: () => void) => {
    if (delay) {
      clearDelayTimer();
      delayTimer = setTimeout(() => {
        callback();
        clearDelayTimer();
      }, delay);
    } else {
      callback();
    }
  };

  onCleanup(() => {
    unmount = true;
    offClickOutside();
    clearTimer();
    offWindowResize();
    offScrollListeners();
    offContainerResize();
    caf(rafId);
  });

  const appendToContainer = (node: HTMLDivElement) => {
    cancelAnimationFrame(rafId);
    if (isDidMount) {
      const getGlobalPopupContainer = (el?: Element) => document.body;
      const getPopupContainer = merge.getPopupContainer;
      const gpc = getPopupContainer || getGlobalPopupContainer;

      const rootElement = rootElementRef;

      const parent = gpc(rootElement);
      if (parent) {
        parent.appendChild(node);

        return;
      }
    }
    rafId = requestAnimationFrame(() => {
      appendToContainer(node);
    });
  };
  onCleanup(() => {
    if (popupContainer) {
      popupContainer.remove();
    }
  });
  const getContainer = () => {
    // const container = document.querySelector('#arco-solid-trigger-wrapper');
    // if (container) {
    //   return;
    // }
    const _popupContainer = document.createElement('div');
    _popupContainer.setAttribute('id', 'arco-solid-trigger-wrapper');
    _popupContainer.style.width = '100%';
    _popupContainer.style.position = 'absolute';
    _popupContainer.style.top = '0';
    _popupContainer.style.left = '0';
    popupContainer = _popupContainer;
    appendToContainer(popupContainer);

    return popupContainer;
  };
  onMount(() => {
    getContainer();
    isDidMount = true;
    unmount = false;
    if (popupVisible()) {
      getDOMPos(rootElementRef, {
        boundaryDistance: merge.boundaryDistance,
        position: merge.position,
      });
    }
  });
  const childList = children(() => merge.children)
    .toArray()
    .map(item => {
      if (typeof item === 'function') {
        return createComponent(item, {});
      }
      return item;
    });
  const getChildren: () => HTMLElement = () => {
    let child = null;
    const doms = toArrayDom(merge.children).filter(Boolean);
    if ((doms.length === 1 && ['string', 'number'].includes(typeof doms[0])) || doms.length > 1) {
      child = <span ref={el => (rootElementRef = el)}>{doms}</span>;
      return child as HTMLElement;
    } else {
      //   alert('dd');
      rootElementRef = doms[0] as HTMLElement;

      return doms[0] as HTMLElement;
    }
  };
  const isExistChildren = () => childList.length > 0;
  const childrenComponent = () =>
    isExistChildren() ? (
      <ResizeObserverComponent
        onResize={() => {
          onResize();
        }}
        getTargetDomNode={() => {
          return rootElementRef;
        }}
      >
        {getChildren()}
      </ResizeObserverComponent>
    ) : null;
  const getTransformOrigin = (position: string) => {
    const content = triggerRef as HTMLElement;
    if (!content) return {};
    const showArrow = props.showArrow;
    const classNames = props.classNames;

    let top = (showArrow && arrowStyle?.top) || 0;
    let left = (showArrow && arrowStyle?.left) || 0;
    top = top ? `${top}px` : '';
    left = left ? `${left}px` : '';

    const transformOrigin = {
      top: `${left || '50%'} 100% 0`,
      tl: `${left || '15px'} 100% 0`,
      tr: `${left || `${content.clientWidth - 15}px`} 100% 0`,
      bottom: `${left || '50%'} 0 0`,
      bl: `${left || '15px'} 0 0`,
      br: `${left || `${content.clientWidth - 15}px`} 0 0`,
      left: `100% ${top || '50%'} 0`,
      lt: `100% ${top || '15px'} 0`,
      lb: `100% ${top || `${content.clientHeight - 15}px`} 0`,
      right: `0 ${top || '50%'} 0`,
      rt: `0 ${top || '15px'} 0`,
      rb: `0 ${top || `${content.clientHeight - 15}px`} 0`,
    };

    // tooltip popover popconfirm
    if (classNames && classNames.indexOf('zoom') > -1) {
      return {
        transformOrigin: transformOrigin[position],
      };
    }
    if (classNames === 'slideDynamicOrigin') {
      let origin = '0% 0%';
      if (['top', 'tl', 'tr'].indexOf(position) > -1) {
        origin = '100% 100%';
      }
      return {
        transformOrigin: origin,
      };
    }
    return {};
  };
  const getPopupStyle = () => {
    if (unmount || !popupContainer) {
      return;
    }
    const mountContainer = popupContainer;
    const content = triggerRef;
    const child = rootElementRef;
    if (!child.offsetParent && !child.getClientRects().length) {
      return popupStyle();
    }
    const {
      style,
      arrowStyle: _arrowStyle,
      realPosition: _realPosition,
    } = getStyle(merge, content, child, mountContainer, mouseLocation);
    realPosition = _realPosition || (props.position as string);
    arrowStyle = _arrowStyle || {};
    return {
      ...style,
      ...getTransformOrigin(realPosition),
    };
  };

  const update = throttleByRaf(callback => {
    if (unmount || popupVisible()) {
      return;
    }
    const popupStyle = getPopupStyle();
    setPopupStyle(popupStyle ?? {});
  });
  const updatePopupPosition = (delay = 0, callback?: () => void) => {
    if (!popupVisible()) {
      return;
    }
    if (delay < 4) {
      updatePositionTimer = update(callback);
      return;
    }
    updatePositionTimer = setTimeout(() => {
      const popupStyle = getPopupStyle();
      setPopupStyle(popupStyle ?? {});
    }, delay);
  };
  const onResize = () => {
    if (props.autoFixPosition && popupVisible()) {
      updatePopupPosition();
    }
  };

  const onMouseLeave = (e: any) => {
    const mouseLeaveDelay = merge.mouseLeaveDelay;
    clearDelayTimer();
    triggerPropsEvent('onMouseLeave', e);
    if (isMouseLeaveToClose()) {
      if (popupVisible()) {
        handleSetPopupVisible(false, mouseLeaveDelay || 0);
      }
    }
  };

  const onPopupMouseEnter = () => {
    clearDelayTimer();
  };
  const onPopupMouseLeave = (e: any) => {
    onMouseLeave(e);
  };

  const popupClassName = () =>
    cs(BASE_PREFIX, merge.childrenPrefix, `${BASE_PREFIX}-position-${merge.position}`, merge.class);

  const popupEventProps = () => {
    const popupProps: any = {
      onMouseDown: onPopupMouseDown,
    };
    if (!isPopupHoverHide()) {
      popupProps.onMouseEnter = onPopupMouseEnter;
      popupProps.onMouseLeave = onPopupMouseLeave;
    }
    return popupProps;
  };

  const portalContent = () => {
    return (
      <Transition
        name="zoomInBottom"
        appear
        onEnter={(el, done) => {
          const a = el.animate([{ opacity: 0.2 }, { opacity: 1 }], {
            duration: 200,
          });
          a.finished.then(done);
          //   triggerRefDestoried = false;
          //   if (triggerRef) {
          //     triggerRef.style.display = 'initial';
          //     triggerRef.style.pointerEvents = 'none';
          //   }
        }}
      >
        {popupVisible() && (
          <ResizeObserverComponent
            getTargetDomNode={() => triggerRef}
            onResize={() => {
              if (triggerRef) {
                const popupStyle = getPopupStyle();
                triggerRef.style.top = merge.style?.top
                  ? `${merge.style.top}px`
                  : `${popupStyle?.top || 0}px`;
                triggerRef.style.left = merge.style?.left
                  ? `${merge.style.left}px`
                  : `${popupStyle?.left || 0}px`;
              }
              onResize();
            }}
          >
            <span
              ref={el => (triggerRef = el)}
              style={{
                width:
                  merge.autoAlignPopupWidth && merge.style?.width === undefined
                    ? childrenDomSize?.width + 'px'
                    : '',
                ...popupStyle(),
                position: 'absolute',
                ...merge.style,
              }}
              class={popupClassName()}
              {...popupEventProps()}
            >
              {merge.popup?.()}
              {(merge.showArrow || merge.arrowProps) && (
                <div
                  class={cs(`${BASE_PREFIX}-arrow-container`, {
                    [`${merge.childrenPrefix}-arrow-container`]: merge.childrenPrefix,
                  })}
                >
                  <div
                    {...merge.arrowProps}
                    class={cs(
                      `${BASE_PREFIX}-arrow`,
                      {
                        [`${merge.childrenPrefix}-arrow`]: merge.childrenPrefix,
                      },
                      merge.arrowProps?.class
                    )}
                    style={{ ...arrowStyle, ...(merge.arrowProps?.style as JSX.CSSProperties) }}
                  />
                </div>
              )}
            </span>
          </ResizeObserverComponent>
        )}
      </Transition>
    );
  };

  const portal = () => {
    return popupVisible() && !triggerRefDestoried ? (
      <Portal mount={popupContainer}>{portalContent()}</Portal>
    ) : //   <Portal mount={popupContainer}>111{portalContent()}</Portal>
    null;
  };

  return childList.length > 0 ? (
    <>
      {childrenComponent()}
      {portal()}
    </>
  ) : (
    portal()
  );
};

export default Trigger;
