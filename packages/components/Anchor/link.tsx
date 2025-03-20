import {
  createEffect,
  mergeProps,
  onCleanup,
  ParentComponent,
  splitProps,
  useContext,
} from 'solid-js';
import { AnchorLinkProps } from './interface';
import { isNull, isString, isUndefined } from '../utils';
import cs from '../utils/classNames';
import AnchorContext from './context';

const defaultProps = {
  href: '#',
};
const prefixCls = 'arco-anchor-link';

const Link: ParentComponent<AnchorLinkProps> = props => {
  const anchorContext = useContext(AnchorContext);
  const merge = mergeProps(defaultProps, props);
  let linkRef: HTMLDivElement;
  const [local, rest] = splitProps(merge, ['href', 'class', 'children', 'style', 'title']);

  createEffect(() => {
    anchorContext?.addLink && anchorContext.addLink(local.href, linkRef);
  });

  onCleanup(() => {
    anchorContext?.removeLink && anchorContext?.removeLink(local.href);
  });

  const mergeCls = () =>
    cs(
      prefixCls,
      {
        [`${prefixCls}-active`]: anchorContext?.currentLink() === local.href,
      },
      local.class
    );

  return (
    <div class={mergeCls()} style={local.style} ref={el => (linkRef = el)} {...rest}>
      {!isUndefined(local.title) && !isNull(local.title) && (
        <a
          class={`${prefixCls}-title`}
          title={isString(local.title) ? local.title : ''}
          href={local.href}
          data-href={local.href}
          onClick={e => {
            anchorContext?.onLinkClick && anchorContext?.onLinkClick(e, local.href);
          }}
        >
          {local.title}
        </a>
      )}
      {local.children && anchorContext?.direction !== 'horizontal' && local.children}
    </div>
  );
};

export default Link;
