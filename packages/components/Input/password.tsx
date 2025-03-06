import { createEffect, createSignal, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { InputPasswordProps } from './interface';
import cs from '../utils/classNames';
import Input from './input';
import useKeyboardEvent from '../hooks/useKeyboardEvent';
import { IconEye, IconEyeInvisible } from 'arco-solid-icon';
const BASE_PREFIX = 'arco-input-password';
const Password: ParentComponent<InputPasswordProps> = props => {
  const merge = mergeProps({ visibilityToggle: true }, props);
  const [local, rest] = splitProps(merge, [
    'visibilityToggle',
    'defaultVisibility',
    'visibility',
    'class',
    'onVisibilityChange',
    'suffix',
  ]);
  const [visibility, setVisibility] = createSignal(local.defaultVisibility);
  createEffect(() => {
    if ('visibility' in props) {
      setVisibility(props.visibility);
    }
  });
  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-visibility`]: local.visibilityToggle,
      },
      local.class
    );

  const onClickVisibility = (v: boolean) => {
    if (!('visibility' in props)) {
      setVisibility(v);
    }
    local.onVisibilityChange && local.onVisibilityChange(v);
  };

  const handleClickVisibility = () => {
    onClickVisibility(!visibility);
  };

  const getKeyboardEvents = useKeyboardEvent();

  const icon = () => {
    if (local.visibilityToggle) {
      const IconProps = {
        onClick: handleClickVisibility,
        // 预防focus丢失
        onMouseDown: (e: Event) => e.preventDefault(),
        onMouseUp: (e: Event) => e.preventDefault(),
        ...getKeyboardEvents({
          onPressEnter: handleClickVisibility,
        }),
      };
      if (local.suffix) {
        return <span {...IconProps}>{local.suffix}</span>;
      } else {
        const IconComponent = visibility() ? (
          <IconEye
            {...IconProps}
            {...{
              focusable: undefined,
              'aria-hidden': undefined,
              tabIndex: 0,
              className: `${BASE_PREFIX}-visibility-icon`,
            }}
          />
        ) : (
          <IconEyeInvisible
            {...IconProps}
            {...{
              focusable: undefined,
              'aria-hidden': undefined,
              tabIndex: 0,
              class: `${BASE_PREFIX}-visibility-icon`,
            }}
          />
        );
        return IconComponent;
      }
    }

    return local.suffix;
  };

  return (
    <Input {...rest} type={visibility() ? 'text' : 'password'} class={mergeCls()} suffix={icon()} />
  );
};
export default Password;
