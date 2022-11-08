import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppAuthContext from "../../utils/context/auth-context";
import MainNavigationProps from "../../types/navigation/main-navigation-props";
import MiniProfileProps from "../../types/profile/mini-profile-props";
import MiniProfile from "../profile/mini-profile";
import AppDarkContext from "../../utils/context/dark-context";

export default function TopNavigationIndex({ setShowed }: MainNavigationProps): JSX.Element {
    
    const router = useRouter()
    const {isDark, setDark} = React.useContext(AppDarkContext)
    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const [openProfile, setOpenProfile] = React.useState<boolean>(false)
    let listener = null
    const [navBarColor, setNavBarColor] = React.useState<string>("")
    const [avatar, setAvatar] = React.useState<string>('?')
    const [username, setUsername] = React.useState<string>('?')

    React.useEffect(() => {
        setAvatar(localStorage.getItem("avatar"))
        setUsername(localStorage.getItem("username"))
    })

    // React.useEffect(() => {
    //     if (document.scrollingElement.scrollTop >= 60) {
    //         setNavBarColor("bg-white dark:bg-[#0F172A] shadow-md")
    //     } else {
    //         setNavBarColor("dark:bg-[#0F172A] dark:bg-opacity-50")
    //     }
        
    //     listener = document.addEventListener("scroll", e => {
    //         var scrolled = document.scrollingElement.scrollTop
    //         if (scrolled <= 200) {
    //             if (scrolled >= 60) {
    //                 setNavBarColor("bg-white dark:bg-[#0F172A] shadow-md")
    //             } else {
    //                 setNavBarColor("dark:bg-[#0F172A] dark:bg-opacity-50")
    //             }
    //         }
    //     })
    //     return () => {
    //         document.removeEventListener("scroll", listener)
    //     }
    // }, [navBarColor])

    function setDarkMode(val){
        setDark(val)
        if(val){
            localStorage.setItem("darkMode","true")
        }else{
            localStorage.setItem("darkMode","false")
        }
    }
    return (
        <>
            {/* <div className = {"fixed w-full z-30 flex "+navBarColor+" p-2  items-center justify-center h-16 px-6 md:px-10"}> */}
            <div className = {"fixed w-full z-30 flex bg-white dark:bg-[#0F172A] shadow-md p-2  items-center justify-center h-16 px-6 md:px-10"}>
                <div className = "flex-none h-full flex items-center justify-center">
                <Link href="/">
                        <img className="h-7 md:h-9 w-auto" src="/images/ic_logo.png" />
                </Link>
                </div>
                <div className = "grow h-full flex items-center justify-center">
                    
                </div>
                <div className = "flex-none h-full text-center flex items-center justify-center">
                    <div onClick={() => setDarkMode(!isDark)} className="px-3">
                        {isDark ?(
                            <img className = "w-5 h-5" src = "/icons/ic_sun.svg"/>
                        ):(
                            <img className = "w-4 h-4" src = "/icons/ic_moon.svg"/>
                        )}
                    </div>

                    <Link href="/article">
                        <a className=" hidden sm:block px-2 text-sm md:text-md text-black dark:text-white">Artikel</a>
                    </Link>
                    <a className="hidden sm:block px-2 text-sm md:text-md text-black dark:text-white" href="https://academy.kerjaholic.com" >Akademi</a>
                    <Link href="/colaboration">
                        <a className="hidden sm:block last:px-2 text-sm md:text-md text-black dark:text-white">Kolaborasi</a>
                    </Link>
                    {isAuth === null ? (
                        <div onClick = {() => setOpenProfile(true)} className = "flex space-x-1 items-center px-3">
                            <div className = "flex animate-pulse justify-center">
                                <div className="w-8  ">
                                    <img src="/images/loading-people.svg" alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>

                            <div className = " hidden md:block text-sm md:text-md h-4 w-20 bg-gray-400 animate-pulse rounded-lg"></div>
                        </div>
                    ):(
                        <>
                        {!isAuth && (
                            <div style={{cursor: "pointer"}} onClick = {()=>setShowed(true)} className = "text-sm md:text-md bg-[#FF0000] shadow-md px-4 mx-2 py-2 rounded-lg text-white">Login</div>
                        )}

                        {isAuth && (  
                            <div onClick = {() => setOpenProfile(true)} className = "flex space-x-3 items-center px-3">
                                <div className = "flex-none flex justify-center">
                                    <div className="w-8 ">
                                        <img src={avatar} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                    </div>
                                </div>

                                <div className = "hidden md:block text-sm md:text-md text-black dark:text-white">{username}</div>
                            </div>
                        )}
                        </>
                        
                    )}
                        
                </div>
            </div>
            <MiniProfile showed = {openProfile} setShowed = {(isShowed) => setOpenProfile(isShowed)} loading={false}/>
        </>
    )
}