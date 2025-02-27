import Base from './Base';
import Title from './Title';
import Text from './Text';
import Paragraph from './Paragraph';
const Typography = Base as typeof Base & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
};
Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
export default Typography;
