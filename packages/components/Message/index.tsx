import { For, Match, Show, Switch, createSignal, onCleanup } from 'solid-js';
import { createComponent, render } from 'solid-js/web';
import { InnerMessageParams, MessageParams } from './interface';
import {
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconExclamationCircleFill,
  IconInfoCircleFill,
} from 'arco-solid-icon';

const BASE_PREFIX = 'arco-message';
const DEFAULT_DURATION = 3000;
const CSS_ANIMATION_IN = `${BASE_PREFIX}-animation-in`;
const CSS_ANIMATION_OUT = `${BASE_PREFIX}-animation-out`;

class MessageInstance {
  private static instance: MessageInstance | null;

  public add?: (params: InnerMessageParams) => void;

  constructor(addFn?: (params: InnerMessageParams) => void) {
    if (addFn) this.add = addFn;
  }

  getAdd() {
    return this.add;
  }
  static getInstance(addFn?: (params: any) => void) {
    if (!this.instance) {
      this.instance = new MessageInstance(addFn);
    }
    return this.instance;
  }
}

const Message = () => {
  const [messageList, setMessageList] = createSignal<InnerMessageParams[]>([]);

  const addMessage = (params: InnerMessageParams) => {
    setMessageList(pre => [...pre, params]);
  };

  onCleanup(() => {
    for (const message of messageList()) {
      if (message.timer) {
        clearTimeout(message.timer);
      }
    }
  });

  MessageInstance.getInstance(addMessage);

  const handleAnimationEnd = (
    target: Element,

    item: InnerMessageParams,
    index: number
  ) => {
    const classList = target.classList;
    const itemIndex = index;
    const newMessageList = [...messageList()];
    if (
      classList.contains(CSS_ANIMATION_IN) ||
      (!classList.contains(CSS_ANIMATION_IN) && !classList.contains(CSS_ANIMATION_OUT))
    ) {
      classList.remove(CSS_ANIMATION_IN);
      let timer = setTimeout(() => {
        classList.add(CSS_ANIMATION_OUT);
        newMessageList[index].timer = null;
        clearTimeout(timer);
      }, item.duration || DEFAULT_DURATION);
      newMessageList[index].timer = timer;
      setMessageList(newMessageList);
    } else if (classList.contains(CSS_ANIMATION_OUT)) {
      newMessageList.splice(itemIndex, 1);
      setMessageList(newMessageList);
    }
  };
  // const mergeCls = () => cs(BASE_PREFIX,`${BASE_PREFIX}-${}`);
  return (
    <div id="arco-message-container" class={`${BASE_PREFIX}-wrapper ${BASE_PREFIX}-wrapper-top`}>
      <For each={messageList()}>
        {(item, index) => (
          <div
            class={`${CSS_ANIMATION_IN} ${BASE_PREFIX} ${BASE_PREFIX}-${item.type}`}
            onMouseEnter={() => {
              if (item.timer) {
                clearTimeout(item.timer);
              }
            }}
            onMouseLeave={e => {
              handleAnimationEnd(e.target, item, index());
            }}
            onAnimationEnd={e => {
              handleAnimationEnd(e.target, item, index());
            }}
          >
            <span class={`${BASE_PREFIX}-icon`}>
              <Show
                when={!!item.icon}
                fallback={
                  <Switch fallback={null}>
                    <Match when={item.type === 'success'}>
                      <IconCheckCircleFill />;
                    </Match>
                    <Match when={item.type === 'warning'}>
                      <IconExclamationCircleFill />
                    </Match>
                    <Match when={item.type === 'error'}>
                      <IconCloseCircleFill />
                    </Match>
                    <Match when={item.type === 'info'}>
                      <IconInfoCircleFill />
                    </Match>
                  </Switch>
                }
              >
                {item.icon}
              </Show>
            </span>

            <span class={`${BASE_PREFIX}-content`}>{item.text}</span>
          </div>
        )}
      </For>
    </div>
  );
};
const init = () => {
  if (!document.querySelector('#arco-message-container '))
    render(() => createComponent(Message, {}), document.body);
};

const MessageInit = () => {
  init();
  const instance = MessageInstance.getInstance();
  const addFunction = instance.getAdd();
  return {
    success: (text: string, params?: MessageParams) => {
      addFunction?.({
        text: text,
        type: 'success',
        duration: params?.duration || DEFAULT_DURATION,
        icon: params?.icon,
      });
    },
    normal: (text: string, params?: MessageParams) => {
      addFunction?.({
        text: text,
        type: 'normal',
        duration: params?.duration || DEFAULT_DURATION,
        icon: params?.icon,
      });
    },
    warning: (text: string, params?: MessageParams) => {
      addFunction?.({
        text: text,
        type: 'warning',
        duration: params?.duration || DEFAULT_DURATION,
        icon: params?.icon,
      });
    },
    error: (text: string, params?: MessageParams) => {
      addFunction?.({
        text: text,
        type: 'error',
        duration: params?.duration || DEFAULT_DURATION,
        icon: params?.icon,
      });
    },
    info: (text: string, params?: MessageParams) => {
      addFunction?.({
        text: text,
        type: 'info',
        duration: params?.duration || DEFAULT_DURATION,
        icon: params?.icon,
      });
    },
  };
};
const message = MessageInit();
export default message;
