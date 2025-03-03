import { IconProps } from './interface'
import { ParentComponent } from 'solid-js'

const IconRight: ParentComponent<IconProps>&{displayName:string} =(props)=> <svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-right" {...props}><path d="m16 39.513 15.556-15.557L16 8.4" ></path></svg>;
IconRight.displayName = 'IconRight';
export default IconRight;