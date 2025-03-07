import { IconProps } from './interface';
import { ParentComponent, splitProps } from 'solid-js';
import cs from './utils/classNames';
const IconEye: ParentComponent<IconProps> & { displayName: string } = props => {
  const [local, rest] = splitProps(props, ['class']);

  const mergeCls = () => cs(local.class, 'arco-icon-eye', 'arco-icon');

  return (
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="4"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      class={mergeCls()}
      {...rest}
    >
      <path
        d="M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z"
        clip-rule="evenodd"
      ></path>
      <path d="M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"></path>
    </svg>
  );
};
IconEye.displayName = 'IconEye';
export default IconEye;
