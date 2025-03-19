import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconUp: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-up','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class={mergeCls()} {...rest}><path d="M39.6 30.557 24.043 15 8.487 30.557" ></path></svg>
};
IconUp.displayName = 'IconUp';
export default IconUp;