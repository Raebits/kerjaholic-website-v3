import { useRouter } from "next/router"
import React from "react"
import { requestDataProfileUser } from "../../api/profile/request-data-profile-user";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { saveDataProfileLocal } from "../../helper/profile/save-data-profile-local";
import { UserRegisterEmail } from "../../models/auth/user-register-email";
import RegisterProviderModalProps from "../../types/auth/register-provider-modal-props";
import AppAuthContext from "../../utils/context/auth-context"
import { InputDefaultComponent } from "../input/input-default-component";
import { BtnLoginEmailComponent } from "./btn-login-email-component";
import { BtnLoginGoogleComponent } from "./btn-login-google-component";
import Loading from "../loading";
import { UserRegisterProvider } from "../../models/auth/user-register-provider";
import { requestLoginWithProvider } from "../../api/auth/request-login-with-provider";
import { checkDataModelEmpty } from "../../helper/common/check-data-model-empty";
import { useOnClickOutside } from "../../helper/click-outside";
import { CityModel } from "../../models/city-model";
import { getCity_json } from "../../api/get-list-city";
import { InputSelectComponent } from "../input/input-select-component";
import { InputPhoneComponent } from "../input/input-phone-component";

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
        <Loading showed={isLoading} text={"Loading ..."} />
        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-500 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-1/4'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed -top-20 flex justify-center z-40`}>
            <div ref={ref} className =  "flex flex-col px-5 py-3 bg-white w-full mx-2 sm:mx-0 sm:w-2/3 lg:w-1/3 z-50">              
                {/* title */}
                <div className = "text-3xl mb-4 flex items-center justify-center"> Daftar</div>
                    <InputDefaultComponent 
                        title="Username"
                        placeholder="Username"
                        onChange={(val) => setUserProvider({...userProvider, username: val})}
                        value={userProvider.username}
                        showValidInput={showValidInput}
                        showTitle = {true}
                    />
                    <InputPhoneComponent 
                        title="Nomor Telepon"
                        placeholder="Nomor Telepon : Eg 08960820XXXX"
                        type="tel"
                        onChange={(val) => setUserProvider({...userProvider, phoneNumber: val})}
                        value={userProvider.phoneNumber}
                        showValidInput={showValidInput}
                        showTitle = {true}
                    />
                    <InputSelectComponent
                        title = "Domisili" // title inputan
                        showTitle = {false} // show title ??
                        showValidInput={showValidInput} // validation message
                        list={listCity} // list city fetching when select clicked
                        keyValue = "id" // mau ambil key apa dinamis tergantung list untuk nilai value nya
                        keyLabel = "city" // mau ambil key apa dinamis tergantung list untuk nilai label nya
                        value = {userProvider.domisile} // for set value from database
                        label = {listCity.filter(obj => obj["id"] == userProvider.domisile)[0]?.city} // for set label from database
                        fetchData = {(val) => val? getCity("") : setListCity([])}
                        loading = {loadingCity} // loading when fetching
                        onSelect={(val) => {
                            setUserProvider({...userProvider, domisile: val.id})
                        }}
                        onSearch = {(keyword) => getCity(keyword)} // when search then re fetching data
                    />
                    <div onClick={() => checkCompleteData(() => onRegister())} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-full text-white text-center">
                        Lanjutkan
                    </div>
            </div>
        </div>
        </>
    )
}

  