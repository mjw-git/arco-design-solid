import { ParentComponent, splitProps } from 'solid-js';
import { ContentProps } from './interface';
import cs from '../utils/classNames';
const BASE_PREFIX = 'arco-layout-content';
const Content: ParentComponent<ContentProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  const mergeCls = () => cs(BASE_PREFIX, local.class);
  return (
    <main class={mergeCls()} {...rest}>
      {local.children}
    </main>
  );
};
export default Content;
