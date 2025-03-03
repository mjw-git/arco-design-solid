import { Avatar } from 'arco-design-solid';
const AvatarGroup = Avatar.Group;

const App = () => {
  return (
    <div>
      <AvatarGroup size={32} style={{ margin: '10px' }}>
        <Avatar style={{ 'background-color': '#7BC616' }}>A</Avatar>
        <Avatar style={{ 'background-color': '#14C9C9' }}>B</Avatar>
        <Avatar style={{ 'background-color': '#168CFF' }}>C</Avatar>
        <Avatar style={{ 'background-color': '#FF7D00' }}>Arco</Avatar>
        <Avatar style={{ 'background-color': '#FFC72E' }}>Design</Avatar>
      </AvatarGroup>
      <br />
      <AvatarGroup size={24} style={{ margin: '10px' }}>
        <Avatar style={{ 'background-color': '#7BC616' }}>A</Avatar>
        <Avatar style={{ 'background-color': '#14C9C9' }}>B</Avatar>
        <Avatar style={{ 'background-color': '#168CFF' }}>C</Avatar>
        <Avatar style={{ 'background-color': '#FF7D00' }}>Arco</Avatar>
        <Avatar style={{ 'background-color': '#FFC72E' }}>Design</Avatar>
      </AvatarGroup>
    </div>
  );
};

export default App;
