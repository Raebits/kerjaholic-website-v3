import { useRouter } from "next/router"
import React, { Children } from "react"

import LoginModalProps from "../types/auth/login-modal-props"
import Loading from "./loading";
import { useOnClickOutside } from "../helper/click-outside";
import ModalWrapperProps from "../types/modal-wrapper-props";

export default function ModalWrapper ({ children, showed, setShowed, loading, extendClass, closeOutsideClick }: ModalWrapperProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    // click outside handler
    const ref = React.useRef()
    useOnClickOutside(ref, () => {setShowed(false)});

    return (
        <>
        <Loading showed={loading} text={"Loading ..."} />
        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        {/* overflow-y-hidden digunakan untuk menghindari modal showed ketika tinggi layar mengecil. */}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-none'} overflow-y-hidden bg-opacity-60 transition transform ease-in-out duration-500 w-full fixed -top-0 flex justify-center items-center h-screen z-40`}>
            {closeOutsideClick ? (
                <div ref = {ref} className = {`${extendClass}`}>
                    {children}
                </div>
            ) : (
                <div className = {`${extendClass}`}>
                    {children}
                </div>
            )}
            
        </div>
           
        </>
    )
}

  