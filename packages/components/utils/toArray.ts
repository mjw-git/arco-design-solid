import { JSX } from 'solid-js/jsx-runtime';

const toArray = (children: JSX.Element) => {
  if (Array.isArray(children)) {
    return children;
  } else {
    return [children];
  }
};
export default toArray;
