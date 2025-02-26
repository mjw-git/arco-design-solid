import { Component, JSX } from "solid-js";

export type ParentProps<P = {}> = P & { children?: JSX.Element };
export type ParentComponent<P = {}> = Component<ParentProps<P>>;
export type handlerEventType =
  | JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent>
  | JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onInput"];
export type EventType =
  | (InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    })
  | (FocusEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    });

export type HandlerFunctionType =
  | ((
      e: InputEvent & {
        currentTarget: HTMLInputElement;
        target: HTMLInputElement;
      },
      handler: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onInput"]
    ) => void)
  | ((
      e: FocusEvent & {
        currentTarget: HTMLInputElement;
        target: HTMLInputElement;
      },
      handler: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent>
    ) => void);
