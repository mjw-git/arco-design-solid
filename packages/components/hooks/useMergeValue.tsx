import { createEffect, createSignal } from 'solid-js';

function useMergeValue<T>(defaultValue: T | undefined, _value: () => T | undefined) {
  const [value, setValue] = createSignal<T | undefined>(_value() || defaultValue);
  let firstRender = true;
  createEffect(() => {
    _value();

    if (firstRender) {
      firstRender = false;
      return;
    }
    console.log('value', _value(), '==');
    setValue(() => _value());
  });
  return [value, setValue] as const;
}
export default useMergeValue;
