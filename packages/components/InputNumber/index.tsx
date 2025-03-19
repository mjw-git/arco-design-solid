import {
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  ParentComponent,
  splitProps,
} from 'solid-js';
import { InputNumberProps, InputNumberValueChangeReason } from './interface';
import { isNumber } from '../utils';
import { Decimal, getDecimal } from './Decimal';
import cs from '../utils/classNames';
import Input from '../Input';
import { IconDown, IconMinus, IconPlus, IconUp } from 'arco-solid-icon';
import { InputProps } from '../Input/interface';
import { ArrowDown, ArrowUp } from '../utils/keycode';
import handleEvent from '../utils/handleEvent';

type StepMethods = 'minus' | 'plus';

const defaultProps: InputNumberProps = {
  max: Infinity,
  min: -Infinity,
  step: 1,
  mode: 'embed',
  parser: input => input?.replace(/[^\w\.-]+/g, '') || '',
};
const BASE_PREFIX = 'arco-input-number';
const InputNumber: ParentComponent<InputNumberProps> = props => {
  const merge = mergeProps(defaultProps, props);
  let metaOrControl = false;
  const [local, rest] = splitProps(merge, [
    'class',
    'style',
    'defaultValue',
    'disabled',
    'error',
    'readOnly',
    'strictMode',
    'placeholder',
    'hideControl',
    'suffix',
    'prefix',
    'icons',
    'mode',
    'size',
    'step',
    'precision',
    'min',
    'max',
    'parser',
    'formatter',
    'onBlur',
    'onFocus',
    'onChange',
    'onKeyDown',
  ]);

  const mergedPrecision = () => {
    if (isNumber(local.precision)) {
      const decimal = `${local.step}`.split('.')[1];
      const stepPrecision = (decimal && decimal.length) || 0;
      return Math.max(stepPrecision, local.precision);
    }
    return undefined;
  };

  const [innerValue, setInnerValue] = createSignal(getDecimal(local.defaultValue));
  createEffect(() => {
    if ('value' in props && props.value) {
      setInnerValue(getDecimal(props.value));
    }
  });

  const [inputValue, setInputValue] = createSignal('');
  const [isOutOfRange, setIsOutOfRange] = createSignal(false);
  const [isUserTyping, setIsUserTyping] = createSignal(false);
  let refAutoTimer: any = null;
  let refHasOperateSincePropValueChanged = false;
  let refInput: HTMLInputElement | null = null;

  const value = () => ('value' in props ? getDecimal(props.value!) : innerValue());
  const memoDecimal = () => {
    return [getDecimal(local.max!), getDecimal(local.min!)];
  };

  const setValue = (newValue: Decimal, reason: InputNumberValueChangeReason) => {
    setInnerValue(newValue);
    if (!newValue.equals(value()) && local.onChange) {
      const newValueStr = newValue.toString({ safe: true, precision: mergedPrecision() });
      local.onChange(
        newValue.isEmpty
          ? undefined
          : local.strictMode
            ? (newValueStr as any)
            : newValue.isNaN
              ? NaN
              : Number(newValueStr),
        reason
      );
    }
  };

  const stop = () => {
    refAutoTimer && clearTimeout(refAutoTimer);
    refAutoTimer = null;
  };

  const getLegalValue = (changedValue: Decimal) => {
    let finalValue = changedValue;
    const maxDecimal = memoDecimal()[0];
    const minDecimal = memoDecimal()[1];

    if (finalValue.less(minDecimal)) {
      finalValue = minDecimal;
    } else if (maxDecimal.less(finalValue)) {
      finalValue = maxDecimal;
    }

    return finalValue;
  };

  onCleanup(() => {
    stop();
  });

  createEffect(() => {
    props.value, (refHasOperateSincePropValueChanged = true);
  });

  const inputEventHandlers: Partial<InputProps> = {
    onChange: (rawText, event: any) => {
      setIsUserTyping(true);
      rawText = rawText.trim().replace(/。/g, '.');
      const parsedValue = local.parser ? local.parser(rawText) : rawText;

      if (isNumber(+parsedValue) || parsedValue === '-' || !parsedValue || parsedValue === '.') {
        setInputValue(rawText);
        setValue(getLegalValue(getDecimal(parsedValue)), 'manual');
        //  updateSelectionRangePosition(event);
      } else {
        if (rawText.length > 1 && inputValue().length === 0) {
          event.target.value = '';
          setInputValue('');
        } else {
          const str = rawText.substring(0, rawText.length - 1);
          event.target.value = str;
          setInputValue(str);
        }
      }
    },
    onKeyUp: e => {
      metaOrControl = false;
      props.onKeyUp && handleEvent(e, props.onKeyUp);
    },
    onKeyDown: e => {
      const key = e.key;
      if (key === ArrowDown.key) {
        e.stopPropagation();
        handleArrowKey(e, 'minus');
      } else if (key === ArrowUp.key) {
        e.stopPropagation();
        handleArrowKey(e, 'plus');
      }

      local.onKeyDown?.(e as any);
    },
    onFocus: e => {
      refHasOperateSincePropValueChanged = true;
      setInputValue(refInput?.value || '');
      local.onFocus?.(e);
    },
    onBlur: e => {
      setValue(getLegalValue(value()!), 'outOfRange');
      setIsUserTyping(false);
      local.onBlur?.(e);
    },
  };

  const displayedInputValue = () => {
    let _value: string;
    if (isUserTyping()) {
      _value = local.parser ? `${local.parser(inputValue())}` : inputValue();
    } else if (isNumber(mergedPrecision())) {
      _value = value()!.toString({ safe: true, precision: mergedPrecision() });
    } else if (value()!.isInvalid) {
      _value = '';
    } else {
      _value = value()!.toString();
    }

    return local.formatter
      ? local.formatter(_value, { userTyping: isUserTyping(), input: inputValue() })
      : _value;
  };
  createEffect(() => {
    console.log(displayedInputValue(), 'effect');
  });

  createEffect(() => {
    const maxDecimal = memoDecimal()[0];
    const minDecimal = memoDecimal()[1];
    const _isOutOfRange = value()?.less(minDecimal) || maxDecimal?.less(value()!);

    // Don't correct the illegal value caused by prop value. Wait for user to take actions.
    if (_isOutOfRange && refHasOperateSincePropValueChanged) {
      setValue(getLegalValue(value()!), 'outOfRange');
    }

    setIsOutOfRange(_isOutOfRange);
  });

  const handleArrowKey = (event: Event, method: StepMethods, needRepeat = false) => {
    event.preventDefault();
    setIsUserTyping(false);

    if (local.disabled || local.readOnly) {
      return;
    }

    const finalValue = value()?.isInvalid
      ? getDecimal(local.min === -Infinity || (local.min! <= 0 && local.max! >= 0) ? 0 : local.min)
      : value()?.add(method === 'plus' ? local.step! : -local.step!);

    setValue(getLegalValue(finalValue!), method === 'plus' ? 'increase' : 'decrease');
    refInput && refInput.focus();

    // auto change while holding
    // if (needRepeat) {
    //   const isFirstRepeat = refAutoTimer === null;
    //   refAutoTimer = setTimeout(
    //     () => event.target.dispatchEvent(event.nativeEvent),
    //     isFirstRepeat ? AUTO_CHANGE_START_DELAY : AUTO_CHANGE_INTERVAL
    //   );
    // }
  };

  const shouldRenderButton = () => !local.hideControl && local.mode === 'button';
  const shouldRenderLayer = () => !local.hideControl && !local.readOnly && local.mode === 'embed';

  const getControlButtonEventsHandlers = (method: StepMethods) => {
    return local.readOnly
      ? {}
      : {
          onMouseDown: (e: Event) => handleArrowKey(e, method, true),
        };
  };

  const renderStepButton = (method: StepMethods, icon: JSX.Element) => {
    const minDecimal = memoDecimal()[1];
    const maxDecimal = memoDecimal()[0];
    const isStepButtonValid =
      !local.disabled &&
      (value()?.isInvalid ||
        (method === 'plus'
          ? maxDecimal.isInvalid || value()?.less(maxDecimal)
          : minDecimal.isInvalid || minDecimal.less(value()!)));
    return (
      <div
        class={cs(`${BASE_PREFIX}-step-button`, {
          [`${BASE_PREFIX}-step-button-disabled`]: !isStepButtonValid,
        })}
        onMouseLeave={stop}
        onMouseUp={stop}
        {...(isStepButtonValid ? getControlButtonEventsHandlers(method) : {})}
      >
        {icon}
      </div>
    );
  };
  return (
    <Input
      ref={el => (refInput = el)}
      role="spinbutton"
      aria-valuemax={local.max}
      aria-valuemin={local.min}
      aria-valuenow={value()?.isEmpty ? undefined : value()?.toNumber()}
      {...inputEventHandlers}
      {...rest}
      style={local.style}
      class={cs(
        BASE_PREFIX,
        `${BASE_PREFIX}-mode-${local.mode}`,
        `${BASE_PREFIX}-size-${local.size || 'default'}`,
        {
          [`${BASE_PREFIX}-readonly`]: local.readOnly,
          [`${BASE_PREFIX}-illegal-value`]: !value()?.isEmpty && isOutOfRange(),
        },
        local.class
      )}
      size={local.size}
      error={local.error}
      disabled={local.disabled}
      readOnly={local.readOnly}
      placeholder={local.placeholder}
      prefix={local.prefix && <div class={`${BASE_PREFIX}-prefix`}>{local.prefix}</div>}
      suffix={
        <>
          {shouldRenderLayer() && (
            <div class={`${BASE_PREFIX}-step-layer`}>
              {renderStepButton(
                'plus',
                local.icons && local.icons.up ? local.icons.up : <IconUp />
              )}
              {renderStepButton(
                'minus',
                local.icons && local.icons.down ? local.icons.down : <IconDown />
              )}
            </div>
          )}
          {local.suffix && <div class={`${BASE_PREFIX}-suffix`}>{local.suffix}</div>}
        </>
      }
      value={displayedInputValue()}
      addBefore={
        shouldRenderButton() &&
        renderStepButton(
          'minus',
          local.icons && local.icons.minus ? local.icons.minus : <IconMinus />
        )
      }
      addAfter={
        shouldRenderButton() &&
        renderStepButton('plus', local.icons && local.icons.plus ? local.icons.plus : <IconPlus />)
      }
    ></Input>
  );
};
export default InputNumber;
