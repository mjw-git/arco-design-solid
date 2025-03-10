import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconFacebook: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-facebook','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" class={mergeCls()} {...rest}><path fill="currentColor" stroke="none" d="M35.184 15.727 34.312 24h-6.613v24h-9.933V24h-4.95v-8.273h4.95v-4.98C17.766 4.016 20.564 0 28.518 0h6.61v8.273H30.99c-3.086 0-3.292 1.166-3.292 3.32v4.134h7.485Z" ></path></svg>
};
IconFacebook.displayName = 'IconFacebook';
export default IconFacebook;