import { CheckBox } from 'arco-design-solid';

const Group = () => {
  return (
    <CheckBox.Group
      onChange={e => {
        console.log(e);
      }}
      value={['orange']}
    >
      <CheckBox value="apple">苹果</CheckBox>
      <CheckBox value="banana">香蕉</CheckBox>
      <CheckBox value="orange">橘子</CheckBox>
    </CheckBox.Group>
  );
};

export default Group;
