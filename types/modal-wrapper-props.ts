import React from "react"
import { useOnClickOutside } from "../helper/click-outside"

type ModalWrapperProps = {
    children: React.ReactNode,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    loading?: boolean,
    clickOutsideHandler?: boolean
    extendClass?: string
    closeOutsideClick?: boolean
}
  
export default ModalWrapperProps