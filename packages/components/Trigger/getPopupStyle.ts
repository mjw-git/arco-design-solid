import { TriggerProps } from './interface';
const defaultBoundaryDistanceValue = 0;

export const getBoundingClientRect = (
  dom: HTMLElement,
  options: {
    boundaryDistance?: TriggerProps['boundaryDistance'];
    position: TriggerProps['position'];
  }
) => {
  const { position } = options;
  const { width, height, left, right, top, bottom } = dom.getBoundingClientRect();
  const boundaryDistance = options.boundaryDistance || {};

  const boundaryDistanceLeft =
    ('left' in boundaryDistance && boundaryDistance.left) || defaultBoundaryDistanceValue;

  const boundaryDistanceTop =
    ('top' in boundaryDistance && boundaryDistance.top) || defaultBoundaryDistanceValue;

  let _left;
  let _right;
  let _top;
  let _bottom;

  if (['bottom', 'bl', 'br'].indexOf(position!) > -1) {
    _top = top;
    _bottom = bottom; // y 的偏移量会体现在windowHeight 上
  } else {
    _top = top - boundaryDistanceTop;
    _bottom = bottom - boundaryDistanceTop;
  }

  if (['right', 'rt', 'rb'].indexOf(position!) > -1) {
    _left = left; // x 偏移量会体现在windowWidth 上
    _right = right;
  } else {
    _left = left - boundaryDistanceLeft;
    _right = right - boundaryDistanceLeft;
  }

  return {
    width,
    height,
    left: _left,
    right: _right,
    top: _top,
    bottom: _bottom,
  };
};
