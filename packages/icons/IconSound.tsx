import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconSound: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-sound','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" style="font-size: 32px;" class={mergeCls()} {...rest}><path stroke-linejoin="round" d="m14 16 10-9v34l-10-9H6V16h8Z" ></path><path d="M31.071 16.929c3.905 3.905 3.905 10.237 0 14.142M36.727 11.272c7.03 7.03 7.03 18.426 0 25.456" ></path></svg>
};
IconSound.displayName = 'IconSound';
export default IconSound;