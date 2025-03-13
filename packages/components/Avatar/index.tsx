import Avatar from './avatar';

export * from './interface';

type AvatarComponentType = typeof Avatar;

const AvatarComponent = Avatar as AvatarComponentType;

export default AvatarComponent;
