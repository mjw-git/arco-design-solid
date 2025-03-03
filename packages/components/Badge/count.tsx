import { createEffect, createSignal, JSX, ParentComponent } from 'solid-js';
const BASE_PREFIX = 'arco-badge';
import cs from '../utils/classNames';
import { isNumber } from '../utils';
import { Transition } from 'solid-transition-group';
interface CountProps {
  maxCount?: number;
  count?: number | JSX.Element | undefined;
  class?: string;
  style?: JSX.CSSProperties;
}
const Count: ParentComponent<CountProps> = props => {
  const [isChanged, setIsChanged] = createSignal(false);
  const [isEntered, setIsEntered] = createSignal(false);
  const [oldCount, setOldCount] = createSignal(props.count);
  createEffect(() => {
    if (props.count !== oldCount()) {
      setIsChanged(true);
      setOldCount(props.count);
    }
  });
  return (
    <Transition
      appear
      onEnter={(el, done) => {
        const a = el.animate([{ scale: 0.2 }, { scale: 1 }], {
          duration: 200,
        });
        a.finished.then(() => {
          setIsEntered(true);
          done();
        });
      }}
    >
      <span class={props.class} style={props.style}>
        <span class={cs({ [`${BASE_PREFIX}-number-text`]: isEntered() && isChanged() })}>
          {props.count && props.maxCount && isNumber(props.count) && props.count > props.maxCount
            ? `${props.maxCount}+`
            : props.count}
        </span>
      </span>
    </Transition>
    //    </ArcoCSSTransition>
  );
};

export default Count;
