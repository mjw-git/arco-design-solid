import { JSX, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { BadgeProps } from './interface';
import cs from '../utils/classNames';
import { Transition } from 'solid-transition-group';
import { isNumber, isObject } from '../utils';
import Count from './count';
const BASE_PREFIX = 'arco-badge';
const InnerColors = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const defaultProps: BadgeProps = {
  count: 0,
  maxCount: 99,
};

const Badge: ParentComponent<BadgeProps> = props => {
  const mergedProps = mergeProps({ ...defaultProps }, props);
  const [local, rest] = splitProps(mergedProps, [
    'class',
    'children',
    'rtl',
    'dotStyle',
    'offset',
    'count',
    'dotClassName',
    'color',
    'text',
    'status',
    'dot',
    'maxCount',
  ]);
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-status`]: local.status,
        [`${BASE_PREFIX}-no-children`]: !local.children,
        [`${BASE_PREFIX}-rtl`]: local.rtl,
      },
      local.class
    );
  const dotStyle = () => {
    const style: JSX.CSSProperties = { ...local.dotStyle };
    const [leftOffset, topOffset] = local.offset || [];
    if (leftOffset) {
      style['margin-left'] = `-${leftOffset}px`;
    }
    if (topOffset) {
      style['margin-top'] = `${topOffset}px`;
    }
    return style;
  };
  const getDom = () => {
    if (!isNumber(local.count)) {
      return (
        <span class={cs(`${BASE_PREFIX}-custom-dot`, local.dotClassName)} style={dotStyle()}>
          {local.count}
        </span>
      );
    }
    const colorStyle =
      !local.color || InnerColors.indexOf(local.color) > -1
        ? {}
        : { 'background-color': local.color };

    // display a red dot if color and status are NOT set
    if (local.text && !local.color && !local.status) {
      return (
        <span class={cs(`${BASE_PREFIX}-text`, local.dotClassName)} style={dotStyle()}>
          {local.text}
        </span>
      );
    }
    if (local.status || (local.color && typeof local.count === 'number' && local.count <= 0)) {
      return (
        <span class={`${BASE_PREFIX}-status-wrapper`}>
          <span
            class={cs(
              `${BASE_PREFIX}-status-dot`,
              {
                [`${BASE_PREFIX}-status-${local.status}`]: local.status,
                [`${BASE_PREFIX}-color-${local.color}`]: local.color,
              },
              local.dotClassName
            )}
            style={{ ...colorStyle, ...dotStyle() }}
          />
          {local.text && <span class={`${BASE_PREFIX}-status-text`}>{local.text}</span>}
        </span>
      );
    }
    if ((local.dot || local.color) && typeof local.count === 'number' && local.count > 0) {
      return (
        <Transition
          appear
          onEnter={(el, done) => {
            const a = el.animate([{ scale: 0.2 }, { scale: 1 }], {
              duration: 200,
            });
            a.finished.then(done);
          }}
        >
          <span
            class={cs(
              `${BASE_PREFIX}-dot`,
              {
                [`${BASE_PREFIX}-color-${local.color}`]: local.color,
              },
              local.dotClassName
            )}
            style={{ ...colorStyle, ...dotStyle() }}
          ></span>
        </Transition>
      );
    }
    return (
      <Count
        class={cs(`${BASE_PREFIX}-number`, local.dotClassName)}
        style={{ ...colorStyle, ...dotStyle() }}
        maxCount={local.maxCount}
        count={local.count}
      />
    );
  };
  return (
    <div class={mergeCls()} {...rest}>
      {local.children}
      {getDom()}
    </div>
  );
};
export default Badge;
