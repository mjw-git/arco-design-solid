import { createEffect, createSignal } from 'solid-js';

function useMergeValue<T>(defaultValue: T | undefined, _value: () => T | undefined) {
  const [value, setValue] = createSignal<T | undefined>(_value() || defaultValue);
  let firstRender = true;
  createEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    setValue(() => _value());
  });
  return [value, setValue] as const;
}
export default useMergeValue;
