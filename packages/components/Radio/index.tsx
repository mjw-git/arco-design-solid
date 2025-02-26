import { JSX, createEffect, createSignal, useContext } from 'solid-js';
import classNames from 'classnames';
import { RadioProps } from './interface';
import handleEvent from '../utils/handleEvent';
import { GroupContext } from './GroupContext';
import Group from './Group';
const BASE_PREFIX = 'sld-radio';
const Radio: RadioProps = props => {
  let wrapperRef: HTMLSpanElement | undefined;

  const [implChecked, setImplChecked] = createSignal(false);
  const state = useContext(GroupContext);
  const isInGroup = () => !!state?.onGroupValueChange;
  createEffect(() => {
    if (isInGroup() && state?.groupValue) {
      setImplChecked(props.value === state.groupValue());
    } else {
      setImplChecked(props.checked || false);
    }
  });

  const wrapperMergeCls = () => classNames(`sld-radio-input-wrapper`);

  const innerMergeCls = () =>
    classNames(
      `${BASE_PREFIX}-inner`,
      { [`${BASE_PREFIX}-inner-checked`]: implChecked() },
      { [`${BASE_PREFIX}-inner-disabled`]: props.disabled && !implChecked() },
      {
        [`${BASE_PREFIX}-inner-checked-disabled`]: props.disabled && implChecked(),
      }
    );

  const handleOnChange: JSX.CustomEventHandlersCamelCase<HTMLInputElement>['onChange'] = e => {
    const checked = e.target.checked;
    if (checked) {
      wrapperRef?.classList.add('sld-radio-inner-animation');
    }
    if (isInGroup()) {
      state!.onGroupValueChange?.(props.value!);
    }
    setImplChecked(true);

    handleEvent(e, props.onChange);
  };
  return (
    <label class="sld-radio-container">
      <span
        onAnimationEnd={e => {
          e.target.classList.remove('sld-radio-inner-animation');
        }}
        ref={wrapperRef}
        class={wrapperMergeCls()}
      >
        <input
          checked={implChecked()}
          onChange={handleOnChange}
          class="sld-radio-input"
          disabled={props.disabled}
          type="checkbox"
        />
        <span class={innerMergeCls()}></span>
      </span>
      <span class="sld-radio-content">{props.children}</span>
    </label>
  );
};
Radio.Group = Group;
export default Radio;
