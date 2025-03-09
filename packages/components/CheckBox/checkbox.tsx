import {
  Accessor,
  Component,
  createComponent,
  createEffect,
  createSignal,
  JSX,
  JSXElement,
  onCleanup,
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
export type childrenType = (props: {
  checked: Accessor<boolean | undefined>;
  indeterminate: () => boolean | undefined;
}) => JSXElement;
type ParentProps<P = {}> = P & { children?: JSX.Element | childrenType };
const CheckBox: Component<ParentProps<CheckboxProps>> = props => {
  const context = useContext(CheckGroupContext);
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

  createEffect(() => {
    context.registerValue(local.value);
  });

  onCleanup(() => {
    context.unRegisterValue(local.value);
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
    if (context.isCheckboxGroup) {
      context.onGroupChange && context.onGroupChange(props.value, e.target.checked, e);
    }
    local.onChange && local.onChange(e.target.checked, e);
  };

  const icon = () => {
    if (props.icon) {
      if (isFunction(props.icon)) {
        const icon = createComponent(props.icon, { class: `${BASE_PREFIX}-mask-icon` });
        if (icon instanceof Element) {
          icon.classList.add(`${BASE_PREFIX}-mask-icon`);
        }

        return icon;
      } else {
        if (props.icon instanceof Element) {
          props.icon.classList.add(`${BASE_PREFIX}-mask-icon`);
        }
        return props.icon;
      }
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
        local.children({ checked: checked, indeterminate: () => local.indeterminate })
      ) : (
        <>
          <Hover
            prefix={BASE_PREFIX}
            class={`${BASE_PREFIX}-mask-wrapper`}
            disabled={checked() || disabled() || local.indeterminate}
          >
            <div class={`${BASE_PREFIX}-mask`}>{icon()}</div>
          </Hover>
          <Show when={!isNullOrUndefined(local.children)}>
            <span class={`${BASE_PREFIX}-text`}>{local.children}</span>
          </Show>
        </>
      )}
    </label>
  );
};
export default CheckBox;
