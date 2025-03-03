import { IconProps } from './interface'
import { ParentComponent } from 'solid-js'

const IconLeft: ParentComponent<IconProps>&{displayName:string} =(props)=> <svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-left" {...props}><path d="M32 8.4 16.444 23.956 32 39.513" ></path></svg>;
IconLeft.displayName = 'IconLeft';
export default IconLeft;