import CheckBox from './checkbox';
import Group from './group';
const CheckBoxComponent = CheckBox as typeof CheckBox & {
  Group: typeof Group;
};
CheckBoxComponent.Group = Group;
export default CheckBoxComponent;
