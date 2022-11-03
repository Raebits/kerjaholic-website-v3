import React from "react";
import Meta from "./meta"
import { useRouter } from 'next/router';
import LayoutProps from "../types/layout-props";
import FooterSectionHome from "../components/home-index/footer-section-component";
import SeperatorGrayComponent from "./home-index/seperator-gray-component";
import TopNavigationIndex from "./navigation/top-navigation-index";
import AppPreloadContext from "../utils/context/preload-context";
import LoginModal from "./auth/login-modal";
import AppAuthContext from "../utils/context/auth-context";
import Cookies from 'universal-cookie';
import FirebaseConfiguration from '../utils/firebase-config'
import firebase from 'firebase';
import { requestCheckToken } from "../api/auth/request-check-token";
import { saveDataProfileLocal } from "../helper/profile/save-data-profile-local";
import { responseErrorHandler } from "../helper/common/response-request-handler";
import AppDarkContext from "../utils/context/dark-context";
import RegisterEmailModal from "./auth/register-email-modal";
import RegisterProviderModal from "./auth/register-provider-modal";
import { ProviderAuthType } from "../enum/auth/provider-auth-type";

export default function Layout({ children, title, useFooter }: LayoutProps): JSX.Element {
    const router = useRouter();
    const { redirect, pn } = router.query;

    const cookies = new Cookies();
    const [providerAuthType, setProviderAuthType] = React.useState<ProviderAuthType>(null);
    const [ showPopUpMore, setshowPopUpMore ] = React.useState<boolean>()
    const {isPreload, setPreload} = React.useContext(AppPreloadContext)
    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const [loginModal, setLoginModal] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [firebaseToken, setFirebaseToken] = React.useState<string>("-")
    const {isDark, setDark} = React.useContext(AppDarkContext)
    const [isEmailRegister, setIsEmailRegister] = React.useState<boolean>(false)
    const [isProviderRegister, setIsProviderRegister] = React.useState<boolean>(false)
    
    const [userRegisterProvider, setUserRegisterProvider] = React.useState<firebase.User>(null);
    const [idTokenFirebase, setIDTokenFirebase] = React.useState<string>("-");
    
    // handling routes loading on client side 
    if (typeof window !== "undefined") {
        router.events.on('routeChangeStart', (url) => {
            setPreload(true);
        });
    
        router.events.on('routeChangeComplete', (url) => {
            setPreload(false);
        });
    }

    React.useEffect(() => {
        if(localStorage.getItem("darkMode")){
            if(localStorage.getItem("darkMode") === 'true'){
                setDark(true)
            }else{
                setDark(false)
            }
        }else{
            localStorage.setItem("darkMode",'false')
        }
        
    })

    // React.useEffect(() => {
    //     var observer = new IntersectionObserver(function(entries) {
    //         // if(entries[0].isIntersecting === true){
    //         //     console.log('Element is fully visible in screen');
    //         // }else{
    //         //     console.log("element invisible")
    //         // }
    //         console.log(entries[0].isIntersecting)
    //     }, { threshold: [1] });

    //     observer.observe(document.querySelector("#banner"));
    // })

    // all function one time rendered
    React.useEffect(() => {
        // ===== start firebase function =====
        // Firebase Configuration
        FirebaseConfiguration();
        // firebase init 
        firebaseInit()
        // ===== end of firebase function =====
        // update auth context based on cookies value
        setAuth(new Cookies().get("auth") == "true")
        // updating, checking jwt validation
        deviceCheck()
       
    }, [])

    // rendering when redirect true
    React.useEffect(() => {
         // checking require redirect after login
         checkRedirectAfterLogin()   
    },[redirect == "true"])
   
    async function deviceCheck(){
        if(isAuth){
            const token = new Cookies().get("token")
            const response = await requestCheckToken(token)
            
            if (response.error) {
                if(response.error.status_code === 401){
                    // token cannot be verified then kick user out
                    // dont hit logout API because token also cannot be verified
                    setAuth(false);
                    localStorage.clear();
                    cookies.remove("auth", { path: '/' });
                    cookies.remove("token", { path: '/' });
                    cookies.remove("userId", { path: '/' });
                    router.push('/');
                }
            }else{
                saveDataProfileLocal(response.data, token)
            }
        }
    }

    // firebase init and notification permision
    async function firebaseInit() {
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();
            const token = await messaging.getToken();
            setFirebaseToken(token)
            await showFirebaseMessage()
        } catch (e) {
            console.log(e);
        }
    
        // Event listener that listens for the push notification event in the background
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                console.log(event.data.notification.title,"background handler")
            });
        }
        
    }

    // listener for firebase cloud messaging
    function showFirebaseMessage() {
        try {
            const messaging = firebase.messaging();
            messaging.onMessage((payload) => {
                console.log(payload.notification.title);
                console.log(payload.notification.body);
            })
        } catch (e) {
          console.log(e)
        }
    }

    // checking redirect page and need login
    async function checkRedirectAfterLogin(){
        if (redirect == "true" && !isAuth) {
            await setLoginModal(true)
        }
    }
    
    return (
        <div className={`${isDark && 'dark'} font-poppinsRegular`} onClick={() => setshowPopUpMore(!showPopUpMore)}>
            {isPreload && (
                <div className = "bg-[#FF0000] h-1 animate-pulse absolute flex top-0 w-full z-50">

                </div>
            )}
            <RegisterEmailModal 
            showed = {isEmailRegister} 
            setShowed = {(isShowed) => setIsEmailRegister(isShowed)}
            deviceToken = {firebaseToken}  />
            <RegisterProviderModal 
            providerType={providerAuthType}
            showed = {isProviderRegister} 
            setShowed = {(isShowed) => setIsProviderRegister(isShowed)}
            user = {userRegisterProvider}
            idTokenFirebase = {idTokenFirebase} 
            deviceToken = {firebaseToken} />
        
            <LoginModal 
                setEmailReg={(data)=> setIsEmailRegister(data)} 
                setProviderReg={(state,user,token, provider)=> {
                    setIsProviderRegister(state)
                    setIDTokenFirebase(token)
                    setUserRegisterProvider(user)
                    setProviderAuthType(provider)
                }} 
                deviceToken = {firebaseToken} 
                loading = {isLoading} 
                showed = {loginModal} 
                setShowed = {(isShowed) => setLoginModal(isShowed)} 
            />
            {/* meta content */}
            <Meta title={title} />
            {/* top navigation */}
            <TopNavigationIndex setShowed={(isShowed) => setLoginModal(isShowed)}/>
            {/* content */}
            <div className = "pt-14 bg-white dark:bg-[#0F172A]">
                {children}
            </div>
            {/* footer separator */}
            <div className = "bg-gray-100 dark:bg-gray-700 h-1"/>
            {/* Footer Home  */}
            {useFooter && <FooterSectionHome />}
        </div>
    )
  }