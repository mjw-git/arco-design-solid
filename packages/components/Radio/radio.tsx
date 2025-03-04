import { Component, createEffect, createSignal, JSX, splitProps, useContext } from 'solid-js';
import { childrenType, RadioProps } from './interface';
import cs from '../utils/classNames';
import { RadioGroupContext } from './group';
import { isFunction, isNullOrUndefined } from '../utils';
import handleEvent from '../utils/handleEvent';
import IconHover from '../_class/icon-hover';
const BASE_PREFIX = 'arco-radio';
type ParentProps<P = {}> = P & { children?: JSX.Element | childrenType };
const Radio: Component<ParentProps<RadioProps>> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'disabled',
    'checked',
    'onChange',
    'onClick',
    'children',
    'value',
    'checked',
    'defaultChecked',
  ]);
  const context = useContext(RadioGroupContext);

  const mergeChecked = () => (context?.group ? context.value() === local.value : local.checked);

  const mergeDisabled = () =>
    context?.group ? ('disabled' in props ? props.disabled : context.disabled) : local.disabled;
  const [checked, setChecked] = createSignal(
    'defaultChecked' in props ? local.defaultChecked : false
  );

  createEffect(() => {
    setChecked(mergeChecked());
  });

  //   const [checked,setChecked]=
  let inputRef: HTMLInputElement;
  const mergeCls = () =>
    cs(
      `${BASE_PREFIX}${context.type === 'button' ? '-button' : ''}`,
      {
        [`${BASE_PREFIX}-checked`]: checked(),
        [`${BASE_PREFIX}-disabled`]: mergeDisabled(),
      },
      local.class
    );

  const onLabelClick = (e: MouseEvent) => {
    if (isFunction(local.children)) {
      e.preventDefault();
      inputRef && inputRef.click();
    }
    handleEvent(e, local.onClick);
  };

  const onChange = (event: Event) => {
    if (local.disabled) {
      return;
    }
    if (context.group) {
      context.onChangeValue && context.onChangeValue(local.value, event);
    } else if (!('checked' in props) && !checked()) {
      setChecked(true);
    }
    !checked() && local.onChange && local.onChange(true, event);
  };

  return (
    <label {...rest} onClick={onLabelClick} class={mergeCls()}>
      <input
        disabled={mergeDisabled()}
        value={local.value || ''}
        ref={el => (inputRef = el)}
        type="radio"
        {...(context.name ? { name: context.name } : {})}
        checked={checked()}
        onChange={onChange}
        onClick={e => {
          e.stopPropagation();
        }}
      />
      {isFunction(local.children) ? (
        local.children({ checked: checked })
      ) : context.type === 'radio' ? (
        <>
          <IconHover
            prefix={BASE_PREFIX}
            class={`${BASE_PREFIX}-mask-wrapper`}
            disabled={checked() || mergeDisabled()}
          >
            <div class={`${BASE_PREFIX}-mask`} />
          </IconHover>
          {!isNullOrUndefined(local.children) && (
            <span class={`${BASE_PREFIX}-text`}>{local.children}</span>
          )}
        </>
      ) : (
        context.type === 'button' && (
          <span class={`${BASE_PREFIX}-button-inner`}>{local.children}</span>
        )
      )}
    </label>
  );
};
export default Radio;
