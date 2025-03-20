import {
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  ParentComponent,
  splitProps,
} from 'solid-js';
import { AnchorProps } from './interface';
import cs from '../utils/classNames';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { compute } from 'compute-scroll-into-view';
import AnchorContext from './context';
import { findNode, getContainer, getContainerElement, slide } from './utils';
import { isFunction, isNumber, isWindow } from '../utils';
import throttle from 'lodash/throttle';
import { off, on } from '../utils/dom';
import Affix from '../Affix';
import Link from './link';

const defaultProps: AnchorProps = {
  animation: true,
  affix: true,
  hash: true,
  boundary: 'start',
};
const Anchor: ParentComponent<AnchorProps> = props => {
  const merge = mergeProps(defaultProps, props);
  const [local, rest] = splitProps(merge, [
    'class',
    'style',
    'scrollContainer',
    'animation',
    'lineless',
    'affix',
    'affixStyle',
    'offsetBottom',
    'offsetTop',
    'hash',
    'boundary',
    'targetOffset',
    'children',
    'direction',
    'onSelect',
    'onChange',
  ]);

  const prefixCls = `arco-anchor`;
  let wrapperRef: HTMLDivElement | null = null;
  let sliderLineRef: HTMLDivElement | null = null;
  const linkMap = new Map<string, HTMLElement>();
  let isScrolling = false;
  let scrollContainer: HTMLElement | Window | null = null;

  const [flagUpdateSliderLine, setFlagUpdateSliderLine] = createSignal(0);
  const [currentLink, setCurrentLink] = createSignal('');
  createEffect(() => {
    const container = getContainer(local.scrollContainer);
    scrollContainer = container;
    on(scrollContainer, 'scroll', onScroll);
  });

  onCleanup(() => {
    off(scrollContainer, 'scroll', onScroll);
  });

  function addLink(hash: string, element: HTMLElement) {
    if (hash) {
      linkMap.set(hash, element);
      setFlagUpdateSliderLine(Math.random());
    }
  }
  function removeLink(hash: string) {
    linkMap.delete(hash);
    setFlagUpdateSliderLine(Math.random());
  }

  const setActiveLink = (hash: string) => {
    if (!hash || !wrapperRef) return;
    if (!linkMap.has(hash)) {
      const node = findNode(wrapperRef, `a[data-href='${hash}']`);
      node && addLink(hash, node);
    }

    const node = linkMap.get(hash);

    if (node && hash !== currentLink()) {
      scrollIntoViewIfNeeded(node, {
        behavior: 'auto',
        block: 'nearest',
        scrollMode: 'if-needed',
        boundary: wrapperRef,
      });
      new Promise(resolve => {
        setCurrentLink(hash);
        resolve(hash);
      }).then(() => {
        isFunction(local.onChange) && local.onChange(hash, currentLink());
      });
    }
  };

  const getEleInViewport = () => {
    let result: any;
    const startTop = isNumber(local.boundary) ? local.boundary : 0;
    const container = scrollContainer;
    const containerElement = getContainerElement(container!);
    const containerRect = containerElement.getBoundingClientRect();

    const documentHeight = document.documentElement.clientHeight;
    [...linkMap.keys()].some(hash => {
      const element = findNode(document, hash);
      let inView = false;
      if (element) {
        const { top, height } = element.getBoundingClientRect();
        if (isWindow(container)) {
          const innerTargetOffset = local.targetOffset ?? documentHeight / 2;
          inView =
            (top >= startTop && top <= innerTargetOffset) ||
            (top <= startTop && top + height >= innerTargetOffset);
        } else {
          const offsetTop = top - containerRect.top - startTop;
          const innerTargetOffset = local.targetOffset ?? containerRect.height / 2;
          inView =
            (offsetTop >= 0 && offsetTop <= innerTargetOffset) ||
            (offsetTop <= 0 && offsetTop + height >= innerTargetOffset);
        }
        if (inView) {
          result = element;
        }
      }
      return inView;
    });
    return result;
  };

  const onScroll = throttle(
    () => {
      if (isScrolling) return;
      queueMicrotask(() => {
        const element = getEleInViewport();
        if (element && element.id) {
          const hash = `#${element.id}`;
          setActiveLink(hash);
        }
      });
    },
    30,
    { trailing: true }
  );

  function scrollIntoView(hash: string) {
    if (!hash) return;
    try {
      const element = findNode(document, hash);
      if (!element) return;
      const block = isNumber(local.boundary) ? 'start' : local.boundary;
      const offset = isNumber(local.boundary) ? local.boundary : 0;
      const actions = compute(element, { block });
      if (!actions.length) return;

      let stopScroll = false;

      const promises = actions.map(({ el, top }) => {
        return new Promise(resolve => {
          if (!stopScroll) {
            if (el === scrollContainer) {
              stopScroll = true;
            }
            const targetTop = top - offset;
            if (!local.animation) {
              // Manually trigger scrolling as browser's default action is prevented when `props.hash` is false
              if (!local.hash) {
                el.scrollTop = targetTop;
              }
              return resolve(null);
            }
            return slide(el as HTMLElement, targetTop, resolve);
          }
          resolve(null);
        });
      });

      isScrolling = true;
      Promise.all(promises).then(() => {
        isScrolling = false;
      });
    } catch (e) {
      console.error(e);
    }
  }

  function onLinkClick(e: MouseEvent, hash: string) {
    if (!local.hash) {
      e.preventDefault();
    }
    setActiveLink(hash);
    scrollIntoView(hash);
    isFunction(local.onSelect) && local.onSelect(hash, currentLink());
  }

  onMount(() => {
    const hash = decodeURIComponent(location.hash);
    if (hash) {
      setActiveLink(hash);
      scrollIntoView(hash);
    } else {
      // compute current active anchor
      onScroll();
    }
  });

  createEffect(() => {
    const link = linkMap.get(currentLink());
    flagUpdateSliderLine();
    if (link && !local.lineless && sliderLineRef) {
      if (local.direction === 'horizontal') {
        sliderLineRef.style.left = `${link.offsetLeft}px`;
        sliderLineRef.style.width = `${link.clientWidth}px`;
      } else {
        sliderLineRef.style.top = `${link.offsetTop}px`;
      }
    }
  });

  const mergeCls = () =>
    cs(prefixCls, {
      [`${prefixCls}-lineless`]: local.lineless,
      [`${prefixCls}-horizontal`]: local.direction === 'horizontal',
    });

  const content = () => {
    return (
      <div class={mergeCls()} style={local.style} ref={el => (wrapperRef = el)} {...rest}>
        {!local.lineless && currentLink() && (
          <div class={`${prefixCls}-line-slider`} ref={el => (sliderLineRef = el)} />
        )}
        <AnchorContext.Provider
          value={{
            direction: local.direction,
            currentLink: () => currentLink(),
            addLink,
            removeLink,
            onLinkClick,
          }}
        >
          <div class={`${prefixCls}-list`}>{local.children}</div>
        </AnchorContext.Provider>
      </div>
    );
  };
  return local.affix ? (
    <Affix
      offsetTop={local.offsetTop}
      offsetBottom={local.offsetBottom}
      style={local.affixStyle}
      target={() => getContainer(local.scrollContainer)}
    >
      {content()}
    </Affix>
  ) : (
    content()
  );
};
const AnchorComponent = Anchor as typeof Anchor & {
  Link: typeof Link;
};
AnchorComponent.Link = Link;
export default AnchorComponent;
