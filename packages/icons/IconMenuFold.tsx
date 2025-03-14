import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconMenuFold: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-menuFold','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class={mergeCls()} {...rest}><path d="M42 11H6M42 24H22M42 37H6M13.66 26.912l-4.82-3.118 4.82-3.118v6.236Z" ></path></svg>
};
IconMenuFold.displayName = 'IconMenuFold';
export default IconMenuFold;