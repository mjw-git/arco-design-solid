import { Tag } from 'arco-design-solid';

const App = () => {
  return (
    <Tag
      closable
      onClose={() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() >= 0.5) {
              resolve({});
            } else {
              alert('Close failed');
              //   Message.error('Close failed');
              reject();
            }
          }, 3000);
        });
      }}
    >
      Tag 1
    </Tag>
  );
};

export default App;
