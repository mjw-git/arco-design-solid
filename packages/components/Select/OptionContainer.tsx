import { ParentComponent, splitProps } from 'solid-js';
import { SelectOptionWrapperProps } from './interface';
import { Portal } from 'solid-js/web';

const OptionContainer: ParentComponent<SelectOptionWrapperProps> = props => {
  const [local, rest] = splitProps(props, ['ref', 'open', 'children']);
  return (
    <Portal mount={document.body}>
      <div
        class="sld-select-option-wrapper"
        ref={local.ref}
        style={{
          position: 'absolute',
          display: local.open ? 'block' : 'none',
        }}
        {...rest}
      >
        {local.children}
      </div>
    </Portal>
  );
};

export default OptionContainer;
