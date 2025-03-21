import { JSX } from 'solid-js';
import { TooltipProps } from '../Tooltip/interface';
// import { TooltipProps } from '../Tooltip';

/**
 * @title Popover
 */
export interface PopoverProps extends Omit<TooltipProps, 'mini'> {
  style?: JSX.CSSProperties;
  class?: string;
  /**
   * @zh 标题.  函数类型在 `2.48.0` 支持
   * @en Title of the popup card. Function types are supported in `2.48.0`
   */
  title?: JSX.Element | (() => JSX.Element);
  /**
   * @zh 是否禁用
   * @en Whether to disabled
   * @version 2.11.0
   */
  disabled?: boolean;
}
