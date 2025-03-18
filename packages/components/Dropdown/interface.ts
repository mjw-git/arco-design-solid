import { TriggerProps } from '../Trigger/interface';
import { ButtonProps } from '../Button/interface';
import { JSX, JSXElement } from 'solid-js';

/**
 * @title Dropdown
 */
export interface DropdownItem {
  class?: string;
  label: string;
  key: string;
  disabled?: boolean;
  onClick?: (key: string, e: Event) => void;
  // children?: DropdownItem[];
}
export interface DropdownProps {
  customRender?: JSXElement;
  // items
  items?: DropdownItem[];
  children?: JSXElement;
  /**
   * @zh 下拉框的内容
   * @en Content of dropdown list
   */
  /**
   * @zh 下拉框的弹出位置
   * @en Position of dropdown list
   * @defaultValue bl
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  /**
   * @zh 触发下拉框弹出的方式
   * @en Types of events that cause the popup to show
   * @defaultValue hover
   */
  trigger?: TriggerProps['trigger'];
  /**
   * @zh 是否禁用弹出
   * @en Whether to disable popup
   * @version 2.16.0
   */
  disabled?: boolean;
  /**
   * @zh 隐藏后是否销毁 DOM 结构
   * @en Whether to umount the node on hiding
   * @defaultValue true
   */
  unmountOnExit?: boolean;
  /**
   * @zh 控制下拉框是否默认打开
   * @en Whether the dropdown list is visible by default
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh 控制下拉框是否打开（受控模式）
   * @en Whether the dropdown list is visible (Controlled)
   */
  popupVisible?: boolean;
  /**
   * @zh 弹出框下可接受所有 `Trigger` 组件的 `Props`
   * @en Pass all `Trigger` component properties
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 弹出框打开/关闭时会触发
   * @en Callback when visibility changes
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 弹出框挂在的父级节点
   * @en To set the container of the dropdown menu
   */
  getPopupContainer?: (node: HTMLElement) => Element;
}

/**
 * @title Dropdown.Button
 */
export interface DropdownButtonProps extends Omit<DropdownProps, 'position'> {
  style?: JSX.CSSProperties;
  className?: string | string[];
  /**
   * @zh 下拉框的弹出位置
   * @en Position of the dropdown list
   * @defaultValue br
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  /**
   * @zh 等同于 `Button` 的 size
   * @en Same as `size` of ButtonProps
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 等同于 `Button` 的 type
   * @en Same as `type` of ButtonProps
   * @defaultValue default
   */
  type?: 'default' | 'primary' | 'secondary' | 'dashed' | 'outline' | 'text';
  /**
   * @zh 接收 button 按钮的所有 Props，应用于左侧按钮
   * @en Pass Button's properties to the button on the left
   */
  buttonProps?: ButtonProps;
  /**
   * @zh 右侧显示内容，可以是 icon 或者任意 dom 元素
   * @en Custom icon on the right
   * @defaultValue <IconMore />
   */
  icon?: JSX.Element;
  /**
   * @zh 自定义两个按钮的渲染
   * @en Custom buttons inside Dropdown.Button
   */
  buttonsRender?: (buttons: JSX.Element[]) => JSX.Element[];
  /**
   * @zh 左侧按钮的点击事件
   * @en Callback when button on the left is clicked
   */
  onClick?: (e: Event) => void;
  children?: JSX.Element;
}
