import {
  createContext,
  createEffect,
  createSignal,
  mergeProps,
  ParentComponent,
  splitProps,
} from 'solid-js';
import { RadioGroupContextProps, RadioGroupProps } from './interface';
import cs from '../utils/classNames';
import Radio from './radio';
import { isArray, isObject } from '../utils';
const defaultContextValue: RadioGroupContextProps = {
  type: 'radio',
};
const defaultProps: RadioGroupProps = {
  type: 'radio',
  mode: 'outline',
  direction: 'horizontal',
};
const BASE_PREFIX = 'arco-radio';
export const RadioGroupContext = createContext<RadioGroupContextProps>(defaultContextValue);

const Group: ParentComponent<RadioGroupProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'children',
    'type',
    'disabled',
    'direction',
    'mode',
    'size',
    'defaultValue',
    'value',
    'name',
    'onChange',
    'options',
  ]);
  const [value, setValue] = createSignal(local.defaultValue);
  createEffect(() => {
    if (local.value === undefined) {
      if (local.defaultValue) {
        setValue(local.defaultValue);
      } else {
        setValue(undefined);
      }
    } else {
      setValue(local.value);
    }
  });

  const onChangeValue = (v: any, event: Event): void => {
    //  const { onChange } = props;
    if (v !== value()) {
      if (!('value' in props)) {
        setValue(v);
      }
      local.onChange && local.onChange(v, event);
    }
  };

  const mergeCls = () =>
    cs(
      `${BASE_PREFIX}-group`,
      {
        [`${BASE_PREFIX}-group-type-button`]: local.type !== 'radio',
        [`${BASE_PREFIX}-size-${local.size}`]: !!local.size,
        [`${BASE_PREFIX}-mode-${local.mode}`]: !!local.mode,
        [`${BASE_PREFIX}-group-disabled`]: local.disabled,
        [`${BASE_PREFIX}-group-direction-vertical`]: local.direction === 'vertical',
      },
      local.class
    );
  return (
    <RadioGroupContext.Provider
      value={{
        onChangeValue,
        type: local.type || 'radio',
        value: value,
        disabled: local.disabled,
        name: local.name,
        group: true,
      }}
    >
      <div class={mergeCls()} {...rest} role="radiogroup">
        {local.options && isArray(local.options)
          ? local.options.map(option => {
              if (isObject(option)) {
                return (
                  <Radio disabled={local.disabled || option.disabled} value={option.value}>
                    {option.label}
                  </Radio>
                );
              }
              return (
                <Radio value={option} disabled={local.disabled}>
                  {option}
                </Radio>
              );
            })
          : local.children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export default Group;
export type { RadioGroupProps, RadioGroupContextProps };
