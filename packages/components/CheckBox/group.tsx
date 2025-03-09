import { Accessor, createContext, createSignal, For, JSX, mergeProps, splitProps } from 'solid-js';
import { CheckboxGroupProps } from './interface';
import useMergeValue from '../hooks/useMergeValue';
import cs from '../utils/classNames';
import Checkbox from './checkbox';
import { isObject } from '../utils';
const BASE_PREFIX = 'arco-checkbox';
const defaultContextValue = {
  isCheckboxGroup: false,
  checkboxGroupValue: () => [],
  onGroupChange: () => {},
  registerValue: () => {},
  unRegisterValue: () => {},
};
export const CheckGroupContext = createContext<{
  disabled?: boolean;
  isCheckboxGroup: boolean;
  onGroupChange: (_optionValue: string | number, _checked: boolean, e: Event) => void;
  checkboxGroupValue: Accessor<Array<string | number> | undefined>;
  registerValue: (value: string | number) => void;
  unRegisterValue: (value: string | number) => void;
}>(defaultContextValue);

const Group: <T extends string | number>(
  props: CheckboxGroupProps<T> & { children?: JSX.Element }
) => JSX.Element = props => {
  const [value, setValue] = useMergeValue([], {
    defaultValue: props.defaultValue,
    value: () => props.value,
  });
  const merge = mergeProps({ direction: 'horizontal' }, props);
  const [local, rest] = splitProps(merge, [
    'error',
    'direction',
    'class',
    'options',
    'disabled',
    'children',
    'onChange',
  ]);
  const [allOptionValues, setAllOptionValues] = createSignal<(string | number)[]>([]);

  const mergeCls = () =>
    cs(
      `${BASE_PREFIX}-group`,
      {
        [`${BASE_PREFIX}-group-is-error`]: local.error,
        [`${BASE_PREFIX}-group-direction-${local.direction}`]: local.direction,
      },
      local.class
    );

  const onChange = (optionValue: any, checked: boolean, e: Event) => {
    const newVal = (value() ?? []).slice();
    if (checked) {
      newVal.push(optionValue);
    } else {
      newVal.splice((value() ?? []).indexOf(optionValue), 1);
    }

    setValue(newVal);

    local.onChange &&
      local.onChange(
        newVal.filter(v => allOptionValues().indexOf(v) > -1),
        e
      );
  };
  return (
    <span class={mergeCls()} {...rest}>
      <CheckGroupContext.Provider
        value={{
          isCheckboxGroup: true,
          checkboxGroupValue: value,
          onGroupChange: onChange,
          disabled: local.disabled,
          registerValue: value => {
            setAllOptionValues(allOptionValues => {
              return Array.from(new Set([...allOptionValues, value]));
            });
          },
          unRegisterValue: value => {
            setAllOptionValues(allOptionValues => {
              return allOptionValues.filter(x => x !== value);
            });
          },
        }}
      >
        {Array.isArray(local.options) ? (
          <For each={local.options}>
            {option => {
              const label = isObject(option) ? option.label : option;
              const checkValue = isObject(option) ? option.value : option;
              const icon = isObject(option) ? option.icon : undefined;
              return (
                <Checkbox
                  disabled={local.disabled || (isObject(option) && option.disabled)}
                  value={checkValue}
                  icon={icon}
                >
                  {label}
                </Checkbox>
              );
            }}
          </For>
        ) : (
          local.children
        )}
      </CheckGroupContext.Provider>
    </span>
  );
};
export default Group;
