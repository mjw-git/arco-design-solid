import { For, JSX, Show, createEffect, createMemo, createSignal, splitProps } from 'solid-js';
import { VirtualListProps } from './interface';
import ScrollBar from './ScrollBar';
import { getSpinSize } from './utils';
import cs from '../utils/classNames';
function VirtualList<T>(props: VirtualListProps<T>): JSX.Element {
  let scrollRef: { delayHidden?: () => void | undefined } = {};
  let virtualContainerRef: HTMLDivElement | undefined;
  const [local, rest] = splitProps(props, ['data', 'itemHeight', 'height', 'class', 'children']);

  const [scrollBarOffsetTop, setScrollBarOffsetTop] = createSignal(0);

  const wrapperCls = () => cs(`sld-virtual-list`, local.class);

  const scrollContainerHeight = createMemo(() => (local.data ?? []).length * local.itemHeight);
  const listCount = () => Math.ceil(local.height / local.itemHeight) + 2;
  const isVirtual = () => scrollContainerHeight() >= local.height;
  const scrollHeight = () => getSpinSize(local.height || 0, scrollContainerHeight());
  const listChildren = () => {
    const startIndex = Math.floor(scrollBarOffsetTop() / local.itemHeight);
    const endIndex = startIndex + listCount();
    return local.data.slice(startIndex, endIndex);
  };
  const maxScrollHeight = () => (isVirtual() ? scrollContainerHeight() - local.height : 0);

  createEffect(() => {
    setScrollBarOffsetTop(
      scrollBarOffsetTop() >= maxScrollHeight() ? maxScrollHeight() : scrollBarOffsetTop
    );
  });

  const handleWheel: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onWheel'] = e => {
    if (!isVirtual()) return;
    e.preventDefault();
    const nextOffsetTop = scrollBarOffsetTop() + e.deltaY;
    setScrollBarOffsetTop(
      nextOffsetTop < 0 ? 0 : nextOffsetTop >= maxScrollHeight() ? maxScrollHeight() : nextOffsetTop
    );
    virtualContainerRef!.scrollTop = nextOffsetTop;
    scrollRef.delayHidden?.();
  };

  const handleMouseEnterOrScroll = () => {
    isVirtual() && scrollRef.delayHidden?.();
  };
  const handleOnScroll = (offset: number) => {
    const calculateOffset =
      (offset * (scrollContainerHeight() - local.height)) / (local.height - scrollHeight());
    const nextOffset = scrollBarOffsetTop() + calculateOffset;
    setScrollBarOffsetTop(
      nextOffset < 0 ? 0 : nextOffset >= maxScrollHeight() ? maxScrollHeight() : nextOffset
    );
    virtualContainerRef!.scrollTop = nextOffset;
    scrollRef.delayHidden?.();
  };

  return (
    <div
      onMouseEnter={handleMouseEnterOrScroll}
      onWheel={handleWheel}
      class={wrapperCls()}
      ref={virtualContainerRef}
      style={{
        height: `${isVirtual() ? local.height : scrollContainerHeight()}px`,
        overflow: 'hidden',
        position: 'relative',
      }}
      {...rest}
    >
      <Show when={isVirtual()}>
        <ScrollBar
          onScroll={handleOnScroll}
          scrollRef={scrollRef}
          offsetTop={scrollBarOffsetTop()}
          containerHeight={local.height}
          scrollHeight={scrollContainerHeight()}
          thumbHeight={scrollHeight()}
        />
      </Show>

      <div
        style={{
          height: `${scrollContainerHeight()}px`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          class="sld-virtual-list-inner"
          style={{
            transform: `translateY(${
              Math.floor(scrollBarOffsetTop() / local.itemHeight) * local.itemHeight
            }px)`,
          }}
        >
          <For each={listChildren()}>
            {(item, index) => (
              <div
                style={{
                  height: `${local.itemHeight}px`,
                  'box-sizing': 'border-box',
                }}
              >
                {local.children(item, index())}
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
export default VirtualList;
