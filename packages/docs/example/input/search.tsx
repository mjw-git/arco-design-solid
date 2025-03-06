import { Input, Space } from 'arco-design-solid';
const InputSearch = Input.Search;

const App = () => {
  return (
    <Space wrap>
      <InputSearch allowClear placeholder="Enter keyword to search" style={{ width: '350px' }} />
      <InputSearch
        searchButton
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: '350px' }}
      />
      <InputSearch
        searchButton="Search"
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: '350px' }}
      />
    </Space>
  );
};

export default App;
