import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconMinus: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-minus','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class={mergeCls()} {...rest}><path d="M5 24h38" ></path></svg>
};
IconMinus.displayName = 'IconMinus';
export default IconMinus;