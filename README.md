<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>
<div align="center">
  <h1>Arco Design Solid</h1>
</div>

<div align="center">

A comprehensive Solid UI components library based on the Arco Design system.

# Feature

All components are written in TypeScript so it's type friendly.

# Installation

```bash
pnpm install arco-design-solid
```

# Example

```typescript
import { render } from 'solid-js/web';
import { Button } from 'arco-design-solid';
import 'arco-design-solid/dist/index.css';

function App() {
  return (
    <Button type='secondary'>
      Hello World
    </Button>
  );
}

render(()=><App />, document.getElementById('app'));
```

# License

This project is [MIT licensed](./LICENSE).
