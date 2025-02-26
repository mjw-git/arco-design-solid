import { createEffect, createSignal, mergeProps, splitProps } from 'solid-js';
import { TextAreaProps } from './interface';
import classNames from 'classnames';

const BASE_PREFIX = 'sld-textarea';
const TextArea: TextAreaProps = props => {
  const mergedProps = mergeProps({ value: props.defaultValue || '' }, props);
  const [implValue, setImplValue] = createSignal<string>('');
  const [local, rest] = splitProps(mergedProps, [
    'class',
    'onChange',
    'showCount',
    'onInput',
    'value',
  ]);

  createEffect(() => setImplValue((local.value || '') as string));

  const mergeCls = () => classNames(BASE_PREFIX, local.class);

  return (
    <span class="sld-textarea-container">
      <textarea
        value={implValue()}
        onInput={e => {
          setImplValue(e.target.value);
          if (typeof local.onInput === 'function') local.onInput?.(e);
          if (typeof local.onChange === 'function') local.onChange?.(e);
        }}
        class={mergeCls()}
        {...rest}
      ></textarea>
      {local.showCount && rest.maxLength && (
        <span class="sld-textarea-show-count">{`${implValue().length}/${rest.maxLength}`}</span>
      )}
    </span>
  );
};
export default TextArea;
