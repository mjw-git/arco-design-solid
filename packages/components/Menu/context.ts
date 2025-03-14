import { Accessor, createContext } from 'solid-js';
import { MenuProps } from './interface';

export type HotkeyInfo = {
  update: boolean;
  activeKeyPath: string[];
  type: 'sibling' | 'generation' | 'enter';
};

export type ResetHotkeyInfo = (activeKey?: string) => void;

const MenuContext = createContext<
  Pick<
    MenuProps,
    | 'mode'
    | 'levelIndent'
    | 'inDropdown'
    // | 'selectedKeys'
    | 'icons'
    | 'autoScrollIntoView'
    | 'scrollConfig'
  > & {
    theme?: () => string;

    openKeys?: () => string[];
    selectedKeys?: () => string[];
    collapse?: Accessor<boolean>;
    id?: string;
    prefixCls?: string;
    onClickMenuItem?: (key: string, event) => void;
    onClickSubMenu?: (key: string, level: number, type: 'pop' | 'inline') => void;
    collectInlineMenuKeys?: (key: string, unmount?: boolean) => void;
  }
>({});

export default MenuContext;
