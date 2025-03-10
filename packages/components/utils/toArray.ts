import { JSX, children } from 'solid-js';

const toArray = (child: JSX.Element) => {
  return children(() => child).toArray();
};
export default toArray;
