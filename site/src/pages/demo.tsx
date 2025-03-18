import { Menu, Dropdown, Button } from 'arco-design-solid';
import { IconDown } from 'arco-solid-icon';

const Demo = () => {
  const dropList = (
    <Menu selectable={false}>
      <Menu.Item disabled key="1">
        Beijing
      </Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown
        items={[
          {
            label: '重新开始咯',
            key: 'dd',
            onClick: () => {
              console.log(9999);
            },
          },
        ]}
        position="bl"
      >
        <Button type="text">
          Hover me <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
};
export default Demo;
