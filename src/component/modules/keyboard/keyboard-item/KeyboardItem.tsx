import React, {FC} from "react"

interface KeyboardItemProps extends React.HTMLAttributes<HTMLDivElement>{
    current?:boolean
}
const KeyboardItem:FC<KeyboardItemProps> = ({current=false, className, children, ...rest}) =>{
    return(
        <div {...rest} className={["keyboard-item",current?"current-key":'', className].join(' ')}>
            {children}
        </div>
    )
}
export default KeyboardItem