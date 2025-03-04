import Group from './group';
import Radio from './radio';

const RadioComponent = Radio as typeof Radio & {
  Group: typeof Group;
};

RadioComponent.Group = Group;
export default RadioComponent;
