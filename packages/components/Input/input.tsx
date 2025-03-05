import { createEffect, createSignal, JSX, ParentComponent, splitProps } from 'solid-js';
import { InputProps } from './interface';
import { isObject, isString, isUndefined } from '../utils';
import cs from '../utils/classNames';
import InputComponent from './input-element';
import handleEvent from '../utils/handleEvent';

const BASE_PREFIX = 'arco-input';

const Input: ParentComponent<InputProps> = props => {
  const formatValue = (value: string | undefined | null, maxLength?: number) => {
    const str =
      value !== null && !isUndefined(value) && !isString(value) ? String(value) : value || '';
    if (maxLength) {
      return str.slice(0, maxLength);
    }
    return str;
  };
  const [local, rest] = splitProps(props, [
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
  ]);
  const trueMaxLength = () =>
    isObject(local.maxLength) ? local.maxLength.length : local.maxLength;
  const mergedMaxLength = () => {
    return isObject(local.maxLength) && local.maxLength.errorOnly ? undefined : trueMaxLength();
  };

  const [focus, setFocus] = createSignal(false);
  const [value, setValue] = createSignal(
    'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength()) : undefined
  );
  createEffect(() => {
    setValue(local.value !== undefined ? formatValue(local.value, mergedMaxLength()) : undefined);
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
          {valueLength() / trueMaxLength()!}
        </span>
      );
    }
    return local.suffix;
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
  const needWrapper = () => local.addBefore || local.addAfter || local.suffix || local.prefix;
  const inputElement = () => (
    <InputComponent
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
      onChange={onChange}
    />
  );
  return <div></div>;
};
export default Input;
