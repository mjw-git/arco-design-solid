import { Tag, Space } from 'arco-design-solid';
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const App = () => {
  return (
    <Space wrap>
      <Tag bordered>Default</Tag>
      {COLORS.map((color, i) => (
        <Tag color={color} bordered>
          {color}
        </Tag>
      ))}
    </Space>
  );
};

export default App;
