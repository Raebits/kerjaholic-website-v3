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
    // Firebase Configuration
    FirebaseConfiguration();

    React.useEffect(() => {
        const messaging = firebase.messaging();
  
        messaging.requestPermission().then(() => {
          return messaging.getToken()
        }).then(token=>{
          console.log(token)
        }).catch((error) => {
          console.log(error)
        })
        
        // Event listener that listens for the push notification event in the background
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", (event) => {
                console.log(event.data.firebaseMessaging.payload.notification.title)
            });
        }
        messaging.onMessage((payload) => {
            console.log(payload.data.notiFor)
            console.log(payload.notification.title)
            console.log(payload.notification.body)
        });
      },[])

    React.useEffect(() => {
        preloadEnd()
        checkLogin()
        setTimeout(() => {
        setAuth(
            new Cookies().get("auth") == "true")
        }, 1000);
    }, [])
    
    async function checkLogin(){
        if (redirect == "true" && isAuth != true) {
            await setLoginModal(true)
        }
    }

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

            <LoginModal loading = {isLoading} showed = {loginModal} setShowed = {(isShowed) => setLoginModal(isShowed)} doLogin = {(typeLogin) => loginAction(typeLogin)}/>
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