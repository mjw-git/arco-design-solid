import BaseInput from '.';
import { SearchIcon } from 'arco-solid-icon';
import Button from '../Button';
import FlexBox from '../FlexBox';
import { SearchInputProps } from './interface';
import { splitProps } from 'solid-js';

const Search: SearchInputProps = props => {
  const [local, rest] = splitProps(props, ['onSearch', 'onEnterPress', 'ref']);
  let inputRef: HTMLInputElement | undefined;
  return (
    <FlexBox class="sld-input-search-container" wrap="nowrap" gap={0}>
      <BaseInput
        onEnterPress={() => {
          local.onSearch?.(inputRef?.value || '');
          local.onEnterPress?.(inputRef?.value || '');
        }}
        ref={inputRef}
        {...rest}
      />
      <Button
        onClick={() => {
          local.onSearch?.(inputRef?.value || '');
        }}
        class="sld-input-search-btn"
      >
        <SearchIcon />
      </Button>
    </FlexBox>
  );
};
export default Search;
