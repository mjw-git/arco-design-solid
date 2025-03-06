import { createSignal, ParentComponent, Show, splitProps } from 'solid-js';
import { InputComponentProps } from './interface';
import { isObject } from '../utils';
import handleEvent from '../utils/handleEvent';
import { Enter } from '../utils/keycode';
import cs from '../utils/classNames';
import { IconClose } from 'arco-solid-icon';
import IconHover from '../_class/icon-hover';
import useKeyboardEvent from '../hooks/useKeyboardEvent';

const InputComponent: ParentComponent<InputComponentProps> = props => {
  const [local, rest] = splitProps(props, [
    'value',
    'onChange',
    'maxLength',
    'onKeyDown',
    'onPressEnter',
    'hasParent',
    'normalize',
    'normalizeTrigger',
    'readOnly',
    'onBlur',
    'class',
    'allowClear',
    'prefixCls',
    'size',
    'status',
    'disabled',
    'autoFitWidth',
    'clearIcon',
    'onClear',
    'style',
    'height',
    'error',
    'showWordLimit',
    'defaultValue',
    'addBefore',
    'addAfter',
    'afterStyle',
    'beforeStyle',
    'prefix',
    'suffix',
    'normalize',
    'normalizeTrigger',
    'autoWidth',
  ]);
  let inputRef: HTMLInputElement;
  const [compositionValue, setCompositionValue] = createSignal<string | undefined>('');

  const getKeyboardEvents = useKeyboardEvent();
  let isComposition = false;
  const maxLength = () =>
    isObject(local.maxLength)
      ? local.maxLength.errorOnly
        ? undefined
        : local.maxLength.length
      : local.maxLength;

  const triggerValueChangeCallback = (newValue: string, e: any) => {
    if (
      local.onChange &&
      newValue !== local.value &&
      (maxLength() === undefined || newValue.length <= maxLength()!)
    ) {
      local.onChange(newValue, e);
    }
  };

  const compositionHandler = (e: any) => {
    isComposition = e.type !== 'compositionend';
    if (!isComposition) {
      setCompositionValue(undefined);
      triggerValueChangeCallback(e.target.value, e);
    }
  };

  const valueChangeHandler = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const newValue = e.target.value;
    if (!isComposition) {
      compositionValue() && setCompositionValue(undefined);
      triggerValueChangeCallback(newValue, e);
    } else {
      isComposition = false;
      setCompositionValue(newValue);
    }
  };

  const onBlur = (
    e: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    handleEvent(e, local.onBlur);
    local.normalizeTrigger?.includes('onBlur') &&
      local.normalize &&
      triggerValueChangeCallback(local.normalize(compositionValue() || ''), e);
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    const keyCode = e.keyCode || e.which;
    if (!isComposition) {
      local.onKeyDown && handleEvent(e, local.onKeyDown);
      if (keyCode === Enter.code) {
        local.onPressEnter && handleEvent(e);
        if ((local.normalizeTrigger || ['onBlur']).includes('onPressEnter')) {
          local.normalize &&
            triggerValueChangeCallback(local.normalize(compositionValue() || ''), e);
        }
      }
    }
  };
  const mergeCls = () =>
    cs(
      local.prefixCls,
      local.prefixCls && {
        [`${local.prefixCls}-size-${local.size}`]: local.size,
        [`${local.prefixCls}-${local.status}`]: local.status,
        [`${local.prefixCls}-disabled`]: local.disabled,
        [`${local.prefixCls}-autowidth`]: local.autoFitWidth,
      },
      local.hasParent ? undefined : local.class
    );
  const handleClear = (e: Event) => {
    if (inputRef && inputRef.focus) {
      inputRef.focus();
    }
    triggerValueChangeCallback('', e);
    local.onClear?.();
  };
  const inputProps = () => ({
    'aria-invalid': local.status === 'error' || undefined,
    readOnly: local.readOnly,
    disabled: local.disabled,
    maxLength: maxLength(),
    class: mergeCls(),
    value: compositionValue() || local.value || '',
    onBlur: onBlur,
    onKeyDown: keyDownHandler,
    onCompositionEnd: compositionHandler,
    onCompositionStart: compositionHandler,
    onCompositionUpdate: compositionHandler,
    oninput: valueChangeHandler,
  });
  console.log(inputProps(), local.prefixCls);

  return local.allowClear ? (
    <>
      <input ref={el => (inputRef = el)} {...rest} {...inputProps()}></input>
      <Show when={!local.readOnly && !local.disabled && local.allowClear && local.value}>
        {local.clearIcon !== undefined ? (
          <span
            tabIndex={0}
            class={`${local.prefixCls}-clear-icon`}
            //   {...getKeyboardEvents({ onPressEnter: handleClear })}
            onClick={e => {
              e.stopPropagation();
              handleClear(e);
            }}
            onMouseDown={e => {
              e.preventDefault();
            }}
          >
            {local.clearIcon}
          </span>
        ) : (
          <IconHover
            tabIndex={0}
            class={`${local.prefixCls}-clear-icon`}
            {...getKeyboardEvents({ onPressEnter: handleClear })}
            onClick={e => {
              e.stopPropagation();
              handleClear(e);
            }}
          >
            <IconClose
              // keep focus status
              onMouseDown={e => {
                e.preventDefault();
              }}
            />
          </IconHover>
        )}
      </Show>
    </>
  ) : (
    <input
      ref={el => (inputRef = el)}
      {...rest}
      {...inputProps()}
      style={
        local.hasParent
          ? {}
          : {
              'min-width': isObject(local.autoFitWidth)
                ? local.autoFitWidth['min-width']
                : undefined,
              'max-width': isObject(local.autoFitWidth)
                ? local.autoFitWidth['max-width']
                : undefined,
              ...local.style,
              ...('height' in props
                ? { height: typeof local.height === 'string' ? local.height : local.height + 'px' }
                : {}),
            }
      }
    />
  );
};
export default InputComponent;
