import { Radio } from 'arco-design-solid';
const RadioGroup = Radio.Group;

const App = () => {
  return (
    <div>
      <RadioGroup defaultValue="a" style={{ 'margin-bottom': '20px' }}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </RadioGroup>
      <br />
      <RadioGroup options={['A', 'B', 'C', 'D']} style={{ 'margin-bottom': '20px' }} />
      <br />
      <RadioGroup
        options={[
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
          },
          {
            label: 'C',
            value: 'c',
          },
          {
            label: 'D',
            value: 'd',
            disabled: true,
          },
        ]}
      />
    </div>
  );
};

export default App;
