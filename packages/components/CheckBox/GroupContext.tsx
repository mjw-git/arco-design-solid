import { Accessor, createContext } from "solid-js";
import { CheckBoxGroupValueType } from "./interface";
export interface GroupContextProps {
  groupValue?: Accessor<CheckBoxGroupValueType>;
  onGroupValueChange?: (value: CheckBoxGroupValueType) => void;
}
export const GroupContext = createContext<GroupContextProps>();
