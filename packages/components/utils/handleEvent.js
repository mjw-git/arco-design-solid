"use strict";
exports.__esModule = true;
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
function handleEvent(e, handler) {
    var _a;
    if (typeof handler === "function") {
        handler(e);
    }
    else if (Array.isArray(handler)) {
        (_a = handler[0]) === null || _a === void 0 ? void 0 : _a.call(handler, handler[1], e);
    }
}
exports["default"] = handleEvent;
