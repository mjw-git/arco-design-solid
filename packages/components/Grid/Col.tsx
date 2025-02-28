import { JSX, mergeProps, ParentComponent, splitProps, useContext } from 'solid-js';
import { RowContext } from './RowContext';
import { ColProps, FlexType, GridResponsiveBreakpoint } from './interface';
import cs from '../utils/classNames';
import { isNumber, isObject } from '../utils';

const BASE_PREFIX = 'arco-col';
const Col: ParentComponent<ColProps> = props => {
  const { gutter } = useContext(RowContext);
  const merged = mergeProps({ span: 24 }, props);
  const [local, rest] = splitProps(merged, [
    'span',
    'class',
    'style',
    'offset',
    'pull',
    'push',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl',
    'xxxl',
    'order',
    'rtl',
    'flex',
  ]);
  function adaptationGrid(BASE_PREFIX: string, mergeClassName: { [key: string]: any }) {
    const screenList = {
      xs: local.xs,
      sm: local.sm,
      md: local.md,
      lg: local.lg,
      xl: local.xl,
      xxl: local.xxl,
      xxxl: local.xxxl,
    } as Record<GridResponsiveBreakpoint, any>;
    Object.keys(screenList).forEach((screen: string) => {
      const screenValue = screenList[screen as GridResponsiveBreakpoint];
      if (isNumber(screenValue)) {
        if (screenValue >= 0) {
          mergeClassName[`${BASE_PREFIX}-${screen}-${screenValue}`] = true;
        }
      } else if (isObject(screenValue)) {
        mergeClassName[`${BASE_PREFIX}-${screen}-${screenValue.span}`] = screenValue.span;
        mergeClassName[`${BASE_PREFIX}-${screen}-offset-${screenValue.offset}`] =
          screenValue.offset;
        mergeClassName[`${BASE_PREFIX}-${screen}-order-${screenValue.order}`] = screenValue.order;
        mergeClassName[`${BASE_PREFIX}-${screen}-pull-${screenValue.pull}`] = screenValue.pull;
        mergeClassName[`${BASE_PREFIX}-${screen}-push-${screenValue.push}`] = screenValue.push;
      }
    });
    return mergeClassName;
  }
  const mergeCls = () => ({
    [`${BASE_PREFIX}`]: true,
    [`${BASE_PREFIX}-order-${local.order}`]: local.order,
    [`${BASE_PREFIX}-${local.span}`]:
      !local.xs && !local.sm && !local.md && !local.lg && !local.xl && !local.xxl && !local.xxxl,
    [`${BASE_PREFIX}-offset-${local.offset}`]: local.offset,
    [`${BASE_PREFIX}-pull-${local.pull}`]: local.pull,
    [`${BASE_PREFIX}-push-${local.push}`]: local.push,
    [`${BASE_PREFIX}-rtl`]: local.rtl,
  });

  const mergeClassName = () =>
    cs(local.flex ? BASE_PREFIX : adaptationGrid(BASE_PREFIX, mergeCls()), local.class);
  function getFlexString(flex: FlexType | undefined) {
    if (typeof flex === 'string' && /\d+[px|%|em|rem|]{1}/.test(flex)) {
      return `0 0 ${flex}`;
    }
    return flex;
  }
  const paddingStyle = () => {
    const style: {
      'padding-left'?: string;
      'padding-right'?: string;
      'padding-top'?: string;
      'padding-bottom'?: string;
    } = {};
    if (Array.isArray(gutter)) {
      const paddingHorizontal = (gutter[0] && gutter[0] / 2) || 0;
      const paddingVertical = (gutter[1] && gutter[1] / 2) || 0;
      if (paddingHorizontal) {
        style['padding-left'] = paddingHorizontal + 'px';
        style['padding-right'] = paddingHorizontal + 'px';
      }
      if (paddingVertical) {
        style['padding-top'] = paddingVertical + 'px';
        style['padding-bottom'] = paddingVertical + 'px';
      }
      return style;
    }
  };
  const flexStyle = () => (getFlexString(local.flex) ? { flex: getFlexString(local.flex) } : {});

  return (
    <div
      class={mergeClassName()}
      style={{
        ...local.style,
        ...flexStyle(),
        ...paddingStyle(),
      }}
      {...rest}
    >
      {props.children}
    </div>
  );
};
export default Col;
