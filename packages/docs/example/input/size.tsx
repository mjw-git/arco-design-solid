import { Input, Radio, Select, Typography } from 'arco-design-solid';
import { InputProps } from 'arco-design-solid/es/Input/interface';
import { IconClockCircle, IconSearch, IconInfoCircle } from 'arco-solid-icon';
import { createSignal } from 'solid-js';

const RadioGroup = Radio.Group;
const InputSearch = Input.Search;
const App = () => {
  const [size, setSize] = createSignal<InputProps['size']>('default');
  const handleChange = (val: InputProps['size']) => {
    setSize(val);
  };
  return (
    <div>
      <RadioGroup
        type="button"
        mode="fill"
        name="size"
        value={size()}
        onChange={handleChange}
        style={{ 'margin-bottom': '24px' }}
      >
        {['mini', 'small', 'default', 'large'].map(x => {
          return <Radio value={x}>{x}</Radio>;
        })}
      </RadioGroup>
      <div>
        <Input
          size={size()}
          style={{ width: '350px', margin: '12px' }}
          prefix={<IconClockCircle />}
          placeholder="Enter something"
        />
        <Input
          size={size()}
          style={{ width: '350px', margin: '12px' }}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
      </div>
      <div>
        <Input
          size={size()}
          style={{ width: '350px', margin: '12px' }}
          addAfter="KG"
          placeholder="Enter something"
        />
        <Input
          size={size()}
          style={{ width: '350px', margin: '12px' }}
          addBefore="+86"
          placeholder="Enter phone number"
        />
      </div>
      <div>
        {/* <Input
          size={size()}
          style={{ width: '350px', margin: '12px' }}
          addBefore="+86"
          addAfter={<IconSearch />}
          prefix={<IconClockCircle />}
          suffix={<IconInfoCircle />}
          allowClear
          placeholder="Enter phone number"
        /> */}
        {/* <InputSearch
          size={size()}
          placeholder="Enter something"
          style={{ width: '350px', margin: '12px' }}
          searchButton={true}
        /> */}
      </div>
    </div>
  );
};
export default App;
