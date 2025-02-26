import { Accessor, createContext } from "solid-js";
import { RadioGroupValueType } from "./interface";
export interface GroupContextProps {
  groupValue?: Accessor<RadioGroupValueType | undefined>;
  onGroupValueChange?: (value: RadioGroupValueType) => void;
}
export const GroupContext = createContext<GroupContextProps>();
