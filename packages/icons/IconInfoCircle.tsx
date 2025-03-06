import { IconProps } from './interface'
import { ParentComponent } from 'solid-js'

const IconInfoCircle: ParentComponent<IconProps>&{displayName:string} =(props)=> <svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-infoCircle" {...props}><path d="M24 20v14m0-16v-4m18 10c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6s18 8.059 18 18Z" ></path></svg>;
IconInfoCircle.displayName = 'IconInfoCircle';
export default IconInfoCircle;