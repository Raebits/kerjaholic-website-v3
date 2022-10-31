import { useRouter } from "next/router"
import React from "react"
import { getCity_json } from "../../api/get-list-city";
import { requestDataProfileUser } from "../../api/profile/request-data-profile-user";
import { useOnClickOutside } from "../../helper/click-outside";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { saveDataProfileLocal } from "../../helper/profile/save-data-profile-local";
import { UserRegisterEmail } from "../../models/auth/user-register-email";
import { CityModel } from "../../models/city-model";
import RegisterEmailModalProps from "../../types/auth/register-email-modal-props";
import AppAuthContext from "../../utils/context/auth-context"
import { InputDefaultComponent } from "../imput/imput-default-component";
import { InputDateComponent } from "../imput/input-date-component";
import { InputPasswordComponent } from "../imput/input-password-component";
import { InputSelectComponent } from "../imput/input-select-component";
import { BtnLoginEmailComponent } from "./btn-login-email-component";
import { BtnLoginGoogleComponent } from "./btn-login-google-component";
import Loading from "../loading";
import { requestRegisterWithEmail } from "../../api/auth/request-register-with-email";
import { checkDataModelEmpty } from "../../helper/common/check-data-model-empty";
import { isValidEmail } from "../../helper/auth/is-valid-email";
import { InputCheckboxComponent } from "../imput/input-checkbox-component";
import { InputPhoneComponent } from "../imput/imput-phone-component";


export default function RegisterEmailModal({ deviceToken, showed, setShowed, loading }: RegisterEmailModalProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    // click outside handler
    const ref = React.useRef()
    useOnClickOutside(ref, () => {setShowed(false)});
    const [ dataRegister, setDataRegister ] = React.useState<UserRegisterEmail>(new UserRegisterEmail())
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    const [listCity, setListCity] = React.useState<CityModel[]>([])
    const [loadingCity, setLoadingCity] = React.useState<boolean>(false)
    const [ isCheckedTerm, setIsCheckedTerm ] = React.useState<boolean>(true)
    const [ isLoading, setIsLoading] = React.useState<boolean>(false)
    const {isAuth, setAuth} = React.useContext(AppAuthContext)

    async function getCity(searchWord){
        await setLoadingCity(true)
        // hit endpoint
        let response = await getCity_json(searchWord as string)
    
    
        if (response) {
                await setListCity(response)
                console.log(response)
                await setLoadingCity(false)
        }

    }

    
    async function onRegister() {

        setIsLoading(true)

        const requestSignIn = await requestRegisterWithEmail(dataRegister)

        if (requestSignIn.status == 'success') {

            // Next -> get data profile user 
            getDataProfile(requestSignIn.token)

        } else {
            setIsLoading(false)
            responseErrorHandler(requestSignIn, (message) => {
                alert(message)
            })
        }
    }
    
    const checkCompleteData = (callback: () => void) => {
        
        if (!isCheckedTerm || checkDataModelEmpty(dataRegister)) {
            setShowValidInput(true)
            return;
        }

        if (!isValidEmail(dataRegister.email)) {
            setShowValidInput(true)
            return;
        }

        

        callback();
    }

    async function getDataProfile(token: string) {

        const response = await requestDataProfileUser(token, "-")

        if (response) {
            setIsLoading(true)
            
            if (response.status == 'success') {

                // save data profile in local
                saveDataProfileLocal(response, token)
                setAuth(true);
                setShowed(false)
                

                if (redirect == "true") {
                    router.replace(pn as string)
                }
                // else{
                //     router.reload()
                // }
                setIsLoading(false)
            }
            else {
                
                setIsLoading(false)
                responseErrorHandler(response, (message) => {
                    alert(message)
                })
            }
        }
    }

    return (
        <>

        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-1/4'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed -top-24 md:top-0 flex justify-center z-40`}>
            <div ref={ref} className =  "flex flex-col px-5 py-3 bg-white dark:bg-gray-800 w-full mx-2 md:mx-8 lg:w-2/3 z-50">

                {/* title */}
                <div className = "text-2xl mb-4 flex items-center justify-center text-black dark:text-white"> Daftar</div>
                <div className = "flex flex-col md:flex-row md:space-x-3">
                    <div className = "w-full md:w-1/2">
                        <InputDefaultComponent 
                            title="Username"
                            placeholder="john_doe"
                            onChange={(val) => setDataRegister({...dataRegister, username: val})}
                            value={dataRegister.username}
                            showValidInput={showValidInput}
                            showTitle = {false}
                        />
                        <InputDefaultComponent 
                            title="Nama"
                            placeholder="Contoh: John Doe"
                            onChange={(val) => setDataRegister({...dataRegister, userName: val, displayName: val})}
                            value={dataRegister.userName}
                            showValidInput={showValidInput}
                            showTitle = {false}
                        />
                        <InputSelectComponent
                            placeHolder="Pilih Domisili"
                            list={listCity}
                            value = "id" // define key for value
                            title = "Domisili" // define key for label
                            label = "city"
                            fetchData = {(val) => val? getCity("") : setListCity([])}
                            onSelect={(val) => {
                                setDataRegister({...dataRegister, domisile: val.id})
                            }}
                            onSearch = {(keyword) => getCity(keyword)}
                            loading = {loadingCity}
                            showValidInput={showValidInput}
                            showTitle = {false}
                        />
                        
                    </div>
                    <div className = "w-full md:w-1/2">
                        <InputDefaultComponent 
                            type="email"
                            title="Alamat Email"
                            placeholder="Alamat Email"
                            onChange={(val) => setDataRegister({...dataRegister, email: val})}
                            value={dataRegister.email}
                            showValidInput={showValidInput}
                            showTitle = {false}
                        />
                        <InputPhoneComponent 
                            title="Nomor Telepon"
                            placeholder="Nomor Telepon : Eg 08960820XXXX"
                            type="tel"
                            onChange={(val) => setDataRegister({...dataRegister, phoneNumber: val})}
                            value={dataRegister.phoneNumber}
                            showValidInput={showValidInput}
                            showTitle = {false}
                        />
                        <InputPasswordComponent 
                            title="Kata Sandi"
                            placeholder="Kata Sandi"
                            onChange={(val) => setDataRegister({...dataRegister, password: val})}
                            showValidInput={showValidInput}
                            showTitle = {false}
                        />
                    </div>
                </div>
                <InputCheckboxComponent
                    onChange={(val) => setIsCheckedTerm(val)}
                    initValue={isCheckedTerm}
                    title="Syarat"
                >
                    <div className = "flex">
                        <div className = "ml-2">
                            <span className="text-xs font-medium text-gray-900 dark:text-gray-300">Dengan mendaftar, saya setuju dengan</span>
           
                            <a className = "text-xs font-medium text-gray-900 dark:text-gray-300" href="https://privacy.kerjaholic.com/term/indo" target="_blank"> {' '} syarat dan ketentuan</a>
                        </div>
                    </div>
                </InputCheckboxComponent>

                <div onClick={() => checkCompleteData(() => onRegister())} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-full text-white text-center">
                    Lanjutkan
                </div>
            </div>
        </div>
        </>
    )
}

  