import { JSX, children, createComponent } from 'solid-js';

const toArray = (child: JSX.Element) => {
  return children(() => child).toArray();
};
export const toArrayDom = (child: JSX.Element) => {
  return children(() => child)
    .toArray()
    .map(item => {
      if (typeof item === 'function') {
        return createComponent(item, {});
      }
      return item;
    });
};
export default toArray;
