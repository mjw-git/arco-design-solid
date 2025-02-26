import { Radio } from 'arco-design-solid';

const Group = () => {
  return (
    <div>
      <Radio.Group
        onChange={e => {
          console.log(e);
        }}
        value={'apple'}
      >
        <Radio value="apple">苹果</Radio>
        <Radio value="banana">香蕉</Radio>
        <Radio value="orange">橘子</Radio>
      </Radio.Group>
    </div>
  );
};

export default Group;
