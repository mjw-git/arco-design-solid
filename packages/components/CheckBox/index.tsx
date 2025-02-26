const BASE_PREFIX = 'sld-checkbox';
import { JSX, createEffect, createSignal, splitProps, useContext } from 'solid-js';
import classNames from 'classnames';
import { CheckBoxProps } from './interface';
import handleEvent from '../utils/handleEvent';
import { GroupContext } from './GroupContext';
import Group from './Group';
const CheckBox: CheckBoxProps = props => {
  const state = useContext(GroupContext);
  let wrapperRef: HTMLSpanElement | undefined;
  const [local] = splitProps(props, ['onChange', 'indeterminate', 'checked', 'disabled', 'value']);
  const [implChecked, setImplChecked] = createSignal(false);

  const isInGroup = () => !!state?.onGroupValueChange;

  createEffect(() => {
    if (isInGroup()) {
      setImplChecked(state!.groupValue!().includes(local.value!));
    } else {
      setImplChecked(local.checked || false);
    }
  });

  const wrapperMergeCls = () =>
    classNames(`sld-checkbox-input-wrapper`, {
      ['sld-checkbox-input-wrapper-disabled']: local.disabled && !local.indeterminate,
    });
  const innerMergeCls = () =>
    classNames(
      `${BASE_PREFIX}-inner${local.disabled ? '-disabled' : ''}`,
      implChecked() && !local.indeterminate ? `${BASE_PREFIX}-inner-checked` : '',
      local.indeterminate ? `${BASE_PREFIX}-input-indeterminate` : '',
      {
        [`${BASE_PREFIX}-input-indeterminate-disabled`]: !!local.disabled && local.indeterminate,
      },
      {
        [`${BASE_PREFIX}-inner-checked-disabled`]: local.disabled && local.checked,
      }
    );

  const handleOnChange: JSX.CustomEventHandlersCamelCase<HTMLInputElement>['onChange'] = e => {
    const checked = e.target.checked;
    console.log(e);
    if (checked) {
      wrapperRef?.classList.add('sld-checkbox-inner-animation');
    }
    if (isInGroup()) {
      const implValue = [...state!.groupValue!()];
      const index = implValue.indexOf(local.value!);
      console.log(index);
      if (index === -1) {
        implValue.push(local.value!);
      } else {
        implValue.splice(index, 1);
      }
      state!.onGroupValueChange?.(implValue);
    }
    setImplChecked(checked);

    handleEvent(e, local.onChange);
  };

  return (
    <label class="sld-checkbox-container">
      <span
        onAnimationEnd={e => {
          e.target.classList.remove('sld-checkbox-inner-animation');
        }}
        ref={wrapperRef}
        class={wrapperMergeCls()}
      >
        <input
          checked={implChecked()}
          onChange={handleOnChange}
          class="sld-checkbox-input"
          disabled={local.disabled}
          type="checkbox"
        />
        <span class={innerMergeCls()}></span>
      </span>
      <span class="sld-checkbox-content">{props.children}</span>
    </label>
  );
};
CheckBox.Group = Group;
export default CheckBox;
