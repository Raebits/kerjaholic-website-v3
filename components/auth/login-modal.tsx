import { useRouter } from "next/router"
import React from "react"
import { requestDataProfileUser } from "../../api/profile/request-data-profile-user";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { saveDataProfileLocal } from "../../helper/profile/save-data-profile-local";
import LoginModalProps from "../../types/auth/login-modal-props"
import AppAuthContext from "../../utils/context/auth-context"
import { BtnLoginEmailComponent } from "./btn-login-email-component";
import { BtnLoginGoogleComponent } from "./btn-login-google-component";
import Loading from "../loading";

// Hook
function useOnClickOutside(ref, handler) {
    React.useEffect(
        () => {
            const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
    
            handler(event);
            };
    
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
    
            return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

export default function LoginModal({ deviceToken, showed, setShowed, loading, setEmailReg, setProviderReg }: LoginModalProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    const ref = React.useRef();
    console.log(loading)
    useOnClickOutside(ref, () => setShowed(false));
    // Show Hide Password

    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [isEmailRegister, setIsEmailRegister] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    
    async function getDataProfile(token: string) {
        // loading here
        const response = await requestDataProfileUser(token, deviceToken)

        if (response) {
            
            if (response.status == 'success') {
                // save data profile in local
                saveDataProfileLocal(response, token)
                setAuth(true);
                setShowed(false)
                setIsLoading(false)
                if (redirect == "true") {
                    router.replace(pn as string)
                } 
            } else {
                responseErrorHandler(response, (message) => {
                    console.log(message)
                })
            }
        }
    }

    return (
        <>
        <Loading showed={isLoading} />
        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-1/4'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed top-0 flex justify-center z-40`}>
            <div ref={ref} className =  "flex flex-col px-5 py-3 bg-white dark:bg-gray-800 w-full mx-2 sm:mx-0 sm:w-2/3 lg:w-1/3 z-50">

                {/* title */}
                <div className = "text-3xl mb-4 flex items-center text-black dark:text-white justify-center"> Masuk</div>
                {/* username / email */}
                <input type="text" onChange={(a) => {setEmail(a.target.value)}} placeholder="Alamat Email" value={email} className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 " />
                {/* password  */}
                <input type="text" onChange={(a) => {setPassword(a.target.value)}} placeholder="Password" value={password} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 " />
                {/* lupa kata sandi  */}
                <div className = "flex my-3 px-1 text-black dark:text-white">Lupa Kata Sandi ? <p className = "text-[#ff0000] dark:text-red-300 mx-1">Ya</p></div>
                {/* tombol login manual */}
                {/* Button Login with Email Component  */}
                <BtnLoginEmailComponent 
                        email={email}
                        password={password}
                        success={(token) => getDataProfile(token)}
                        onLoading={(status) => setIsLoading(status)}
                    />
                {/* tombol login google  */}
                <BtnLoginGoogleComponent 
                        success={(token) => getDataProfile(token)}
                        notFound={(user, token) => {
                            // toggle()
                            // setShowRegisterProvider(true, user, ProviderAuthType.google, token)
                            setProviderReg(true, user,token)
                            setShowed(false)
                            console.log(user)
                            console.log
                        }}
                        onLoading={(status) => setIsLoading(status)}
                    />
                {/* belum memiliki akun  */}
                <div onClick={() => setEmailReg(true)} className = "flex my-5 text-black dark:text-white">Belum Memiliki AKun <p className = "text-[#FF0000] dark:text-red-300 mx-1" onClick={() => {setIsEmailRegister(true); setShowed(false)}}>Daftar</p></div>
            </div>
        </div>
           
        </>
    )
}

  