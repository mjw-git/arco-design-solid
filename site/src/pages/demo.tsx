import { Dropdown, Button, Space, Affix } from 'arco-design-solid';
import { IconDown } from 'arco-solid-icon';
import { createSignal } from 'solid-js';
const style = {
  border: '1px solid var(--color-fill-3)',
  'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  padding: '12px',
  'border-radius': '4px',
};
const App = () => {
  let container: HTMLDivElement;
  let affixRef: HTMLElement;
  return (
    <div
      id="container"
      style={{ height: '200px', overflow: 'auto' }}
      ref={node => {
        container = node;
      }}
    >
      <div
        style={{
          height: '400px',
          'background-color': 'var(--color-fill-2)',
          'background-image': `
            linear-gradient(45deg, var(--color-bg-2) 25%, transparent 0, transparent 75%, var(--color-bg-2) 0),
            linear-gradient(45deg, var(--color-bg-2) 25%, transparent 0, transparent 75%, var(--color-bg-2) 0)`,
          'background-position': `0 0, 15px 15px`,
          'background-size': `30px 30px`,
          overflow: 'hidden',
        }}
      >
        <Affix
          ref={ref => (affixRef = ref)}
          target={() => container}
          offsetTop={20}
          style={{ margin: '40px' }}
          targetContainer={() => window}
        >
          <Button type="primary">Affix in scrolling container</Button>
        </Affix>
      </div>
    </div>
  );
};
export default App;
