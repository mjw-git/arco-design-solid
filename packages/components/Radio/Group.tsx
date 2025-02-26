import { For, Show, createEffect, createSignal } from 'solid-js';
import { GroupContext } from './GroupContext';
import { RadioGroupProps, RadioGroupValueType } from './interface';
// import { FlexBox, Radio } from '..';
import FlexBox from '../FlexBox';
import Radio from '.';

const Group: RadioGroupProps = props => {
  const [value, setValue] = createSignal<RadioGroupValueType>();

  createEffect(() => {
    setValue(props.value);
  });

  const handleOnChange = (_value: RadioGroupValueType) => {
    setValue(_value);
    props.onChange?.(_value);
  };

  const formatOptions = () =>
    props.options?.map(item => (typeof item !== 'object' ? { label: item, value: item } : item));

  return (
    <GroupContext.Provider
      value={{
        groupValue: value,
        onGroupValueChange: handleOnChange,
      }}
    >
      <FlexBox wrap="wrap">
        <Show when={props.options} fallback={props.children}>
          <For each={formatOptions()}>
            {item => (
              <Radio disabled={item.disabled} value={item.value}>
                {item.label}
              </Radio>
            )}
          </For>
        </Show>
      </FlexBox>
    </GroupContext.Provider>
  );
};
export default Group;
