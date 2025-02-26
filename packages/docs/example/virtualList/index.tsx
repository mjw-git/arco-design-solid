import { VirtualList } from 'arco-design-solid';

const Index = () => {
  const data = new Array(1000).fill(1).map((item, index) => index);
  return (
    <VirtualList itemHeight={50} height={400} data={data}>
      {item => (
        <div
          style={{
            height: '50px',
            border: '1px solid #eee',
            'box-sizing': 'border-box',
          }}
        >
          {item}
        </div>
      )}
    </VirtualList>
  );
};
export default Index;
