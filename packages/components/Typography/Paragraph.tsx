import { ParentComponent, splitProps } from 'solid-js';
import { TypographyParagraphProps } from './interface';
import Base, { BASE_PREFIX } from './Base';
import cs from '../utils/classNames';

const Paragraph: ParentComponent<TypographyParagraphProps> = props => {
  const [local, rest] = splitProps(props, ['spacing', 'class']);
  const mergeCls = () =>
    cs(local.class, {
      [`${BASE_PREFIX}-spacing-${local.spacing}`]: local.spacing === 'close',
    });
  return <Base class={mergeCls()} {...rest} componentType="Paragraph" />;
};
export default Paragraph;
