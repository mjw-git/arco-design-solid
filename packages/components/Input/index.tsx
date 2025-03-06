import Input from './input';
import Password from './password';
import Search from './search';

const InputElement = Input as typeof Input & {
  Search: typeof Search;
  Password: typeof Password;
};
InputElement.Search = Search;
InputElement.Password = Password;

export default InputElement;
