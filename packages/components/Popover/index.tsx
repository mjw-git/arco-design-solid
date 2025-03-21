import { mergeProps, ParentComponent, splitProps } from 'solid-js';
import { PopoverProps } from './interface';
import { isFunction } from '../utils';
import cs from '../utils/classNames';
import Tooltip from '../Tooltip';
const defaultProps: PopoverProps = {
  position: 'top',
  trigger: 'hover',
  unmountOnExit: true,
};
const prefixCls = 'arco-popover';
const Popover: ParentComponent<PopoverProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'style',
    'class',
    'children',
    'position',
    'getPopupContainer',
    'trigger',
    'defaultPopupVisible',
    'popupVisible',
    'triggerProps',
    'unmountOnExit',
    'onVisibleChange',
    'content',
    'title',
  ]);

  const title = () => (isFunction(local.title) ? local.title() : local.title);
  const content = () => (isFunction(local.content) ? local.content() : local.content);

  const renderContent = () => {
    if (!title() && !content()) {
      return null;
    }
    return (
      <div class={cs(`${prefixCls}-inner`)}>
        {title() ? <div class={`${prefixCls}-title`}>{title()}</div> : null}
        <div class={`${prefixCls}-inner-content`}>{content()}</div>
      </div>
    );
  };

  return (
    <Tooltip
      {...rest}
      style={{
        'max-width': '350px',
        ...local.style,
      }}
      class={local.class}
      prefixCls={prefixCls}
      getPopupContainer={local.getPopupContainer}
      position={local.position}
      trigger={local.trigger}
      content={renderContent()}
      popupHoverStay
      unmountOnExit={local.unmountOnExit}
      triggerProps={local.triggerProps}
      defaultPopupVisible={local.defaultPopupVisible}
      onVisibleChange={
        local.onVisibleChange ||
        (local.triggerProps ? local.triggerProps.onVisibleChange : undefined)
      }
      childrenPrefix={prefixCls}
      {...('popupVisible' in props ? { popupVisible: local.popupVisible } : {})}
    >
      {local.children}
    </Tooltip>
  );
};
export default Popover;
