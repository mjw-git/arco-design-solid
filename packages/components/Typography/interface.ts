import { JSXElement } from 'solid-js';
import { JSX } from 'solid-js/h/jsx-runtime';

export interface CommonProps {
  style?: JSX.CSSProperties;
  class?: string | string[];
  children?: JSXElement;
  /**
   * @zh 文本类型
   * @en Text type
   */
  type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /**
   * @zh 粗体
   * @en Bold style
   */
  bold?: boolean;
  /**
   * @zh 禁用状态
   * @en Disabled style
   */
  disabled?: boolean;
  /**
   * @zh 标记样式
   * @en Mark style
   */
  mark?: boolean | { color: string };
  /**
   * @zh 下划线样式
   * @en Underline style
   */
  underline?: boolean;
  /**
   * @zh 删除线样式
   * @en Strikethrough style
   */
  delete?: boolean;
  /**
   * @zh 代码块样式
   * @en Code block style
   */
  code?: boolean;
}
export interface TypographyTitleProps extends CommonProps {
  /**
   * @zh 标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`
   * @en Heading level, equivalent to `h1` `h2` `h3` `h4` `h5` `h6`
   * @defaultValue 1
   */
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TypographyParagraphProps extends CommonProps {
  /**
   * @zh 长引用
   * @en Blockquote style
   */
  blockquote?: boolean;
  /**
   * @zh
   * 段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。
   * @en
   * The line height of the paragraph. The default line height is recommended for long text (more than 5 lines),
   * and the close line height of `close` is recommended for short text (less than or equal to 3 lines).
   * @defaultValue default
   */
  spacing?: 'default' | 'close';
}
export interface OperationsProps extends Omit<JSX.HTMLAttributes<HTMLElement>, 'className'> {
  /**
   * @zh 开启复制功能
   * @en Whether to be copyable
   * @version `onCopy` params `e` in `2.31.0`
   */
  copyable?:
    | boolean
    | {
        text?: string;
        onCopy?: (text: string) => void;
        icon?: JSX.Element;
        tooltips?: [JSX.Element, JSX.Element];
        tooltipProps?: JSX.Element;
      };
  /**
   * @zh 开启可编辑功能
   * @en If editable. Can control edit state when is object
   * @version `onStart` params `e` in `2.31.0`
   */

  /**
   * @zh 自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)。不推荐使用，建议 `Typography.Ellipsis` 替代
   * @en Auto overflow omitted, see [EllipsisConfig](#ellipsisconfig)。Deprecated, `Typography.Ellipsis` is recommended instead
   */
  expanding?: boolean;
  setEditing?: (editing: boolean) => void;
  forceShowExpand?: boolean;
  currentContext: Record<string, any>;
}
export type TypographyTextProps = CommonProps;
