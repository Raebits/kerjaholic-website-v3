import React from "react";
import ShareLayoutProps from "../types/share-layout-props"
import Meta from "./meta"
import AppRedirectDialog from "./dialog/app-redirect-dialog";

import AppRedirectContext from "../utils/context/app-redirect-context";

function Layout({ children, useTopNav, meta, titleNav, useMobileRedirectDialog, deeplink }: ShareLayoutProps): JSX.Element {
    const [lastScrolled, setLastScrolled] = React.useState<number>(0)
    const { showAppRedirect, showAppRedirectMini,toggleAppRedirectFull, toggleAppRedirectMini } = React.useContext(AppRedirectContext)

    let listener = null
    React.useEffect(() => {
        toggleAppRedirectFull()
        listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop
            if(lastScrolled != scrolled){
                if(!showAppRedirectMini){
                    // setMobilePop(false)
                    toggleAppRedirectMini()
                }
            }
            
        })
        return () => {
            document.removeEventListener("scroll", listener)
        }
    }, [])
    console.log(showAppRedirectMini)
    return (
        <div className = "font-poppinsRegular">
            {/* Meta */}
            <Meta {...meta} />

            {/* header */}
            {useTopNav && (
                <div className = "fixed w-full flex justify-center  h-12 z-50">
                    <div className = "flex items-center px-5 bg-white w-full sm:w-1/2 lg:w-1/3 shadow-md">
                        {titleNav}
                    </div>
                </div>
            )}

            {/* content  */}
            <div className = "flex justify-center">
            <div className = "pt-12 w-full sm:w-1/2 lg:w-1/3">
                {children}
            </div>
            </div>

            {/* pull up message */}
            {(useMobileRedirectDialog) && (
                <AppRedirectDialog
                    showed = {!showAppRedirectMini}
                    deeplink={deeplink}
                />
            )}
        </div>
    )
  }
  
export default Layout