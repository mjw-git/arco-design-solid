import { Avatar, Space } from 'arco-design-solid';
import { IconUser, IconCamera, IconEdit, IconClose } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size="large">
      <Avatar
        triggerIcon={<IconCamera />}
        triggerIconStyle={{
          color: '#3491FA',
        }}
        autoFixFontSize={false}
        style={{
          'background-color': '#168CFF',
        }}
      >
        A
      </Avatar>
      <Avatar triggerIcon={<IconEdit />} style={{ 'background-color': '#14C9C9' }}>
        <IconUser />
      </Avatar>
      <Avatar shape="square" triggerIcon={<IconEdit />} style={{ 'background-color': '#FFC72E' }}>
        <IconUser />
      </Avatar>
      <Avatar triggerIcon={<IconCamera />} triggerType="mask">
        <img
          alt="avatar"
          src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </Avatar>
    </Space>
  );
};

export default App;
