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
import Loading from "../loading";
import { UserRegisterProvider } from "../../models/auth/user-register-provider";
import { requestLoginWithProvider } from "../../api/auth/request-login-with-provider";
import { checkDataModelEmpty } from "../../helper/common/check-data-model-empty";
import { useOnClickOutside } from "../../helper/click-outside";
import { CityModel } from "../../models/city-model";
import { getCity_json } from "../../api/get-list-city";
import { InputSelectComponent } from "../imput/input-select-component";

export default function RegisterProviderModal({ deviceToken, showed, setShowed, loading, providerType, user, idTokenFirebase }: RegisterProviderModalProps): JSX.Element {
    const router = useRouter()
    const { redirect, pn } = router.query;
    const ref = React.useRef();
    useOnClickOutside(ref, () => setShowed(false));
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    const [ userProvider, setUserProvider ] = React.useState<UserRegisterProvider>(new UserRegisterProvider())
    const [ isChecked, setIsChecked ] = React.useState<boolean>(true)
    const [ isLoading, setIsLoading] = React.useState<boolean>(false)
    const {isAuth, setAuth} = React.useContext(AppAuthContext)

    const [listCity, setListCity] = React.useState<CityModel[]>([])
    const [loadingCity, setLoadingCity] = React.useState<boolean>(false)
    
    React.useEffect(() => {
        setUserProvider({...userProvider, firebaseUser: user})
    }, [user])
    
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

        const requestSignIn = await requestLoginWithProvider(providerType, idTokenFirebase, 
            {...userProvider, firebaseUser: user, status: "register"})

        if (requestSignIn.status == 'success') {

            // Next -> get data profile user 
            getDataProfile(requestSignIn.token)

        } else {
                
            responseErrorHandler(requestSignIn, (message) => {
                alert(message)
            })
        }
    }

    async function getDataProfile(token: string) {

        const response = await requestDataProfileUser(token, deviceToken)

        if (response) {
            setIsLoading(false)
            
            if (response.status == 'success') {
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

                responseErrorHandler(response, (message) => {
                    alert(message)
                })
            }
        }
    }

    const checkCompleteData = (callback: () => void) => {
        console.log(userProvider)
        if (!isChecked || checkDataModelEmpty(userProvider)) {
            setShowValidInput(true)
            return;
        }
        
        if (userProvider.phoneNumber == "") {
            alert("silahkan isi nomor telpon anda")
            return;
        }

        callback();
    }

    return (
        <>
        <Loading showed={isLoading} />
        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-1/4'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed top-0 flex justify-center z-40`}>
            <div ref={ref} className =  "flex flex-col px-5 py-3 bg-white w-full mx-2 sm:mx-0 sm:w-2/3 lg:w-1/3 z-50">              
                {/* title */}
                <div className = "text-3xl mb-4 flex items-center justify-center"> Daftar</div>
                <InputDefaultComponent 
                    label="Username"
                    placeholder="Username"
                    onChange={(val) => setUserProvider({...userProvider, username: val})}
                    value={userProvider.username}
                    showValidInput={showValidInput}
                />
                <InputDefaultComponent 
                    label="Phone Number"
                    placeholder="Phone Number"
                    onChange={(val) => setUserProvider({...userProvider, phoneNumber: val})}
                    value={userProvider.phoneNumber}
                    showValidInput={showValidInput}
                />
                <InputSelectComponent
                    placeHolder="Pilih Domisili"
                    list={listCity}
                    value = "id" // define key for value
                    label = "city" // define key for label
                    fetchData = {(val) => val? getCity("") : setListCity([])}
                    onSelect={(val) => {
                        setUserProvider({...userProvider, domisile: val.id})
                    }}
                    onSearch = {(keyword) => getCity(keyword)}
                    loading = {loadingCity}
                />

                    <div onClick={() => checkCompleteData(() => onRegister())} className=" bg-[#FF0000] px-4 py-1">
                        Lanjutkan
                    </div>
            </div>
        </div>
        </>
    )
}

  