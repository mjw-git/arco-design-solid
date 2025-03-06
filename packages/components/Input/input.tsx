import { createEffect, createSignal, JSX, ParentComponent, splitProps } from 'solid-js';
import { InputProps } from './interface';
import { isObject, isString, isUndefined } from '../utils';
import cs from '../utils/classNames';
import InputComponent from './input-element';
import handleEvent from '../utils/handleEvent';
import { contains } from '../utils/dom';

const BASE_PREFIX = 'arco-input';
export const formatValue = (value: string | undefined | null, maxLength?: number) => {
  const str =
    value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || '';
  if (maxLength) {
    return str.slice(0, maxLength);
  }
  return str;
};
const Input: ParentComponent<InputProps> = props => {
  let inputWrapperRef: HTMLSpanElement;
  let inputRef: HTMLInputElement;
  let rootNodeRef: HTMLDivElement | HTMLSpanElement;

  const [local] = splitProps(props, [
    'addAfter',
    'maxLength',
    'autoWidth',
    'value',
    'addBefore',
    'suffix',
    'prefix',
    'size',
    'disabled',
    'height',
    'class',
    'autoWidth',
    'showWordLimit',
    'status',
    'onFocus',
    'onBlur',
    'error',
    'style',
    'onChange',
    'allowClear',
    'beforeStyle',
    'afterStyle',
  ]);
  const trueMaxLength = () =>
    isObject(local.maxLength) ? local.maxLength.length : local.maxLength;
  const mergedMaxLength = () => {
    return isObject(local.maxLength) && local.maxLength.errorOnly ? undefined : trueMaxLength();
  };
  const isCustomHeight = () => 'height' in props;
  const [focus, setFocus] = createSignal(false);
  const [value, setValue] = createSignal(
    'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength()) : undefined
  );

  createEffect(() => {
    if (local.value === undefined) {
      if (props.defaultValue) {
        setValue(formatValue(props.defaultValue, mergedMaxLength()));
      }
    } else {
      setValue(local.value);
    }
  });

  const autoWidth = () =>
    local.autoWidth
      ? {
          'min-width': '0px',
          'max-width': '100%',
          ...(isObject(local.autoWidth) ? local.autoWidth : {}),
        }
      : null;

  const mergeCls = () =>
    cs(
      `${BASE_PREFIX}-group-wrapper`,
      `${BASE_PREFIX}-group-wrapper-${local.size}`,
      {
        [`${BASE_PREFIX}-custom-height`]: local.height !== undefined,
        [`${BASE_PREFIX}-has-suffix`]: local.suffix,
        [`${BASE_PREFIX}-group-wrapper-disabled`]: local.disabled,
        [`${BASE_PREFIX}-group-wrapper-autowidth`]: autoWidth(),
      },
      local.class
    );
  const valueLength = () => (value() ?? '').length;
  const lengthError = () => {
    if (!mergedMaxLength() && trueMaxLength()) {
      return valueLength() > trueMaxLength()!;
    }
    return false;
  };
  const suffixElement = () => {
    if (trueMaxLength() && local.showWordLimit) {
      return (
        <span
          class={cs(`${BASE_PREFIX}-word-limit`, {
            [`${BASE_PREFIX}-word-limit-error`]: lengthError(),
          })}
        >
          {valueLength()} / {trueMaxLength()!}
        </span>
      );
    }
    return local.suffix;
  };
  const inputAddon = (
    className: string,
    node: JSX.Element,
    style?: JSX.CSSProperties,
    onClick?: (e: Event) => void
  ): JSX.Element | null => {
    return node ? (
      <span style={style} class={className} onClick={onClick}>
        {node}
      </span>
    ) : null;
  };

  const mergeStyle = () =>
    ({
      'min-width': autoWidth()?.['min-width'],
      'max-width': autoWidth()?.['max-width'],
      width: autoWidth() && 'auto',
      ...local.style,
    }) as JSX.CSSProperties;
  const onChange = (value: string, e: any) => {
    if (!('value' in props)) {
      setValue(value);
    }
    local.onChange && local.onChange(value, e);
  };

  const status = () => local.status || (local.error || lengthError() ? 'error' : undefined);
  const needWrapper = () => local.addBefore || local.addAfter || suffixElement() || local.prefix;

  const inputElement = () => (
    <InputComponent
      ref={el => (inputRef = el)}
      {...props}
      autoFitWidth={!!local.autoWidth}
      style={mergeStyle()}
      status={status()}
      prefixCls={BASE_PREFIX}
      onFocus={e => {
        setFocus(true);
        handleEvent(e, local.onFocus);
      }}
      hasParent={!!needWrapper() || local.allowClear}
      onBlur={e => {
        setFocus(false);
        handleEvent(e, local.onBlur);
      }}
      value={value()}
      size={local.size}
      onChange={onChange}
    />
  );

  const innerWrapperClassnames = () =>
    cs(`${BASE_PREFIX}-inner-wrapper`, {
      [`${BASE_PREFIX}-inner-wrapper-${status}`]: status(),
      [`${BASE_PREFIX}-inner-wrapper-disabled`]: local.disabled,
      [`${BASE_PREFIX}-inner-wrapper-focus`]: focus(),
      [`${BASE_PREFIX}-inner-wrapper-has-prefix`]: local.prefix,
      [`${BASE_PREFIX}-inner-wrapper-${local.size}`]: local.size,
      [`${BASE_PREFIX}-clear-wrapper`]: local.allowClear,
    });

  return needWrapper() ? (
    <div
      ref={el => (rootNodeRef = el)}
      class={mergeCls()}
      style={{
        ...mergeStyle(),
        ...(isCustomHeight()
          ? { height: typeof local.height === 'number' ? local.height + 'px' : local.height }
          : {}),
      }}
    >
      <span class={`${BASE_PREFIX}-group`}>
        {inputAddon(`${BASE_PREFIX}-group-addbefore`, local.addBefore, local.beforeStyle)}
        <span
          class={innerWrapperClassnames()}
          ref={el => (inputWrapperRef = el)}
          onMouseDown={e => {
            // 直接的点击input的时候，不阻止默认行为，避免无法选中输入框里的输入文本
            if ((e.target as HTMLElement).tagName !== 'INPUT') {
              // 当使用React.Portal挂载的组件（tooltip, popover等）放在prefix，suffix里是，弹层中的内容无法被选中。
              // contains 判断如果不包含在当前dom节点，则不阻止默认行为。
              if (inputWrapperRef && contains(inputWrapperRef, e.target)) {
                e.preventDefault();
              }
            }
          }}
          onClick={e => {
            // 当使用React.Portal挂载的组件（tooltip, popover等）放在prefix，suffix里时，弹出层被点击时，不应该focus input。
            if (inputWrapperRef && contains(inputWrapperRef, e.target)) {
              inputRef && inputRef.focus();
            }
          }}
        >
          {inputAddon(`${BASE_PREFIX}-group-prefix`, local.prefix)}
          {inputElement()}
          {inputAddon(`${BASE_PREFIX}-group-suffix`, suffixElement())}
        </span>
        {inputAddon(`${BASE_PREFIX}-group-addafter`, local.addAfter, local.afterStyle)}
      </span>
    </div>
  ) : local.allowClear ? (
    <span
      ref={el => (rootNodeRef = el)}
      class={cs(local.class, innerWrapperClassnames())}
      style={{
        ...local.style,
        ...(isCustomHeight()
          ? { height: typeof local.height === 'number' ? local.height + 'px' : local.height }
          : {}),
      }}
      onMouseDown={e => {
        e.target.tagName !== 'INPUT' && e.preventDefault();
      }}
      onClick={() => {
        inputRef && inputRef.focus();
      }}
    >
      {inputElement()}
    </span>
  ) : (
    inputElement()
  );
};

export default Input;
