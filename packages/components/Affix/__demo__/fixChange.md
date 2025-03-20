---
order: 3
title:
  zh-CN: 固定状态改变回调
  en-US: Callback
---

## zh-CN

当固定状态发生改变时，会触发事件。

## en-US

Callback when the fixed state changes.

```tsx
import { Affix, Button } from 'arco-design-solid';

const App = () => {
  return (
    <Affix
      offsetBottom={80}
      onChange={(fixed) => {
        console.log(fixed)
      }}
    >
      <Button type="primary">80px to affix bottom</Button>
    </Affix>
  );
};

export default App;
```
