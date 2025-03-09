import { Avatar, Typography, Space } from 'arco-design-solid';
import { IconUser } from 'arco-solid-icon';
const { Text } = Typography;

const App = () => {
  return (
    <Space size="large">
      <Avatar>A</Avatar>
      <Avatar style={{ 'background-color': '#3370ff' }}>
        <IconUser />
      </Avatar>
      <Avatar style={{ 'background-color': '#14a9f8' }}>Arco</Avatar>
      <Avatar style={{ 'background-color': '#00d0b6' }}>Design</Avatar>
      <Avatar>
        <img
          alt="avatar"
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </Avatar>
    </Space>
  );
};

export default App;
