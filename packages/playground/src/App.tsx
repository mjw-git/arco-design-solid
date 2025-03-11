import { createSignal } from 'solid-js';
import solidLogo from './assets/solid.svg';
import viteLogo from '/vite.svg';
import { Button, Input, Trigger } from 'arco-design-solid';
import './arco.less';
import './App.css';
function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <div>
        <Input>312</Input>
        <Button>312</Button>
        <Trigger
          popup={() => <div class="demo-trigger-popup"> 11</div>}
          trigger="click"
          position="bottom"
          classNames="zoomInTop"
        >
          <Button>Click me</Button>
        </Trigger>
        <Trigger
          popup={() => <div class="demo-trigger-popup"> 11</div>}
          trigger="hover"
          position="right"
          classNames="zoomInTop"
        >
          <Button>Hover me</Button>
        </Trigger>
        <Trigger
          popup={() => <div class="demo-trigger-popup"> 11</div>}
          trigger={['hover', 'click', 'focus']}
          position="top"
          classNames="zoomInBottom"
        >
          <Input placeholder="Focus on me" />
        </Trigger>
      </div>
    </>
  );
}

export default App;
