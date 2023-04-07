import React, {FC, PropsWithChildren} from "react"

interface ModalProps extends PropsWithChildren{
    open:boolean
}

const Modal:FC<ModalProps> = ({open, children}) => {
    if(!open) return null
    return(
        <div className="modal">
            {children}
        </div>
    )
}

export default Modal