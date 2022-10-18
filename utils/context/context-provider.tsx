import React from "react";
import { useRouter } from "next/router"
import ContextProviderProps from "../../types/context/context-provider-props";
import AppRedirectContext from './app-redirect-context';
import AppPreloadContext from "./preload-context";
import AppAuthContext from "./auth-context";

function ContextProvider<FC>({ children }: ContextProviderProps) {
    const router = useRouter()
    const { ref } = router.query
    const [isAuth , setIsAuth] = React.useState<boolean>(false);
    const setAuth = (val: boolean) => setIsAuth(val);

    const [isPreload, setIsPreload] = React.useState<boolean>(true);
    const preloadEnd = () => setIsPreload(false);
    const [showAppRedirect, setShowAppRedirect] = React.useState<boolean>((ref != null));
    const [showAppRedirectMini, setShowAppRedirectMini] = React.useState<boolean>(false);
    const toggleAppRedirect = () => setShowAppRedirect(!showAppRedirect);
    const toggleAppRedirectMini = () => setShowAppRedirectMini(true);
    const toggleAppRedirectFull = () => setShowAppRedirectMini(false);

    return (
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
    )
}

export default ContextProvider;