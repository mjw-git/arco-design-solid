---
order: 6
title:
  zh-CN: 异步关闭
  en-US: Close async
---

## zh-CN

如果 `onClose` 返回一个 `Promise`，可以异步关闭标签，并且在未关闭时展示加载效果。

## en-US

If `onClose` returns a `Promise`, the tag can be closed asynchronously and the loading effect will be displayed when it is not closed.

```tsx
import { Tag } from 'arco-design-solid';

const App = () => {
  return (
    <Tag
      closable
      onClose={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() >= 0.5) {
              resolve({});
            } else {
              alert('Close failed');
              //   Message.error('Close failed');
              reject();
            }
          }, 3000);
        });
      }}
    >
      Tag 1
    </Tag>
  );
};

export default App;

```
