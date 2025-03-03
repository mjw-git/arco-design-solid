import { IconProps } from './interface'
import { ParentComponent } from 'solid-js'

const IconCaretLeft: ParentComponent<IconProps>&{displayName:string} =(props)=> <svg fill="none" stroke="currentColor" stroke-width="4" viewBox="0 0 48 48" aria-hidden="true" focusable="false" stroke-linecap="butt" stroke-linejoin="miter" class="arco-icon arco-icon-caretLeft" {...props}><path fill="currentColor" stroke="none" d="M13.171 24.937a1.2 1.2 0 0 1 0-1.874L30.051 9.56c.785-.629 1.949-.07 1.949.937v27.006c0 1.006-1.164 1.566-1.95.937L13.171 24.937Z" ></path></svg>;
IconCaretLeft.displayName = 'IconCaretLeft';
export default IconCaretLeft;