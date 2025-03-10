import { createSignal, mergeProps, ParentComponent, splitProps } from 'solid-js';
import { TagProps } from './interface';
import cs from '../utils/classNames';
import IconHover from '../_class/icon-hover';
import useKeyboardEvent from '../hooks/useKeyboardEvent';
import { IconClose, IconLoading } from 'arco-solid-icon';
const BASE_PREFIX = 'arco-tag';

const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const defaultProps: TagProps = {
  size: 'default',
};
const Tag: ParentComponent<TagProps> = props => {
  const merge = mergeProps(defaultProps, props);

  const [local, rest] = splitProps(merge, [
    'class',
    'style',
    'children',
    'color',
    'closable',
    'checkable',
    'defaultChecked',
    'size',
    'onClose',
    'onCheck',
    'icon',
    'visible',
    'closeIcon',
    'bordered',
    '__closeIconProps',
  ]);

  const [visible, setVisible] = createSignal<boolean | undefined>(
    'visible' in props ? props.visible : true
  );
  const [checked, setChecked] = createSignal<boolean | undefined>(
    'checked' in props ? props.visible : local.defaultChecked
  );
  const [loading, setLoading] = createSignal(false);

  const getKeyboardEvents = useKeyboardEvent();

  const mergeVisible = () => {
    if ('visible' in props) {
      return props.visible;
    }
    return visible();
  };

  const mergeChecked = () => {
    if ('checked' in props) {
      return props.checked;
    }
    return checked();
  };

  const _color = () => (local.color ? (COLORS.indexOf(local.color) !== -1 ? local.color : '') : '');
  const _checked = () => (local.checkable ? mergeChecked() : true);

  const mergeCls = () =>
    cs(
      BASE_PREFIX,
      {
        [`${BASE_PREFIX}-loading`]: loading,
        [`${BASE_PREFIX}-hide`]: !mergeVisible(),
        [`${BASE_PREFIX}-${_color()}`]: _color(),
        [`${BASE_PREFIX}-checkable`]: local.checkable,
        [`${BASE_PREFIX}-checked`]: _checked(),
        [`${BASE_PREFIX}-size-${local.size}`]: local.size,
        [`${BASE_PREFIX}-bordered`]: local.bordered,
        [`${BASE_PREFIX}-custom-color`]: _checked() && local.color && !_color(),
      },
      local.class
    );

  const mergeStyle = () => {
    const style = { ...local.style };
    if (local.color && !_color() && _checked()) {
      style['background-color'] = local.color;
      style['border-color'] = local.color;
    }
    return style;
  };

  const onHandleClose = (e: Event) => {
    const ret = local.onClose && local.onClose(e);
    if (ret && ret.then) {
      setLoading(true);
      ret
        .then(() => {
          setLoading(false);
          setVisible(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setVisible(false);
    }
  };

  function onHandleCheck() {
    const newChecked = !mergeChecked();
    if (!('checked' in props)) {
      setChecked(newChecked);
    }
    local.onCheck && local.onCheck(newChecked);
  }
  const otherProps = () => {
    if (local.checkable) {
      return { ...rest, onClick: onHandleCheck };
    }
    return { ...rest };
  };
  return (
    <div style={mergeStyle()} class={mergeCls()} {...otherProps()}>
      {local.icon && <span class={`${BASE_PREFIX}-icon`}>{local.icon}</span>}
      <span class={`${BASE_PREFIX}-content`}>{local.children}</span>
      {local.closable && !loading() && local.closeIcon !== null && (
        <IconHover
          prefix={BASE_PREFIX}
          class={`${BASE_PREFIX}-close-btn`}
          onClick={onHandleClose}
          role="button"
          tabIndex={0}
          {...getKeyboardEvents({ onPressEnter: onHandleClose })}
          aria-label="Close"
          {...local.__closeIconProps}
        >
          {local.closeIcon !== undefined ? local.closeIcon : <IconClose />}
        </IconHover>
      )}
      {loading() && (
        <span class={`${BASE_PREFIX}-loading-icon`}>
          <IconLoading />
        </span>
      )}
    </div>
  );
};
export default Tag;
