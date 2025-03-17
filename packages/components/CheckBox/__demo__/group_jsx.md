---
order: 3
title:
  zh-CN: 布局
  en-US: Layout
---

## zh-CN

可以通过 `children` 传入 `checkbox`，配合`Grid`组件实现灵活的布局。

## en-US

We can use Checkbox and Grid in Checkbox.Group, to implement complex layout.

```tsx
import { Checkbox, Grid } from 'arco-design-solid';
import { createSignal } from 'solid-js';
const { Col, Row } = Grid;

function App() {
  const [value, setValue] = createSignal(['Option 1', 'Option 2']);
  return (
    <Checkbox.Group value={value()} onChange={setValue}>
      <Row>
        <Col span={8} style={{ 'margin-bottom': '12px' }}>
          <Checkbox value="Option 1">Option 1</Checkbox>
        </Col>
        <Col span={8} style={{ 'margin-bottom': '12px' }}>
          <Checkbox disabled value="Option 2">
            Option 2
          </Checkbox>
        </Col>
        <Col span={8} style={{ 'margin-bottom': '12px' }}>
          <Checkbox value="Option 3">Option 3</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="Option 4">Option 4</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="Option 5">Option 5</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>
  );
}

export default App;

```
