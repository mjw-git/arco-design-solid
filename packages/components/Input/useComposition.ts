import { Accessor, createSignal, JSX } from 'solid-js';

import { InputProps, TextAreaProps } from './interface';
import { Enter } from '../utils/keycode';
import handleEvent from '../utils/handleEvent';

// Handle input text like Chinese
export default function useComposition({
  value,
  maxLength,
  onChange,
  onKeyDown,
  onPressEnter,
  beforeTriggerValueChangeCallback,
  normalizeHandler,
}: {
  value: string;
  maxLength: number;
  onChange: InputProps['onChange'];
  onKeyDown: InputProps['onKeyDown'] | TextAreaProps['onKeyDown'];
  onPressEnter: InputProps['onPressEnter'];
  beforeTriggerValueChangeCallback?: (newValue: string) => void;
  normalizeHandler?: (type: InputProps['normalizeTrigger'][number]) => InputProps['normalize'];
}): {
  compositionValue: Accessor<string | undefined>;
  triggerValueChangeCallback: typeof onChange;
  compositionHandler: JSX.HTMLAttributes<HTMLInputElement>['onCompositionStart'];
  valueChangeHandler: JSX.ChangeEventHandler<HTMLInputElement, Event>;
  keyDownHandler: JSX.HTMLAttributes<HTMLInputElement>['onKeyDown'];
} {
  let refIsComposition = false;
  const [compositionValue, setCompositionValue] = createSignal<string | undefined>('');

  const triggerValueChangeCallback: typeof onChange = (newValue, e) => {
    if (beforeTriggerValueChangeCallback) {
      beforeTriggerValueChangeCallback(newValue);
    }

    if (
      onChange &&
      // https://github.com/arco-design/arco-design/issues/520
      // Avoid triggering onChange repeatedly for the same value
      // Compositionend is earlier than onchange in Firefox, different with chrome
      newValue !== value &&
      (maxLength === undefined || newValue.length <= maxLength)
    ) {
      onChange(newValue, e);
    }
  };

  return {
    compositionValue,
    triggerValueChangeCallback,
    compositionHandler: (e: any) => {
      refIsComposition = e.type !== 'compositionend';
      if (!refIsComposition) {
        setCompositionValue(undefined);
        triggerValueChangeCallback(e.target.value, e);
      }
    },
    valueChangeHandler: (e: any) => {
      const newValue = e.target.value;
      if (!refIsComposition) {
        compositionValue() && setCompositionValue(undefined);
        triggerValueChangeCallback(newValue, e);
      } else {
        // https://github.com/arco-design/arco-design/issues/397
        // compositionupdate => onchange
        refIsComposition = false;
        setCompositionValue(newValue);
      }
    },
    keyDownHandler: (e: any) => {
      const keyCode = e.keyCode || e.which;

      if (!refIsComposition) {
        onKeyDown && handleEvent(e, onKeyDown);
        if (keyCode === Enter.code) {
          onPressEnter && onPressEnter(e);
          const normalize = normalizeHandler?.('onPressEnter');
          normalize && triggerValueChangeCallback(normalize(e.target.value), e);
        }
      }
    },
  };
}
