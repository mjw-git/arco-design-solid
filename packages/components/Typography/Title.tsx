import { ParentComponent, splitProps } from 'solid-js';
import { TypographyTitleProps } from './interface';
import Base, { BASE_PREFIX } from './Base';
import classNames from 'classnames';

const Title: ParentComponent<TypographyTitleProps> = props => {
  const [local, rest] = splitProps(props, ['children', 'type']);

  return (
    <Base {...rest} componentType="Title">
      {local.children}
    </Base>
  );
};
export default Title;
