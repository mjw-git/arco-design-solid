import { Button, CopyClickBoard } from 'arco-design-solid';

const Basic = () => {
  return (
    <>
      <Button
        onClick={() => {
          CopyClickBoard.$copy('复制');
        }}
      >
        复制
      </Button>
    </>
  );
};
export default Basic;
