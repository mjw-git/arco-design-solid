import { Accessor, createSignal } from 'solid-js';
import { createEffect } from 'solid-js/types/server/reactive.js';

const globalInstanceIdMap: Record<string, any> = {};

/**
 * Provide unique component name while using this hook
 * In react 18, React.useId is a better way to choose
 * Related issue: https://github.com/arco-design/arco-design/issues/958
 */
export default function useId(prefix: string): Accessor<number | undefined> {
  const [id, setId] = createSignal<number>();

  // Update ID in next render to avoid SSR [prop dit not match] error
  createEffect(() => {
    globalInstanceIdMap[prefix] = prefix in globalInstanceIdMap ? globalInstanceIdMap[prefix] : 0;
    setId(globalInstanceIdMap[prefix]);
    globalInstanceIdMap[prefix] += 1;
  });

  return id;
}
