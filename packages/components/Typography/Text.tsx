import { ParentComponent } from 'solid-js';
import { TypographyTitleProps } from './interface';
import Base from './Base';

const Text: ParentComponent<TypographyTitleProps> = props => {
  return <Base {...props} componentType="Text" />;
};
export default Text;
