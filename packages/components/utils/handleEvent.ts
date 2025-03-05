import { EventType, HandlerFunctionType, handlerEventType } from '../types';
import { JSX } from 'solid-js';
// function handleEvent(
//   e: InputEvent & {
//     currentTarget: HTMLInputElement;
//     target: HTMLInputElement;
//   },
//   handler: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onInput"]
// ): void;
// function handleEvent(
//   e: FocusEvent & {
//     currentTarget: HTMLInputElement;
//     target: HTMLInputElement;
//   },
//   handler: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent>
// ): void;

function handleEvent<E, H>(e: E, handler?: H): void {
  if (typeof handler === 'function') {
    handler(e);
  } else if (Array.isArray(handler)) {
    handler[0]?.(handler[1], e);
  }
}
export default handleEvent;
