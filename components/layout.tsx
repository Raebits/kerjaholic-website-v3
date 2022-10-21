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
import { requestDataProfileUser } from "../api/profile/request-data-profile-user";
import { saveDataProfileLocal } from "../helper/profile/save-data-profile-local";
import { responseErrorHandler } from "../helper/common/response-request-handler";

export default function Layout({ children, title }: LayoutProps): JSX.Element {
    const router = useRouter();
    const { redirect, pn } = router.query;

    const cookies = new Cookies();
    const [ showPopUpMore, setshowPopUpMore ] = React.useState<boolean>()
    const {isPreload, preloadEnd} = React.useContext(AppPreloadContext)
    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const [loginModal, setLoginModal] = React.useState<boolean>(false)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [idTokenFirebase, setIDTokenFirebase] = React.useState<string>("-");
    const [firebaseToken, setFirebaseToken] = React.useState<string>("-")

    React.useEffect(() => {
        // Firebase Configuration
        FirebaseConfiguration();
        // firebase init 
        firebaseInit()
        // set preload loading end
        preloadEnd()
        // update auth context based on cookies value
        setAuth(new Cookies().get("auth") == "true")
        // updating, checking jwt validation
        deviceCheck()
        // checking require redirect after login
        checkRedirectAfterLogin()
    }, [])

    async function deviceCheck(){
        if(isAuth){
            const token = new Cookies().get("token")
            const response = await requestDataProfileUser(token, firebaseToken)

            if (response) {
            
                if (response.status == 'success') {
                    // save data profile in local
                    saveDataProfileLocal(response, token)
                } else {
                    responseErrorHandler(response, (message) => {
                        console.log(message)
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
                    })
                }
            }
        }
    }

    // firebase init and notification permision
    async function firebaseInit() {
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();
            const token = await messaging.getToken();
            console.log(token)
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
        console.log(isAuth,'checking')
        if (redirect == "true" && !isAuth) {
            await setLoginModal(true)
        }
    }

    // login action
    const loginAction = async(typeLogin) => {
        if(typeLogin === 'manual'){
            await setIsLoading(true)
            await setTimeout(async() => {
                await setAuth(true)
                await setLoginModal(false)
                await setIsLoading(false)
                // cookies.set("token", token, { path: '/' });
                await cookies.set("auth", "true", { path: '/', secure: true });
                // Reload Page
                if (redirect == "true") {
                    router.replace(pn as string)
                } 
                // else {
                //     router.reload();
                // }
            }, 1000);
            
            
        }
    }
    
    return (
        <div className="font-poppinsRegular" onClick={() => setshowPopUpMore(!showPopUpMore)}>
            {isPreload && (
                <div className = "bg-red-600 h-1 animate-pulse absolute flex top-0 w-full">

                </div>
            )}

            <LoginModal deviceToken = {firebaseToken} loading = {isLoading} showed = {loginModal} setShowed = {(isShowed) => setLoginModal(isShowed)} />
            {/* meta content */}
            <Meta title={title} />
            {/* top navigation */}
            <TopNavigationIndex setShowed={(isShowed) => setLoginModal(isShowed)}/>
            {/* content */}
            <div className = "pt-14">
                {children}
            </div>
            {/* footer separator */}
            <SeperatorGrayComponent />
            {/* Footer Home  */}
            <FooterSectionHome />
        </div>
    )
  }