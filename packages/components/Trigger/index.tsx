import { toArrayDom } from '../utils/toArray';
import { getBoundingClientRect } from './getPopupStyle';
import { TriggerProps } from './interface';
import { children, JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
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
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, ['trigger', 'popup', 'children']);
  let ref = null;
  const getChildren: () => JSX.Element = () => {
    let child = null;
    const doms = toArrayDom(local.children);
    if ((doms.length === 1 && ['string', 'number'].includes(typeof doms[0])) || doms.length > 1) {
      child = <span ref={el => (ref = el)}>{doms}</span>;
    } else {
      ref = doms[0];
      return doms[0];
    }
  };

  return <div></div>;
};

export default Trigger;
