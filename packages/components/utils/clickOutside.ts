export const clickOutside = (e: MouseEvent) => {
    return (refList: HTMLElement[]) => {
        const target = e.target as HTMLElement
        let flag = true
        for (let i = 0; i < refList.length; i++) {
            if (refList[i] === target|| refList[i].contains(target)) {
                flag = false
                break
            }
        }
        return flag
    }

}