import { Input, Divider, Typography } from 'arco-design-solid';

const App = () => {
  return (
    <div>
      <Divider>
        <Typography.Text code>
          {JSON.stringify({ 'min-width': 0, 'max-width': '500px' })}
        </Typography.Text>
      </Divider>

      <Input placeholder="Enter something" autoWidth={{ 'max-width': '500px' }} />

      <Divider>
        <Typography.Text code>
          {JSON.stringify({ 'min-width': '300px', 'max-width': '500px' })}
        </Typography.Text>
      </Divider>

      <Input
        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}
        placeholder="Enter something"
      />
      <br />
      <br />
      <Input
        placeholder="Enter something"
        prefix="Prefix"
        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}
      />
      <br />
      <br />
      <Input
        placeholder="Enter something"
        addBefore="Before"
        prefix="Prefix"
        autoWidth={{ 'min-width': '300px', 'max-width': '500px' }}
      />
    </div>
  );
};

export default App;
