import {JSX, ParentComponent} from 'solid-js'
interface  CustomCopyClickBoardProps extends JSX.HTMLAttributes<HTMLDivElement>{
    copyText:string
    showSuccessMessage?:boolean
    onSuccess?:()=>void
}
export type CopyClickBoardProps = ParentComponent<CustomCopyClickBoardProps> & {
  $copy: (text: string) => void;
};