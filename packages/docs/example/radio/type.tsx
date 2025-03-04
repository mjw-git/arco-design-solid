import { Radio } from 'arco-design-solid';
const RadioGroup = Radio.Group;

const App = () => {
  return (
    <div>
      <RadioGroup
        type="button"
        name="lang"
        defaultValue="Guangzhou"
        style={{ 'margin-right': '20px', 'margin-bottom': '20px' }}
      >
        <Radio value="Beijing">Beijing</Radio>
        <Radio value="Shanghai">Shanghai</Radio>
        <Radio disabled value="Guangzhou">
          Guangzhou
        </Radio>
        <Radio value="Shenzhen">Shenzhen</Radio>
      </RadioGroup>
    </div>
  );
};

export default App;
