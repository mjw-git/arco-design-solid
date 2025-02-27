import { ParentComponent, splitProps } from 'solid-js';
import { TypographyParagraphProps } from './interface';
import Base, { BASE_PREFIX } from './Base';
import classNames from 'classnames';

const Paragraph: ParentComponent<TypographyParagraphProps> = props => {
  const [local, rest] = splitProps(props, ['spacing', 'class']);
  const mergeCls = () =>
    classNames(local.class, {
      [`${BASE_PREFIX}-spacing-${local.spacing}`]: local.spacing === 'close',
    });
  return <Base class={mergeCls()} {...rest} componentType="Paragraph" />;
};
export default Paragraph;
