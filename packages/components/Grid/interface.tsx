import { JSX } from 'solid-js';
export type GridResponsiveBreakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type GridRowGutter = number | Partial<Record<GridResponsiveBreakpoint, number>>;
type RowProps = {
  gutter?: GridRowGutter | Array<GridRowGutter>;
  align?: JSX.CSSProperties['align-items'];
  class?: string;
  style?: JSX.CSSProperties;
  justify?: JSX.CSSProperties['justify-content'];
};
type ColProps = {
  pull?: number;
  push?: number;
  style?: JSX.CSSProperties;
  offset?: number;
  order?: number;
  span?: number;
  class?: string;
  rtl?: string;
  xs?: number | { [key: string]: any };
  /**
   * @zh >= 576px 响应式栅格
   * @en `screen >= 576px`
   */
  sm?: number | { [key: string]: any };
  /**
   * @zh >= 768px 响应式栅格
   * @en `screen >= 768px`
   */
  md?: number | { [key: string]: any };
  /**
   * @zh >= 992px 响应式栅格
   * @en `screen >= 992px`
   */
  lg?: number | { [key: string]: any };
  /**
   * @zh >= 1200px 响应式栅格
   * @en `screen >= 1200px`
   */
  xl?: number | { [key: string]: any };
  /**
   * @zh >= 1600px 响应式栅格
   * @en `screen >= 1600px`
   */
  xxl?: number | { [key: string]: any };
  /**
   * @zh >= 2000px 响应式栅格
   * @en `screen >= 2000px`
   * @version 2.40.0
   */
  xxxl?: number | { [key: string]: any };
  /**
   * @zh 设置 flex 布局属性
   * @en Set flex layout properties
   * @version 2.26.0
   */
  flex?: FlexType;
};
export type FlexType = string | number | 'auto' | 'none';

export type { RowProps, ColProps };
