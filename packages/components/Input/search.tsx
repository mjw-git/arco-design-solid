import { createEffect, createSignal, ParentComponent, splitProps } from 'solid-js';
import { InputSearchProps } from './interface';
import { isObject } from '../utils';
import Input, { formatValue } from './input';
import cs from '../utils/classNames';
import Button from '../Button';
import { IconLoading, IconSearch } from 'arco-solid-icon';
const BASE_PREFIX = 'arco-input-search';

const Search: ParentComponent<InputSearchProps> = props => {
  const [local, rest] = splitProps(props, [
    'maxLength',
    'value',
    'searchButton',
    'class',
    'defaultValue',
    'disabled',
    'addAfter',
    'suffix',
    'placeholder',
    'onSearch',
    'loading',
  ]);

  const trueMaxLength = () =>
    isObject(local.maxLength) ? local.maxLength.length : local.maxLength;

  const mergedMaxLength = () =>
    isObject(local.maxLength) && local.maxLength.length ? undefined : trueMaxLength();

  const [value, setValue] = createSignal(
    'defaultValue' in props ? formatValue(props.defaultValue, mergedMaxLength()) : undefined
  );

  createEffect(() => {
    setValue(local.value !== undefined ? formatValue(local.value, mergedMaxLength()) : undefined);
  });

  const mergeCls = () =>
    cs(BASE_PREFIX, { [`${BASE_PREFIX}-button`]: local.searchButton }, local.class);

  const onSearch = () => {
    !local.disabled && props.onSearch && props.onSearch(value()!);
  };

  return (
    <Input
      {...rest}
      placeholder={local.placeholder}
      disabled={local.disabled}
      onChange={(value, e) => {
        setValue(value);
        props.onChange && props.onChange(value, e);
      }}
      addAfter={
        local.addAfter !== undefined ? (
          local.addAfter
        ) : local.searchButton ? (
          <Button
            disabled={local.disabled}
            size={rest.size}
            class={`${BASE_PREFIX}-btn`}
            type="primary"
            onClick={onSearch}
            loading={local.loading}
            loadingFixedWidth
            icon={local.searchButton === true && !local.loading && <IconSearch />}
          >
            {local.searchButton !== true && local.searchButton}
          </Button>
        ) : null
      }
      suffix={
        local.suffix !== undefined
          ? local.suffix
          : !local.searchButton &&
            (local.loading ? <IconLoading /> : <IconSearch onClick={onSearch} />)
      }
      onPressEnter={e => {
        onSearch();
        props.onPressEnter && props.onPressEnter(e);
      }}
      class={mergeCls()}
    ></Input>
  );
};
export default Search;
