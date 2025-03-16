import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconDown: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-down','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class={mergeCls()} {...rest}><path d="M39.6 17.443 24.043 33 8.487 17.443" ></path></svg>
};
IconDown.displayName = 'IconDown';
export default IconDown;