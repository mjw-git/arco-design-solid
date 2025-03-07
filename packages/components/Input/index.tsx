import Input from './input';
import Password from './password';
import Search from './search';
import TextArea from './textarea';

const InputElement = Input as typeof Input & {
  Search: typeof Search;
  Password: typeof Password;
  TextArea: typeof TextArea;
};
InputElement.Search = Search;
InputElement.Password = Password;
InputElement.TextArea = TextArea;

export default InputElement;
