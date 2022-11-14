import { useRouter } from "next/router"
import { type } from "os";
import React from "react";

import { useOnClickOutside } from "../../helper/click-outside";
import AlertComponentProps from "../../types/colaboration/alert-component-props";
import ModalWrapper from "../modal-wrapper";

export default function AlertComponent({ isConfirmation, icon, showed, setShowed, title, message }: AlertComponentProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    // click outside handler
    const ref = React.useRef()
    useOnClickOutside(ref, () => {setShowed(false)});
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <ModalWrapper 
        showed = {showed} 
        >
            <div className = "flex flex-col mx-4 mt-9 mb-4">
                {/* image */}
                {/* error
                https://embed.lottiefiles.com/animation/85714
                success
                https://embed.lottiefiles.com/animation/91001
                confirmation
                https://embed.lottiefiles.com/animation/105198 */}
                <iframe src={icon}></iframe>
                
                {/* title */}
                <div className = "mb-2 w-full flex justify-center text-2xl text-black dark:text-white">
                    {title}
                </div>
                {/* message */}
                <div className = "w-full text-[#828282] flex justify-center items-center text-sm dark:text-[#cccccc]">
                    {message}
                </div>
                {/* custom button */}
                <div className = "mt-5 flex flex-row space-x-2 w-full items-center justify-center">
                {isConfirmation ? (
                    <>
                    <div onClick={() => isConfirmation(false)} className=" bg-white border border-[#FF0000] text-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-center">
                        Nope
                    </div>
                    <div onClick={() => isConfirmation(false)} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-white text-center">
                        Okay
                    </div>
                    </>
                ):(
                    <div onClick={() => setShowed(false)} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-white text-center">
                        Okay
                    </div>
                )}
                </div>
            </div>
        </ModalWrapper>
    )
}

  