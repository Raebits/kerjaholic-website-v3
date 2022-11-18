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
import { useOnClickOutside } from "../../helper/click-outside";
import { InputDefaultComponent } from "../input/input-default-component";
import { InputPasswordComponent } from "../input/input-password-component";
import { ProviderAuthType } from "../../enum/auth/provider-auth-type";
import { InputToggleComponent } from "../input/input-toggle-component";
import ModalWrapper from "../modal-wrapper";

export default function LoginModal({ deviceToken, showed, setShowed, showedRegEmail, setShowedRegEmail, showedRegProvider, setShowedRegProvider, loading, setEmailReg, setProviderReg }: LoginModalProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    // click outside handler
    const ref = React.useRef()
    useOnClickOutside(ref, () => {setShowed(false)});
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
                // else{
                //     router.reload()
                // }
            } else {
                responseErrorHandler(response, (message) => {
                    alert(message)
                })
            }
        }
    }

    return (
        <ModalWrapper 
            showed = {showed} 
            setShowed = {(e) => setShowed(e)}
            extendClass = " bg-white dark:bg-gray-800 rounded-md  w-full sm:w-2/3 lg:w-2/5 py-6 px-6 m-4 z-50" 
            closeOutsideClick = {true}
            loading = {isLoading}
        >
            {/* title */}
            <div className = "text-3xl mb-2 flex items-center text-black dark:text-white">
                    Masuk
            </div>
            <div className = "text-sm mb-6 flex items-center text-[#828282] dark:text-white">
                    Selamat Datang di Kerjaholic
            </div>
            {/* username / email */}

            <InputDefaultComponent 
                    onChange={(val) => setEmail(val)} 
                    placeholder="Username" 
                    value={email}
                    showTitle={true}
                    title = "Username"
                />
            {/* Password Field  */}
            <InputPasswordComponent 
                title="Kata Sandi"
                placeholder="Kata Sandi"
                onChange={(val) => setPassword(val)}
                showValidInput={false}
                showTitle = {true}
                value = {password}
            />
            {/* lupa kata sandi  */}
            <div className = "flex justify-center text-sm my-3 px-1 text-black dark:text-white">Lupa Kata Sandi ? <p className = "text-[#ff0000] dark:text-red-300 mx-1">Ya</p></div>
            {/* tombol login manual */}
            {/* Button Login with Email Component  */}
            <div className = "flex items-center justify-center w-full">
                <div className = "w-2/3">
                    <BtnLoginEmailComponent 
                        email={email}
                        password={password}
                        success={(token) => getDataProfile(token)}
                        onLoading={(status) => setIsLoading(status)}
                    />
                </div>
            </div>

            <div className = "mt-2 mb-3 flex text-sm items-center justify-center text-[#CCCCCC]">
                atau login menggunakan
            </div>
            {/* tombol login google  */}
            <div className = "flex items-center justify-center">
                <BtnLoginGoogleComponent 
                    success={(token) => getDataProfile(token)}
                    notFound={(user, token) => {
                        // toggle()
                        // setShowRegisterProvider(true, user, ProviderAuthType.google, token)
                        setProviderReg(true, user,token, ProviderAuthType.google)
                        setShowed(false)
                        console.log(user)
                        console.log
                    }}
                    onLoading={(status) => setIsLoading(status)}
                />
            </div>
            {/* belum memiliki akun  */}
            <div onClick={() => setEmailReg(true)} className = "flex justify-center my-5 text-sm text-[#828282] dark:text-white">Belum Memiliki Akun ? <p className = "text-[#FF0000] dark:text-red-300 mx-1" onClick={() => {setIsEmailRegister(true); setShowed(false)}}>Daftar</p></div>
            
        </ModalWrapper>
    )
}

  