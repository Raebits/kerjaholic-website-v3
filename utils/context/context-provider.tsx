import React from "react";
import { useRouter } from "next/router"
import ContextProviderProps from "../../types/context/context-provider-props";
import AppRedirectContext from './app-redirect-context';
import AppPreloadContext from "./preload-context";
import AppAuthContext from "./auth-context";
import Cookies from 'universal-cookie';
import AppDarkContext from "./dark-context";

function ContextProvider<FC>({ children }: ContextProviderProps) {
    const router = useRouter()
    const { ref } = router.query
    const [isAuth , setIsAuth] = React.useState<boolean>(null);
    const setAuth = (val: boolean) => setIsAuth(val);
    
    const [isDark , setIsDark] = React.useState<boolean>(null);
    const setDark = (val: boolean) => setIsDark(val);
    
    const [isPreload, setIsPreload] = React.useState<boolean>(true);
    const preloadEnd = () => setIsPreload(false);
    const [showAppRedirect, setShowAppRedirect] = React.useState<boolean>((ref != null));
    const [showAppRedirectMini, setShowAppRedirectMini] = React.useState<boolean>(false);
    const toggleAppRedirect = () => setShowAppRedirect(!showAppRedirect);
    const toggleAppRedirectMini = () => setShowAppRedirectMini(true);
    const toggleAppRedirectFull = () => setShowAppRedirectMini(false);

    return (
        <AppDarkContext.Provider
            value={{
                isDark,
                setDark
            }}
        >
            <AppAuthContext.Provider
                value={{
                    isAuth,
                    setAuth
                }}
            >
                <AppPreloadContext.Provider
                    value={{
                        isPreload,
                        preloadEnd
                    }}
                >
                    <AppRedirectContext.Provider
                        value={{
                            showAppRedirect,
                            showAppRedirectMini,
                            toggleAppRedirect,
                            toggleAppRedirectMini,
                            toggleAppRedirectFull
                        }}
                        >
                        {children}
                    </AppRedirectContext.Provider>
                </AppPreloadContext.Provider>
            </AppAuthContext.Provider>
        </AppDarkContext.Provider>
    )
}

export default ContextProvider;