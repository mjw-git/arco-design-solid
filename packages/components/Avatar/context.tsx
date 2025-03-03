import { createContext } from 'solid-js';
import { AvatarProps } from './interface';
const AvatarContext = createContext<AvatarProps>({});
export default AvatarContext;
// const AvatarWrapper:ParentComponent<AvatarProps>=(props)=>{
//     const [local,rest]=splitProps(props,['children'])

//     return <AvatarContext.Provider value={{
//         ...rest
//     }}>{local.children}</AvatarContext.Provider>
// }
