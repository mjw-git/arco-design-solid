---
order: 5
title:
  zh-CN: 带图标的开关
  en-US: With Icon
---

## zh-CN

自定义开关按钮上显示的图标。

## en-US

Customize the icon displayed on the switch button.

```tsx
import { Switch, Space } from 'arco-design-solid';
import { IconCheck, IconClose } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size="large">
      <Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} defaultChecked />
      <Switch
        type="round"
        checkedIcon={<IconCheck />}
        uncheckedIcon={<IconClose />}
        defaultChecked
      />
      <Switch
        type="line"
        checkedIcon={<IconCheck />}
        uncheckedIcon={<IconClose />}
        defaultChecked
      />
    </Space>
  );
};

export default App;
```
