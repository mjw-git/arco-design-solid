import { IconProps } from './interface'
import { ParentComponent,splitProps } from 'solid-js'
import cs from './utils/classNames'
const IconStar: ParentComponent<IconProps>&{displayName:string} =(props)=>{
     const [local,rest]=splitProps(props,['class'])

     const mergeCls=()=>cs(local.class,'arco-icon-star','arco-icon')

    return<svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" class={mergeCls()} {...rest}><path d="M22.552 6.908a.5.5 0 0 1 .896 0l5.02 10.17a.5.5 0 0 0 .376.274l11.224 1.631a.5.5 0 0 1 .277.853l-8.122 7.916a.5.5 0 0 0-.143.443l1.917 11.178a.5.5 0 0 1-.726.527l-10.038-5.278a.5.5 0 0 0-.466 0L12.73 39.9a.5.5 0 0 1-.726-.527l1.918-11.178a.5.5 0 0 0-.144-.443l-8.122-7.916a.5.5 0 0 1 .278-.853l11.223-1.63a.5.5 0 0 0 .376-.274l5.02-10.17Z" ></path></svg>
};
IconStar.displayName = 'IconStar';
export default IconStar;