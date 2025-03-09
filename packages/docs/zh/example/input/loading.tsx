import { Input, Space } from 'arco-design-solid';
const InputSearch = Input.Search;

const App = () => {
  return (
    <Space wrap>
      <InputSearch loading placeholder="Enter keyword to search" style={{ width: '350px' }} />
      <InputSearch
        searchButton
        loading
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: '350px' }}
      />
      <InputSearch
        searchButton="Search"
        loading
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: '350px' }}
      />
    </Space>
  );
};

export default App;
