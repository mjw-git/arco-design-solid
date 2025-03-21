import { mergeProps, ParentComponent, splitProps } from 'solid-js';
import Trigger from '../Trigger';
import { TooltipProps } from './interface';
import cs from '../utils/classNames';
const defaultProps: TooltipProps = {
  position: 'top',
  trigger: 'hover',
  escToClose: false,
  unmountOnExit: true,
  blurToHide: true,
  popupHoverStay: true,
};

const triggerDuration = {
  enter: 300,
  exit: 100,
};

const triggerPopupAlign = {
  left: 12,
  right: 12,
  top: 12,
  bottom: 12,
};
const Tooltip: ParentComponent<TooltipProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'style',
    'class',
    'children',
    'trigger',
    'escToClose',
    'defaultPopupVisible',
    'position',
    'unmountOnExit',
    'popupVisible',
    'prefixCls',
    'blurToHide',
    'popupHoverStay',
    'disabled',
    'onVisibleChange',
    'childrenPrefix',
    'getPopupContainer',
    'content',
    'mini',
    'color',
  ]);
  const prefixCls = local.prefixCls ?? 'arco-tooltip';
  const popupVisible = () => (local.content ? local.popupVisible : false);
  return (
    <Trigger
      popup={() => {
        return (
          <div
            style={{ 'background-color': local.color }}
            class={cs(`${prefixCls}-content`, `${prefixCls}-content-${local.position}`, {
              [`${prefixCls}-mini`]: local.mini,
            })}
            role="tooltip"
          >
            <div class={`${prefixCls}-content-inner`}>{local.content}</div>
          </div>
        );
      }}
      style={{
        'max-width': '350px',
        ...local.style,
      }}
      position={local.position}
      mouseEnterDelay={200}
      mouseLeaveDelay={200}
      popupHoverStay={local.popupHoverStay}
      showArrow
      onVisibleChange={local.onVisibleChange}
      trigger={local.trigger}
      getPopupContainer={local.getPopupContainer}
      escToClose={local.escToClose}
      blurToHide={local.blurToHide}
      popupVisible={popupVisible()}
      defaultPopupVisible={local.defaultPopupVisible}
      childrenPrefix={local.childrenPrefix || prefixCls}
      {...rest}
    >
      {local.children}
    </Trigger>
  );
};
export default Tooltip;
