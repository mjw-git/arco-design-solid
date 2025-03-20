import { onCleanup, onMount, ParentComponent } from 'solid-js';
import lodashThrottle from 'lodash/throttle';
interface ResizeObserverComponentProps {
  onResize?: (entry: ResizeObserverEntry[]) => void;
  getTargetDomNode?: () => any;
  throttle?: boolean;
}
const ResizeObserverComponent: ParentComponent<ResizeObserverComponentProps> = props => {
  const onResize = (entry: ResizeObserverEntry[]) => {
    props.onResize?.(entry);
  };
  let resizeObserver: ResizeObserver | null;
  const createResizeObserver = () => {
    const resizeHandler = props.throttle ? lodashThrottle(onResize) : onResize;
    let firstExec = true;
    resizeObserver = new ResizeObserver(entry => {
      if (firstExec) {
        firstExec = false;
        onResize(entry);
      }
      resizeHandler(entry);
    });
    if (props.getTargetDomNode) {
      props.getTargetDomNode() && resizeObserver.observe(props.getTargetDomNode() as Element);
    }
  };

  onCleanup(() => {
    resizeObserver && resizeObserver.disconnect();
    resizeObserver = null;
  });

  onMount(() => {
    createResizeObserver();
  });

  return props.children;
};
export default ResizeObserverComponent;
