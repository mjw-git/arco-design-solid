import { Tag, Space } from 'arco-design-solid';
import { IconGitlab, IconTwitter, IconGithub, IconFacebook } from 'arco-solid-icon';

const App = () => {
  return (
    <Space size="large">
      <Tag color="gray" icon={<IconGithub />}>
        Github
      </Tag>
      <Tag color="orangered" icon={<IconGitlab />}>
        Gitlab
      </Tag>
      <Tag color="blue" icon={<IconTwitter />}>
        Twitter
      </Tag>
      <Tag color="arcoblue" icon={<IconFacebook />}>
        Facebook
      </Tag>
    </Space>
  );
};

export default App;
