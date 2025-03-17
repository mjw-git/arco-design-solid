---
order: 4
title:
  zh-CN: 全选
  en-US: Check all
---

## zh-CN

通过 `indeterminate` 属性可以实现半选效果。

## en-US

The indeterminate effect can be achieved with `indeterminate=true`

```tsx
import { Checkbox } from 'arco-design-solid';
import { createSignal } from 'solid-js';
// const CheckboxGroup = Checkbox.Group;
// const options = ['Option 1', 'Option 2', 'Option 3'];

function App() {
  const [indeterminate, setIndeterminate] = createSignal(true);
  const [checkAll, setCheckAll] = createSignal(false);
  const [value, setValue] = createSignal([0, 1]);

  function onChangeAll(checked) {
    if (checked) {
      setIndeterminate(false);
      setCheckAll(true);
      setValue([0, 1, 2]);
    } else {
      setIndeterminate(false);
      setCheckAll(false);
      setValue([]);
    }
  }

  function onChange(checkList) {
    setIndeterminate(!!(checkList.length && checkList.length !== options.length));
    setCheckAll(!!(checkList.length === options.length));
    setValue(checkList);
  }

  return (
    <div>
      <div style={{ 'margin-bottom': '16px' }}>
        <Checkbox onChange={onChangeAll} checked={checkAll()} indeterminate={indeterminate()}>
          {checkAll() ? 'unCheck All' : 'Check All'}
        </Checkbox>
      </div>
      <CheckboxGroup
        value={value()}
        options={options.map((x, i) => ({
          label: x,
          value: i,
        }))}
        onChange={onChange}
      />
    </div>
  );
}

export default App;

```
