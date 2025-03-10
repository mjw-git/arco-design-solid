import { Tag, Input, Space } from 'arco-design-solid';
import { IconPlus } from 'arco-solid-icon';
import { batch, createSignal } from 'solid-js';
import './index.less';
function App() {
  let ref: HTMLDivElement;
  const [tags, setTags] = createSignal(['Tag 1', 'Tag 2', 'Tag 3']);
  const [showInput, setShowInput] = createSignal(false);
  const [inputValue, setInputValue] = createSignal('');

  function addTag() {
    if (inputValue()) {
      const newTags = [...tags(), inputValue()];
      batch(() => {
        setTags(newTags);
        setInputValue('');
      });
    }
    setShowInput(false);
  }

  function removeTag(removeTag: any) {
    const newTags = tags().filter(tag => tag !== removeTag);
    setTags(newTags);
  }

  return (
    <Space size={20}>
      {tags().map((tag, index) => {
        return (
          <Tag closable={index !== 0} onClose={() => removeTag(tag)}>
            {tag}
          </Tag>
        );
      })}

      {showInput() ? (
        <Input
          ref={el => (ref = el)}
          size="mini"
          value={inputValue()}
          style={{ width: '84px' }}
          onPressEnter={() => {
            console.log('pressEnter');
            addTag();
          }}
          onBlur={() => {
            console.log('blur', inputValue());
            addTag();
          }}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            width: '84px',
            'background-color': 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
          }}
          class="add-tag"
          tabIndex={0}
          onClick={() => {
            setShowInput(true);
          }}
          onKeyDown={e => {
            const keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
              // enter
              setShowInput(true);
            }
          }}
        >
          Add Tag
        </Tag>
      )}
    </Space>
  );
}

export default App;
