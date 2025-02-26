import { JSX, createEffect, createSignal, mergeProps, splitProps } from 'solid-js';
import classNames from 'classnames';
import { Clear } from 'arco-solid-icon';

import FlexBox from '../FlexBox';
import Password from './Password';
import Search from './Search';
import { BaseInputProps } from './interface';

import TextArea from './TextArea';
import handleEvent from '../utils/handleEvent';

const BASE_PREFIX = 'sld-input';

const BaseInput: BaseInputProps = props => {
  const mergedProps = mergeProps({ value: props.defaultValue || '', type: 'text' }, props);
  const [focused, setFocused] = createSignal(false);
  const [local, rest] = splitProps(mergedProps, [
    'class',
    'value',
    'onChange',
    'onInput',
    'type',
    'onFocus',
    'onBlur',
    'allowClear',
    'prefixIcon',
    'suffixIcon',
    'showCount',
    'onEnterPress',
    'clearAll',
    'disabled',
  ]);

  const [implValue, setImplValue] = createSignal<string>('');

  createEffect(() => {
    setImplValue(local.value);
  });

  const needWrapper = () =>
    local.allowClear ||
    !!local.prefixIcon ||
    !!local.suffixIcon ||
    (local.showCount && rest.maxLength);

  const mergeWrapperCls = () =>
    classNames(
      focused() ? `${BASE_PREFIX}-compact-wrapper-focused` : '',
      `${BASE_PREFIX}-compact-wrapper`,
      local.disabled ? `${BASE_PREFIX}-disabled` : '',
      local.class
    );
  const mergeCls = () =>
    classNames(
      BASE_PREFIX,
      local.disabled && !needWrapper() ? `${BASE_PREFIX}-disabled` : '',
      local.class
    );

  const handleOnInput: JSX.CustomEventHandlersCamelCase<HTMLInputElement>['onInput'] = e => {
    setImplValue(e.target.value);
    handleEvent(e, local.onChange);
    handleEvent(e, local.onInput);
  };

  const handleOnFocus: JSX.InputHTMLAttributes<HTMLInputElement>['onFocus'] = e => {
    setFocused(true);
    handleEvent(e, local.onFocus);
    if (typeof local.onFocus === 'function') local.onFocus(e);
  };
  const handleOnBlur: JSX.FocusEventHandlerUnion<HTMLInputElement, FocusEvent> = e => {
    setFocused(false);
    handleEvent(e, local.onBlur);
  };
  const handleEnterPress: JSX.InputHTMLAttributes<HTMLInputElement>['onKeyDown'] = e => {
    if (e.key === 'Enter') {
      local.onEnterPress?.(implValue());
    }
  };
  const handleClearAll: JSX.CustomEventHandlersCamelCase<HTMLSpanElement>['onClick'] = e => {
    setImplValue('');
    local.clearAll?.();
    handleEvent(
      {
        ...Object.assign(e),
        target: { value: '' } as unknown,
      } as unknown as InputEvent & {
        currentTarget: HTMLInputElement;
        target: HTMLInputElement;
      },
      local.onChange
    );
  };

  const ImplInput = () => (
    <input
      onKeyDown={handleEnterPress}
      type={local.type}
      value={implValue()}
      onInput={handleOnInput}
      class={mergeCls()}
      disabled={local.disabled}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      {...rest}
    />
  );
  if (needWrapper()) {
    return (
      <FlexBox gap={0} align="center" wrap="nowrap" class={mergeWrapperCls()}>
        {local.prefixIcon}
        <ImplInput />
        {local.allowClear && implValue().length > 0 && (
          <span onClick={handleClearAll} class="sld-input-clear-icon">
            <Clear />
          </span>
        )}
        {local.showCount && rest.maxLength && (
          <span class="sld-input-show-count">{`${implValue().length}/${rest.maxLength}`}</span>
        )}
        {local.suffixIcon}
      </FlexBox>
    );
  }

  return ImplInput();
};
BaseInput.Password = Password;
BaseInput.Search = Search;
BaseInput.TextArea = TextArea;
export default BaseInput;
