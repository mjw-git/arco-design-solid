import { Tag, Button, Switch, Typography } from 'arco-design-solid';
import { IconStar } from 'arco-solid-icon';
import { createSignal } from 'solid-js';

function App() {
  const [visible, setVisible] = createSignal(true);

  function onClose() {
    setVisible(!visible());
  }

  return (
    <div>
      <Tag closable visible={visible()} onClose={onClose} style={{ margin: '0 24px' }}>
        Tag
      </Tag>
      <Tag icon={<IconStar />} closable visible={visible()} onClose={onClose}>
        Tag
      </Tag>
      <div style={{ 'margin-top': '24px' }}>
        <Switch style={{ margin: '0 8px' }} size="small" checked={visible()} onChange={onClose} />
        <Typography.Text>Toggle</Typography.Text>
      </div>
    </div>
  );
}

export default App;
