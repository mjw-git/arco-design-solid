import { Component, JSX, Show, createSignal, onCleanup, splitProps } from 'solid-js';
import { SelectProps } from './interface';
import OptionContainer from './OptionContainer';
import Empty from '../Empty';
import VirtualList from '../VirtualList';
import { clickOutside } from '../utils/clickOutside';

const Select: Component<SelectProps> = props => {
  let optionContainerRef: HTMLDivElement | undefined;
  let triggerRef: HTMLDivElement | undefined;
  const [local, rest] = splitProps(props, ['showSearch', 'disabled', 'options']);
  const [selected, setSelected] = createSignal(false);

  onCleanup(() => {
    setSelected(false);
    document.removeEventListener('click', handleClick);
  });

  const handleClick = (e: MouseEvent) => {
    if (selected()) {
      const hasOutsideClick = clickOutside(e)([triggerRef!, optionContainerRef!]);
      if (hasOutsideClick) {
        optionContainerRef?.classList.add('sld-slide-left-leave');
        optionContainerRef?.classList.add('sld-slide-left-leave-active');
      }
    }
  };
  document.addEventListener('click', handleClick);
  const handleOnClickWrapper = () => {
    if (local.disabled) return;
    if (!selected()) {
      optionContainerRef?.classList.add('sld-slide-up-enter');
      optionContainerRef?.classList.add('sld-slide-up-enter-active');
      const rect = triggerRef?.getBoundingClientRect();
      const top = rect?.bottom;
      const left = rect?.left;
      optionContainerRef!.style.width = `${rect?.width}px`;
      optionContainerRef!.style.top = `${
        (top || 0) + (document.documentElement?.scrollTop || 0)
      }px`;
      optionContainerRef!.style.left = `${left}px`;
      setSelected(true);
    } else {
      optionContainerRef?.classList.add('sld-slide-left-leave');
      optionContainerRef?.classList.add('sld-slide-left-leave-active');
    }
  };

  const handleOnAnimationEnd: JSX.CustomEventHandlersCamelCase<HTMLDivElement>['onAnimationEnd'] =
    () => {
      if (optionContainerRef?.classList.contains('sld-slide-up-enter')) {
        optionContainerRef.classList.remove('sld-slide-up-enter');
        optionContainerRef.classList.remove('sld-slide-up-enter-active');
      }
      if (optionContainerRef?.classList.contains('sld-slide-left-leave')) {
        setSelected(false);
        optionContainerRef?.classList.remove('sld-slide-left-leave');
        optionContainerRef?.classList.remove('sld-slide-left-leave-active');
      }
    };
  const optionRender = () => (
    <Show when={(props.options ?? []).length > 0} fallback={<Empty size="small" />}>
      <VirtualList itemHeight={32} height={200} data={local.options || []}>
        {item => <div>{item.label}</div>}
      </VirtualList>
    </Show>
  );
  return (
    <div>
      <div ref={triggerRef} onClick={handleOnClickWrapper} class="sld-select-wrapper" {...rest}>
        <input readOnly={!local.showSearch || local.disabled} class="sld-select-input"></input>
      </div>
      <OptionContainer
        onAnimationEnd={handleOnAnimationEnd}
        open={selected()}
        ref={optionContainerRef}
      >
        {optionRender()}
      </OptionContainer>
    </div>
  );
};
export default Select;
