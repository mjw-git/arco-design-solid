import { IconProps } from './interface'
import { ParentComponent } from 'solid-js'

const IconCamera: ParentComponent<IconProps>&{displayName:string} =(props)=> <svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-camera" {...props}><path d="m33 12-1.862-3.724A.5.5 0 0 0 30.691 8H17.309a.5.5 0 0 0-.447.276L15 12m16 14a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM7 40h34a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1Z" ></path></svg>;
IconCamera.displayName = 'IconCamera';
export default IconCamera;