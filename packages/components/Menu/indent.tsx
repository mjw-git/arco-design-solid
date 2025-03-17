import { useContext } from 'solid-js';
import MenuContext from './context';

export default function MenuIndent(props: { prefixCls: string; level?: number }) {
  const { prefixCls } = props;
  const { collapse } = useContext(MenuContext);

  return !collapse?.() && props.level ? (
    <span>
      {[...new Array(props.level)].map(_ => {
        return <span class={`${prefixCls}-indent`} />;
      })}
    </span>
  ) : null;
}
