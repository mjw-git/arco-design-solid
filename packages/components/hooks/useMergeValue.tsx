import { createEffect, createSignal, Setter } from 'solid-js';

function useMergeValue<T>(v: T, params: { defaultValue?: T; value?: () => T }) {
  const [value, setValue] = createSignal<T | undefined>(params.defaultValue || v);
  createEffect(() => {
    if (params.value?.() !== undefined) {
      // 使用函数形式设置值以确保类型安全
      setValue(() => params.value?.());
    }
  });
  return [value, setValue] as const;
}
export default useMergeValue;
