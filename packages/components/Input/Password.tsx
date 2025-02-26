import { createSignal } from 'solid-js';
import BaseInput from '.';
import { Hide, Visible } from 'arco-solid-icon';
import { PasswordInputProps } from './interface';

const Password: PasswordInputProps = props => {
  const [show, setShow] = createSignal();
  const [type, setType] = createSignal<'text' | 'password'>('password');

  const handleOnClickShow = () => {
    setShow(pre => !pre);
    setType(pre => (pre === 'password' ? 'text' : 'password'));
  };
  return (
    <BaseInput
      type={type()}
      suffixIcon={
        <span class="sld-input-password-icon" onClick={handleOnClickShow}>
          {show() ? <Hide /> : <Visible />}
        </span>
      }
      {...props}
    />
  );
};
export default Password;
