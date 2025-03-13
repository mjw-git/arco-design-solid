---
order: 5
title:
  zh-CN: 搜索框
  en-US: Search Box
---

## zh-CN

带有搜索按钮的输入框，用于内容检索。

## en-US

Input box with search button for content retrieval.

```tsx
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

```
