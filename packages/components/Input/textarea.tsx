import { createEffect, createSignal, JSX, ParentComponent, Show, splitProps } from 'solid-js';
import { TextAreaProps } from './interface';
import { isObject } from '../utils';
import { formatValue } from './input';
import handleEvent from '../utils/handleEvent';
import cs from '../utils/classNames';
import omit from '../utils/omit';
import IconHover from '../_class/icon-hover';
import { IconClose } from 'arco-solid-icon';
import autoSizeTextAreaHeight from './autoSizeTextAreaHeight';
const BASE_PREFIX = 'arco-textarea';
const TextArea: ParentComponent<TextAreaProps> = props => {
  const [local, rest] = splitProps(props, [
    'class',
    'style',
    'wrapperStyle',
    'placeholder',
    'disabled',
    'error',
    'maxLength',
    'showWordLimit',
    'allowClear',
    'onChange',
    'onClear',
    'onKeyDown',
    'onPressEnter',
    'status',
    'clearIcon',
  ]);
  let isComposition = false;
  let textareaRef: HTMLTextAreaElement;

  const maxLength = () =>
    isObject(local.maxLength)
      ? local.maxLength.errorOnly
        ? undefined
        : local.maxLength.length
      : local.maxLength;
  const wordLimitMaxLength = () =>
    isObject(local.maxLength) ? local.maxLength.length : local.maxLength;

  const withWrapper = () => (wordLimitMaxLength() && local.showWordLimit) || local.allowClear;

  const [textAreaStyle, setTextAreaStyle] = createSignal<JSX.CSSProperties>({});
  console.log(props.defaultValue);
  const [value, setValue] = createSignal(
    'defaultValue' in props ? formatValue(props.defaultValue, maxLength()) : undefined
  );
  const [compositionValue, setCompositionValue] = createSignal('');

  createEffect(() => {
    if ('value' in props) {
      setValue(formatValue(props.value, maxLength()));
    } else {
      setValue(formatValue(props.defaultValue, maxLength()));
    }
  });

  const triggerValueChangeCallback = (newValue: string, e: any) => {
    if (
      !('value' in props) &&
      (maxLength() === undefined || newValue.length <= (maxLength() || 0))
    ) {
      setValue(newValue);
    }
    if (
      local.onChange &&
      newValue !== props.value &&
      (maxLength() === undefined || newValue.length <= maxLength()!)
    ) {
      local.onChange(newValue, e);
    }
  };

  const valueChangeHandler = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    }
  ) => {
    const newValue = e.target.value;
    console.log(newValue, 'new');

    if (!isComposition) {
      compositionValue() && setCompositionValue('');
      triggerValueChangeCallback(newValue, e);
    } else {
      isComposition = false;
      setCompositionValue(newValue);
    }
  };

  const compositionHandler = (e: any) => {
    isComposition = e.type !== 'compositionend';
    if (!isComposition) {
      setCompositionValue('');
      triggerValueChangeCallback(e.target.value, e);
    }
  };

  const keyDownHandler = (e: any) => {
    if (!isComposition) {
      local.onKeyDown && handleEvent(e, local.onKeyDown);
    }
  };

  const inputProps = () => ({
    placeholder: local.placeholder,
    disabled: local.disabled,
    maxLength: maxLength(),
    style: { ...local.style, ...textAreaStyle() },
    class: local.class,
    value: compositionValue() || value() || '',
    onKeyDown: keyDownHandler,
    onCompositionEnd: compositionHandler,
    onCompositionStart: compositionHandler,
    onCompositionUpdate: compositionHandler,
    oninput: valueChangeHandler,
  });
  const lengthError = () => {
    if (!maxLength && wordLimitMaxLength()) {
      return (value() ?? '').length > wordLimitMaxLength()!;
    }
    return false;
  };
  const inputStatus = () => local.status || (local.error || lengthError() ? 'error' : undefined);

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-${inputStatus()}`]: inputStatus(),
        // [`${prefixCls}-error`]: error || lengthError || status === 'error',
        [`${BASE_PREFIX}-disabled`]: local.disabled,
      },
      local.class
    );

  const onFocus = () => {
    if (textareaRef && !!textareaRef.focus) {
      if (textareaRef.setSelectionRange) {
        const caretPos = textareaRef.textContent?.length || 0;
        textareaRef.setSelectionRange(caretPos, caretPos);
      }
      textareaRef.focus();
    }
  };

  const resizeTextAreaHeight = () => {
    const textAreaStyle = autoSizeTextAreaHeight(props.autoSize, textareaRef);

    if (textAreaStyle) {
      setTextAreaStyle(textAreaStyle);
    }
  };

  const handleClearClick = (e: Event) => {
    e.stopPropagation();
    onFocus();
    triggerValueChangeCallback('', e);
    local.onClear?.();
  };
  createEffect(() => {
    const _ = compositionValue() || value();

    resizeTextAreaHeight();
  });
  const textAreaElement = () => {
    return (
      <textarea
        ref={el => (textareaRef = el)}
        {...omit(rest, ['autoSize', 'defaultValue'])}
        class={mergeCls()}
        {...inputProps}
      ></textarea>
    );
  };
  const showClearIcon = () => !local.disabled && local.allowClear && value();

  const inputElement = () => {
    if (withWrapper()) {
      return (
        <div
          class={cs(`${BASE_PREFIX}-wrapper`, {
            [`${BASE_PREFIX}-clear-wrapper`]: local.allowClear,
          })}
        >
          {textAreaElement()}
          <Show when={showClearIcon()}>
            {local.clearIcon !== undefined ? (
              <span
                class={`${BASE_PREFIX}-clear-icon`}
                onClick={handleClearClick}
                onMouseDown={e => {
                  e.preventDefault();
                }}
              >
                {local.clearIcon}
              </span>
            ) : (
              <IconHover
                class={`${BASE_PREFIX}-clear-icon`}
                onClick={handleClearClick}
                onMouseDown={e => {
                  e.preventDefault();
                }}
              >
                <IconClose />
              </IconHover>
            )}
          </Show>
          <Show when={wordLimitMaxLength() && local.showWordLimit}>
            <span
              class={cs(`${BASE_PREFIX}-word-limit`, {
                [`${BASE_PREFIX}-word-limit-error`]: lengthError(),
              })}
            >
              {value()?.length || 0}/{wordLimitMaxLength()}
            </span>
          </Show>
        </div>
      );
    }
    return textAreaElement();
  };
  return inputElement();
};
export default TextArea;
