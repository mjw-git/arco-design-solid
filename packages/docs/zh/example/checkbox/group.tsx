import { Checkbox } from 'arco-design-solid';
const CheckboxGroup = Checkbox.Group;
const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
    disabled: true,
  },
  {
    label: 'Option 3',
    value: '3',
  },
  {
    label: 'Option 4',
    value: '4',
  },
];

const App = () => {
  return (
    <div>
      <CheckboxGroup
        value={['Option A']}
        options={['Option A', 'Option B', 'Option C']}
        style={{ display: 'block', 'margin-bottom': '16px' }}
      />

      <CheckboxGroup
        options={options}
        defaultValue={['1', '3']}
        style={{ display: 'block', 'margin-bottom': '20px' }}
      />

      <CheckboxGroup direction="vertical" options={['Option A', 'Option B', 'Option C']} />
    </div>
  );
};

export default App;
