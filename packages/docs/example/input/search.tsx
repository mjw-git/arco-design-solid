import { Input, message } from 'arco-design-solid';
const Search = () => {
  return (
    <Input.Search
      onSearch={e => {
        message.info(e);
      }}
      style={{ width: '200px' }}
      placeholder="请输入"
    />
  );
};
export default Search;
