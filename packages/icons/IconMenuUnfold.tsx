import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconMenuUnfold: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-menuUnfold','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class={mergeCls()} {...rest}><path d="M6 11h36M22 24h20M6 37h36M8 20.882 12.819 24 8 27.118v-6.236Z" ></path></svg>
};
IconMenuUnfold.displayName = 'IconMenuUnfold';
export default IconMenuUnfold;