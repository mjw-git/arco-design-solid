import { For, Show, createEffect, createSignal } from 'solid-js';
import { GroupContext } from './GroupContext';
import { CheckBoxGroupProps, CheckBoxGroupValueType } from './interface';
import CheckBox from '.';
import FlexBox from '../FlexBox';

const Group: CheckBoxGroupProps = props => {
  const [value, setValue] = createSignal<CheckBoxGroupValueType>([]);

  createEffect(() => {
    setValue(props.value || []);
  });

  const handleOnChange = (_value: CheckBoxGroupValueType) => {
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
              <CheckBox disabled={item.disabled} value={item.value}>
                {item.label}
              </CheckBox>
            )}
          </For>
        </Show>
      </FlexBox>
    </GroupContext.Provider>
  );
};
export default Group;
