import {
  createEffect,
  createSignal,
  ParentComponent,
  Show,
  splitProps,
  useContext,
} from 'solid-js';
import { CheckboxProps } from './interface';
import cs from '../utils/classNames';
import { isFunction, isNullOrUndefined } from '../utils';
import handleEvent from '../utils/handleEvent';
import Hover from '../_class/icon-hover';
import IconCheck from './icon-check';
import { CheckGroupContext } from './group';

const BASE_PREFIX = 'arco-checkbox';
const CheckBox: ParentComponent<CheckboxProps> = props => {
  const context = useContext(CheckGroupContext);
  // const merge=mergeProps(BA)
  const [local, rest] = splitProps(props, [
    'disabled',
    'class',
    'children',
    'style',
    'indeterminate',
    'error',
    'value',
    'onClick',
    'onChange',
  ]);
  let inputRef: HTMLInputElement;
  const [checked, setChecked] = createSignal(props.defaultChecked);
  createEffect(() => {
    if (context.isCheckboxGroup) {
      setChecked((context.checkboxGroupValue() ?? []).includes(props.value));
      return;
    }
    if ('checked' in props) {
      setChecked(props.checked);
    }
  });
  const disabled = () => {
    if (context.isCheckboxGroup) {
      if (typeof context.disabled === 'boolean') {
        return context.disabled;
      }
    }

    return local.disabled;
  };
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-disabled`]: !!disabled(),
        [`${BASE_PREFIX}-indeterminate`]: !!local.indeterminate,
        [`${BASE_PREFIX}-checked`]: checked(),
        error: local.error,
      },
      local.class
    );

  const onClick = (e: Event) => {
    if (isFunction(local.children)) {
      e.preventDefault();
      inputRef && inputRef.click();
    }
    local.onClick && handleEvent(e, local.onClick);
  };

  const onChange = (e: Event & { target: HTMLInputElement }) => {
    e.stopPropagation();
    setChecked(e.target.checked);
  };

  const icon = () => {
    if (props.icon) {
      // 克隆icon并添加class
      return props.icon;
    }
    return <IconCheck class={`${BASE_PREFIX}-mask-icon`} />;
  };

  return (
    <label
      aria-disabled={disabled()}
      {...rest}
      class={mergeCls()}
      style={local.style}
      onClick={onClick}
    >
      <input
        onChange={onChange}
        value={local.value}
        disabled={disabled()}
        onClick={e => e.stopPropagation()}
        type="checkbox"
        checked={!!checked()}
        ref={el => (inputRef = el)}
      />
      {isFunction(local.children) ? (
        local.children({ checked: checked, indeterminate: local.indeterminate })
      ) : (
        <>
          <Hover
            prefix={BASE_PREFIX}
            class={`${BASE_PREFIX}-mask-wrapper`}
            disabled={checked() || disabled() || local.indeterminate}
          >
            <div class={`${BASE_PREFIX}-mask`}>{icon()}</div>
            <Show when={!isNullOrUndefined(local.children)}>
              <span class={`${BASE_PREFIX}-text`}>{local.children}</span>
            </Show>
          </Hover>
        </>
      )}
    </label>
  );
};
export default CheckBox;
