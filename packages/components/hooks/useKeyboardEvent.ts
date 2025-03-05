import { JSX } from 'solid-js/jsx-runtime';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter } from '../utils/keycode';
import handleEvent from '../utils/handleEvent';

type CallBackEventType =
  | 'onPressEnter'
  | 'onArrowUp'
  | 'onArrowLeft'
  | 'onArrowRight'
  | 'onArrowDown';

function useKeyboardEvent(props?: {
  onKeyDown?: JSX.CustomEventHandlersCamelCase<HTMLElement>['onKeyDown'];
}) {
  const getEventListeners = (callbacks: { [Key in CallBackEventType]?: (e: any) => void }) => {
    return {
      onKeyDown: (e: any) => {
        const keyCode = e.keyCode || e.which;

        if (keyCode === Enter.code) {
          callbacks.onPressEnter?.(e);
        }
        if (keyCode === ArrowDown.code) {
          callbacks.onArrowDown?.(e);
        }
        if (keyCode === ArrowLeft.code) {
          callbacks.onArrowLeft?.(e);
        }
        if (keyCode === ArrowRight.code) {
          callbacks.onArrowRight?.(e);
        }
        if (keyCode === ArrowUp.code) {
          callbacks.onArrowUp?.(e);
        }
        handleEvent(e, props?.onKeyDown);
      },
    };
  };
  return getEventListeners;
}
export default useKeyboardEvent;
