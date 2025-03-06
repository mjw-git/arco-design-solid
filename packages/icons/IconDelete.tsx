import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconDelete: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-delete','arco-icon')

    return<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4" class={mergeCls()} {...rest}><path d="M5 11L10.5 11M10.5 11L10.5 40C10.5 40.5523 10.9477 41 11.5 41L36.5 41C37.0523 41 37.5 40.5523 37.5 40V11M10.5 11L16 11M37.5 11L43 11M37.5 11L32 11M16 11V7L32 7V11M16 11L32 11" stroke-linecap="butt" ></path><path d="M20 18V33M28 18V33" stroke-linecap="butt" ></path></svg>
};
IconDelete.displayName = 'IconDelete';
export default IconDelete;