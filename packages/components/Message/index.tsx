import { For, Match, Show, Switch, createSignal, onCleanup } from 'solid-js';
import { createComponent, render } from 'solid-js/web';
import { InnerMessageParams, MessageParams } from './interface';
// import { FlexBox } from '..';
import { ErrorIcon, InfoIcon, Success, Warn } from 'arco-solid-icon';
import FlexBox from '../FlexBox';
const BASE_PREFIX = 'sld-message';
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
    console.log(99);
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

  return (
    <div id="sld-message-container" class={BASE_PREFIX}>
      <div class="sld-message-wrapper ">
        <For each={messageList()}>
          {(item, index) => (
            <FlexBox
              align="center"
              onMouseEnter={() => {
                if (item.timer) {
                  clearTimeout(item.timer);
                }
              }}
              onMouseLeave={e => {
                handleAnimationEnd(e.target, item, index());
              }}
              class={`${CSS_ANIMATION_IN} sld-message-content`}
              onAnimationEnd={e => {
                handleAnimationEnd(e.target, item, index());
              }}
            >
              <Show
                when={!!item.icon}
                fallback={
                  <Switch fallback={<div>Not Found</div>}>
                    <Match when={item.type === 'success'}>
                      <Success class="sld-message-content-success-icon" />
                    </Match>
                    <Match when={item.type === 'warn'}>
                      <Warn class="sld-message-content-warn-icon" />
                    </Match>
                    <Match when={item.type === 'error'}>
                      <ErrorIcon class="sld-message-content-error-icon" />
                    </Match>
                    <Match when={item.type === 'info'}>
                      <InfoIcon class="sld-message-content-info-icon" />
                    </Match>
                  </Switch>
                }
              >
                {item.icon}
              </Show>

              <div class="sld-message-content-text">{item.text}</div>
            </FlexBox>
          )}
        </For>
      </div>
    </div>
  );
};
const init = () => {
  if (!document.querySelector('#sld-message-container '))
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
    warn: (text: string, params?: MessageParams) => {
      addFunction?.({
        text: text,
        type: 'warn',
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
