import {
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  onMount,
  ParentComponent,
  splitProps,
} from 'solid-js';
import { GridRowGutter, RowProps } from './interface';
import cs from '../utils/classNames';
import { RowContext } from './RowContext';
import ResponsiveObserve, {
  Breakpoint,
  ScreenMap,
  responsiveArray,
} from '../utils/responsiveObserve';

const BASE_PREFIX = 'arco-row';
const Row: ParentComponent<RowProps> = props => {
  const merged = mergeProps({ align: 'start', justify: 'start' }, props);
  const [local, rest] = splitProps(merged, [
    'align',
    'class',
    'justify',
    'children',
    'gutter',
    'style',
  ]);

  let token: string;
  const [screens, setScreens] = createSignal<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
    xxxl: true,
  });

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-align-${local.align}`]: local.align,
        [`${BASE_PREFIX}-justify-${local.justify}`]: local.justify,
      },
      local.class
    );

  onMount(() => {
    token = ResponsiveObserve.subscribe(screens => {
      // Responsive Gutter
      if (
        (!Array.isArray(local.gutter) && typeof local.gutter === 'object') ||
        (Array.isArray(local.gutter) &&
          (typeof local.gutter[0] === 'object' || typeof local.gutter[1] === 'object'))
      ) {
        setScreens(screens);
      }
    });
  });

  onCleanup(() => {
    ResponsiveObserve.unsubscribe(token);
  });

  function getGutter(gutter: GridRowGutter | undefined): number {
    if (!gutter) {
      return 0;
    }
    let result = 0;

    if (typeof gutter === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (screens()[breakpoint] && gutter[breakpoint] !== undefined) {
          result = gutter[breakpoint] as number;
          break;
        }
      }
    } else {
      result = gutter;
    }

    return result;
  }

  const marginStyle = () => {
    const style: {
      'margin-top'?: string;
      'margin-bottom'?: string;
      'margin-left'?: string;
      'margin-right'?: string;
    } = {};
    if (gutterHorizontal || gutterVertical) {
      const marginHorizontal = -gutterHorizontal / 2;
      const marginVertical = -gutterVertical / 2;
      if (marginHorizontal) {
        style['margin-left'] = marginHorizontal + 'px';
        style['margin-right'] = marginHorizontal + 'px';
      }
      if (marginVertical) {
        style['margin-top'] = marginVertical + 'px';
        style['margin-bottom'] = marginVertical + 'px';
      }
    }
    return {};
  };
  const gutterHorizontal = () =>
    getGutter(Array.isArray(local.gutter) ? local.gutter[0] : local.gutter);
  const gutterVertical = () => getGutter(Array.isArray(local.gutter) ? local.gutter[1] : 0);

  return (
    <div
      style={{
        ...local.style,
        ...marginStyle(),
      }}
      class={mergeCls()}
      {...rest}
    >
      <RowContext.Provider value={{ gutter: [gutterHorizontal(), gutterVertical()] }}>
        {props.children}
      </RowContext.Provider>
    </div>
  );
};
export default Row;
