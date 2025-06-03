import { createSignal, JSX, mergeProps, ParentComponent, Show, splitProps } from 'solid-js';
import { SwitchProps } from './interface';
import cs from '../utils/classNames';
import { IconLoading } from 'arco-solid-icon';
import handleEvent from '../utils/handleEvent';
const BASE_PREFIX = 'arco-switch';
const defaultProps: SwitchProps = {
  type: 'circle',
};

const Switch: ParentComponent<SwitchProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'disabled',
    'style',
    'type',
    'checkedText',
    'size',
    'disabled',
    'loading',
    'onChange',
    'checked',
    'checkedIcon',
    'uncheckedIcon',
    'uncheckedText',
    'onClick',
  ]);
  const [checked, setChecked] = createSignal(false);
  const mergedChecked = () => (local.checked !== undefined ? local.checked : checked());
  //   console.log(mergedChecked());

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      local.size === 'small' ? `${BASE_PREFIX}-${local.size}` : undefined,
      {
        [`${BASE_PREFIX}-type-${local.type}`]: local.type,
        [`${BASE_PREFIX}-checked`]: mergedChecked(),
        [`${BASE_PREFIX}-loading`]: local.loading,
        [`${BASE_PREFIX}-rtl`]: false,
      },
      local.class
    );

  const onHandleClick: JSX.EventHandlerUnion<
    HTMLButtonElement,
    MouseEvent,
    JSX.EventHandler<HTMLButtonElement, MouseEvent>
  > = (event: MouseEvent) => {
    if (local.loading) {
      return;
    }
    if (local.onClick) {
      handleEvent(event, local.onClick);
    }
    if (!('checked' in props)) {
      setChecked(!mergedChecked());
    }
    local.onChange && local.onChange(!mergedChecked(), event);
  };
  return (
    <button
      role="switch"
      aria-checked={!!mergedChecked()}
      tabIndex={local.loading ? -1 : undefined}
      {...rest}
      class={mergeCls()}
      style={local.style}
      onClick={onHandleClick}
      disabled={local.disabled}
      type="button"
    >
      <div class={`${BASE_PREFIX}-dot`}>
        {!local.loading && (local.checkedIcon || local.uncheckedIcon) && (
          <span class={`${BASE_PREFIX}-dot-icon`}>
            {mergedChecked() ? local.checkedIcon : local.uncheckedIcon}
          </span>
        )}

        {local.loading && (
          <span class={`${BASE_PREFIX}-dot-icon`}>
            <IconLoading />
          </span>
        )}
      </div>
      {local.size !== 'small' &&
        local.type !== 'line' &&
        (local.checkedText || local.uncheckedText) && (
          <>
            <div class={`${BASE_PREFIX}-text-holder`}>
              {local.checkedText && mergedChecked() && local.checkedText}
              {local.uncheckedText && !mergedChecked() && local.uncheckedText}
            </div>
            <div class={`${BASE_PREFIX}-text`}>
              {local.checkedText && mergedChecked() && local.checkedText}
              {local.uncheckedText && !mergedChecked() && local.uncheckedText}
            </div>
          </>
        )}
    </button>
  );
};
export default Switch;
