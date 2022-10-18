import React from "react";
import Meta from "./meta"
import LayoutProps from "../types/layout-props";
import FooterSectionHome from "../components/home-index/footer-section-component";
import SeperatorGrayComponent from "./home-index/seperator-gray-component";
import TopNavigationIndex from "./navigation/top-navigation-index";
import AppPreloadContext from "../utils/context/preload-context";
import LoginModal from "./auth/login-modal";

export default function Layout({ children, title }: LayoutProps): JSX.Element {

    const [ showPopUpMore, setshowPopUpMore ] = React.useState<boolean>()
    const {isPreload, preloadEnd} = React.useContext(AppPreloadContext)

    React.useEffect(() => {
        preloadEnd()
    }, [])
    
    return (
        <div className="font-poppinsRegular" onClick={() => setshowPopUpMore(!showPopUpMore)}>
            {isPreload && (
                <div className = "bg-red-600 h-1 animate-pulse absolute flex top-0 w-full">

                </div>
            )}

            <LoginModal showed = {true}/>
            {/* meta content */}
            <Meta title={title} />
            {/* top navigation */}
            <TopNavigationIndex />
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