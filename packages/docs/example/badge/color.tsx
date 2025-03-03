import { Badge, Divider } from 'arco-design-solid';
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
const COLORS_CUSTOM = [
  '#F53F3F',
  '#7816FF',
  '#00B42A',
  '#165DFF',
  '#FF7D00',
  '#EB0AA4',
  '#7BC616',
  '#86909C',
  '#B71DE8',
  '#0FC6C2',
  '#FFB400',
  '#168CFF',
  '#FF5722',
];

const App = () => {
  return (
    <div>
      <div>
        {COLORS.map(color => {
          return <Badge color={color} text={color} style={{ 'margin-right': '24px' }}></Badge>;
        })}
      </div>
      <br />
      <div>
        {COLORS_CUSTOM.map(color => {
          return <Badge color={color} text={color} style={{ 'margin-right': '24px' }}></Badge>;
        })}
      </div>
    </div>
  );
};

export default App;
