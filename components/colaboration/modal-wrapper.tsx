import { useRouter } from "next/router"
import React, { Children } from "react"

import LoginModalProps from "../../types/auth/login-modal-props"
import Loading from "../loading";
import { useOnClickOutside } from "../../helper/click-outside";
import ModalWrapperProps from "../../types/colaboration/modal-wrapper-props";

export default function ModalWrapper({ children, showed, setShowed, loading }: ModalWrapperProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    // click outside handler
    const ref = React.useRef()
    useOnClickOutside(ref, () => {setShowed(false)});
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <>
        <Loading showed={isLoading} text={"Loading ..."} />
        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-0'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed -top-0 flex justify-center items-center h-screen z-40`}>
            <div ref={ref} className =  " bg-white dark:bg-gray-800 rounded-md  w-full sm:w-2/3 lg:w-1/3 mx-4 z-50">
                {children}
            </div>
        </div>
           
        </>
    )
}

  