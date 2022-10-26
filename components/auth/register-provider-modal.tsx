import { useRouter } from "next/router"
import React from "react"
import { requestDataProfileUser } from "../../api/profile/request-data-profile-user";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { saveDataProfileLocal } from "../../helper/profile/save-data-profile-local";
import { UserRegisterEmail } from "../../models/auth/user-register-email";
import RegisterProviderModalProps from "../../types/auth/register-provider-modal-props";
import AppAuthContext from "../../utils/context/auth-context"
import { InputDefaultComponent } from "../imput/imput-default-component";
import { BtnLoginEmailComponent } from "./btn-login-email-component";
import { BtnLoginGoogleComponent } from "./btn-login-google-component";

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

export default function RegisterProviderModal({ deviceToken, showed, setShowed, loading,user, idTokenFirebase }: RegisterProviderModalProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    const ref = React.useRef();
    useOnClickOutside(ref, () => setShowed(false));
    const [ dataRegister, setDataRegister ] = React.useState<UserRegisterEmail>(new UserRegisterEmail())
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    // Show Hide Password

    React.useEffect(() => {
      console.log(user.email,'user')
      console.log(idTokenFirebase,'token firebase')  
    })

    return (
        <>

        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-1/4'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed top-0 flex justify-center z-40`}>
            <div ref={ref} className =  "flex flex-col px-5 py-3 bg-white w-full mx-2 sm:mx-0 sm:w-2/3 lg:w-1/3 z-50">              
                {/* title */}
                <div className = "text-3xl mb-4 flex items-center justify-center"> Masuk</div>
                <InputDefaultComponent 
                    label="Nama Belakang"
                    placeholder="Nama Belakang"
                    className="col-lg-6 m-0 p-2"
                    onChange={(val) => setDataRegister({...dataRegister, lastName: val})}
                    value={dataRegister.lastName}
                    showValidInput={showValidInput}
                />
            </div>
        </div>
        </>
    )
}

  