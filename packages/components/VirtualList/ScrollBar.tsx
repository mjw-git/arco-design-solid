import { JSX, ParentComponent, createSignal, onCleanup, onMount } from 'solid-js';
interface FuncRefProps {
  delayHidden?: () => void;
}
interface ScrollBarProps {
  scrollHeight: number;
  onScroll: (offset: number) => void;
  offsetTop: number;
  thumbHeight: number;
  containerHeight: number;
  scrollRef: FuncRefProps;
}
const HIDDEN_TIME = 3000;

const ScrollBar: ParentComponent<ScrollBarProps> = props => {
  let timer: NodeJS.Timeout;
  let thumbRef: HTMLDivElement | undefined;
  props.containerHeight - props.scrollHeight;
  // x / props.scrollHeight-props.containerHeight=1/props.containerHeight-props.thumbHeight;
  const top = () =>
    (props.offsetTop * (props.containerHeight - props.thumbHeight)) /
    (props.scrollHeight - props.containerHeight);
  const [visible, setVisible] = createSignal(false);
  const delayHidden = () => {
    clearTimeout(timer);
    setVisible(true);
    timer = setTimeout(() => {
      setVisible(false);
    }, HIDDEN_TIME);
  };

  onMount(() => {
    props.scrollRef.delayHidden = delayHidden;
  });
  onCleanup(() => {
    clearTimeout(timer);
  });

  const handleMouseDown: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onMouseDown'] = e => {
    let currentPageY = e.pageY;
    function handleMouseMove(this: Document, ev: MouseEvent): any {
      delayHidden();
      props.onScroll(ev.pageY - currentPageY);
      currentPageY = ev.pageY;
    }
    document?.addEventListener<'mousemove'>('mousemove', handleMouseMove);
    document?.addEventListener('mouseup', () => {
      document?.removeEventListener('mousemove', handleMouseMove);
    });
  };

  return (
    <div
      class="sld-scroll-container"
      style={{
        height: `${props.containerHeight || 0}px`,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        ref={thumbRef}
        class="sld-scroll-inner"
        style={{
          position: 'absolute',
          height: `${props.thumbHeight || 0}px`,
          background: 'rgba(0, 0, 0, 0.5)',
          'border-radius': '99px',
          cursor: 'pointer',
          top: `${top() + props.offsetTop}px`,
          visibility: visible() ? 'visible' : 'hidden',
        }}
      ></div>
    </div>
  );
};
export default ScrollBar;
