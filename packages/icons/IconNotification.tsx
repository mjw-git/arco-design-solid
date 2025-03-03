import { IconProps } from './interface'
import { ParentComponent } from 'solid-js'

const IconNotification: ParentComponent<IconProps>&{displayName:string} =(props)=> <svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-notification" {...props}><path d="M24 9c7.18 0 13 5.82 13 13v13H11V22c0-7.18 5.82-13 13-13Zm0 0V4M6 35h36m-25 7h14" ></path></svg>;
IconNotification.displayName = 'IconNotification';
export default IconNotification;