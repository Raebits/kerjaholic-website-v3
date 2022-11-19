import React from "react";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import AppAuthContext from "../../utils/context/auth-context";
import MainNavigationProps from "../../types/navigation/main-navigation-props";
import MiniProfileProps from "../../types/profile/mini-profile-props";
import MiniProfile from "../profile/mini-profile";
import AppDarkContext from "../../utils/context/dark-context";

export default function TopNavigationIndex({ setShowed }: MainNavigationProps): JSX.Element {
    
    const router = useRouter()
    const { redirect, pn } = router.query;
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

    function handlerDirect(link){
        if(pn === '/'+link){
            setShowed(true)
        }else{
            router.push("/"+link)
        }
    }

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
                    <svg className="h-7 md:h-9 w-auto dark:fill-[#CCCCCC]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 529.39 166.54">
                        <defs>
                            <linearGradient id="a" x1="5128.97" x2="5189.75" y1="1033.67" y2="1066.67" gradientTransform="translate(-49.21 118.79)" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="#a00"/>
                                <stop offset="1" stopColor="red"/>
                            </linearGradient>
                        </defs>
                        <path d="M23.69 0v120.35A23.69 23.69 0 0 1 0 144V23.69A23.69 23.69 0 0 1 23.69 0Z"/>
                        <path fill="url(#a)" d="M5078.93 1122.82a23.76 23.76 0 0 0 .11 33.55l38.13 38 16.81 16.7c.29-.29.57-.59.83-.89a23.69 23.69 0 0 0-.93-32.62l-54.94-54.74Z" transform="translate(-5039.67 -1044.55)"/>
                        <path d="M34.77 84.97c.32.64.66 1.26 1 1.88a20.77 20.77 0 0 1-1-1.88ZM37.74 89.59l.51.59ZM37.03 88.69ZM38.25 90.19c.2.23.41.46.62.69-.14-.14-.28-.29-.41-.44Z"/>
                        <path fill="red" d="M71.95 79.13 56.08 95l-2.91 2.91a22.11 22.11 0 0 0 1.27 28.92l-15.1-15a5.62 5.62 0 0 1-.43-.44c-.14-.14-.28-.29-.41-.44-.51-.56-1-1.15-1.43-1.74l-.65-.91c-.21-.31-.4-.62-.59-.93-.37-.62-.71-1.24-1-1.88a.19.19 0 0 1 0-.08c-.15-.31-.29-.62-.43-.94-.12-.27-.23-.54-.33-.82a3.14 3.14 0 0 1-.13-.35c-.09-.26-.19-.53-.28-.8a.16.16 0 0 1 0-.09c-.11-.32-.21-.66-.3-1s-.18-.69-.26-1-.13-.6-.19-.9-.09-.47-.12-.7 0-.24-.06-.36c0-.3-.08-.61-.11-.91a1.29 1.29 0 0 1 0-.17V96.19a23.24 23.24 0 0 1 .26-4.68c0-.3.09-.61.15-.91s.15-.74.24-1.11c.17-.73.39-1.45.64-2.17a.83.83 0 0 1 .06-.16c.11-.32.23-.63.36-.94a21.86 21.86 0 0 1 1.6-3.22c.18-.31.37-.61.56-.9a23.37 23.37 0 0 1 3-3.66v-.06l32.62-32.62a23.68 23.68 0 0 1-.16 33.37Z"/>
                        <g>
                            <path fill="red" d="M289.55 61.7v-3.58a4.37 4.37 0 0 0-4.37-4.37 4.47 4.47 0 0 0-4.47 4.47V65.53h8.87V61.7Z"/>
                            <path className = "fill-[#060606] dark:fill-[#CCCCCC]" d="M391.06 121.27a5.26 5.26 0 0 1-5.26-5.25V86.45a4.77 4.77 0 0 0-4.77-4.77h-20.5v34.42a5.14 5.14 0 0 1-5.14 5.14 5.25 5.25 0 0 1-5.25-5.25V56.91a5.25 5.25 0 0 1 5.25-5.26 5.14 5.14 0 0 1 5.14 5.14v14.66h20.55q15.1 0 15.1 15.06v29.66a5.14 5.14 0 0 1-5.14 5.14"/>
                            <path className = "fill-[#060606] dark:fill-[#CCCCCC]" d="M435.04 110.97a4.09 4.09 0 0 0 4.67-4.58V86.45a4.17 4.17 0 0 0-4.67-4.77h-15.82a4.21 4.21 0 0 0-4.77 4.77v19.83a4.17 4.17 0 0 0 4.77 4.67h15.82Zm-31-24.5q0-15.06 15.19-15.06h15.86q15 0 15 15.06v19.92q0 14.87-15 14.87h-15.86q-15.19 0-15.19-15V86.45Z"/>
                            <path className = "fill-[#060606] dark:fill-[#CCCCCC]" d="M463.25 51.68a5.14 5.14 0 0 1 5.14 5.14v59.31a5.14 5.14 0 0 1-5.14 5.14 5.25 5.25 0 0 1-5.25-5.25V56.94a5.26 5.26 0 0 1 5.25-5.26" />
                            <path className = "fill-[#060606] dark:fill-[#CCCCCC]" d="M475.83 71.45h10.39v44.72a5.14 5.14 0 0 1-5.14 5.14 5.25 5.25 0 0 1-5.25-5.25V71.45Z"/>
                            <path className = "fill-[#060606] dark:fill-[#CCCCCC]" d="M529.39 116.22a5 5 0 0 1-5 5h-15.26q-15.16 0-15.16-15V86.45q0-15.06 15.16-15.06h15a5.25 5.25 0 0 1 5.25 5.25 5 5 0 0 1-5 5h-15.26a4.77 4.77 0 0 0-4.79 4.81v19.83a4.17 4.17 0 0 0 4.77 4.67h15a5.25 5.25 0 0 1 5.25 5.25" />
                            <path fill="red" d="M266.07 71.45h-10q-14.37.39-14.38 15v29.66a5.14 5.14 0 0 0 5.14 5.14 5.25 5.25 0 0 0 5.25-5.25V86.45a4.76 4.76 0 0 1 4.49-4.75h9.44a5.07 5.07 0 0 0 5.06-5.06v-.19a5.07 5.07 0 0 0-5.06-5.06"/>
                            <path fill="red" d="M265.63 121.78a4.08 4.08 0 0 1 4.08-4.08h7.62q3.71 0 3.71-3.56V71.53h8.09v42.61q0 11.58-11.8 11.58h-7.72a3.94 3.94 0 0 1-3.94-3.94" />
                            <path fill="red" d="M327.1 110.97h-15.83q-4.67 0-4.67-3.91v-1.91q0-3.63 4.67-3.62h20.51v4.78a4.67 4.67 0 0 1-4.67 4.67m0-39.56h-21.63a5.25 5.25 0 0 0-5.25 5.25 5 5 0 0 0 5 5h21.84a4.17 4.17 0 0 1 4.67 4.77v4.74h-20.5q-15.06 0-15.06 13.92v1.91q0 14.21 15.09 14.2h15.85q15 0 15-15V86.45a15.06 15.06 0 0 0-15.07-15Z" />
                            <path className = "fill-[#060606] dark:fill-[#CCCCCC]" d="M486.2 61.03v-4.21a5.14 5.14 0 0 0-5.14-5.14 5.25 5.25 0 0 0-5.25 5.25v8.6h10.44v-4.5Z" />
                            <path fill="red" d="m187.12 118.45-22.13-33.38 14.78-12.17a5.455 5.455 0 0 0-6.79-8.54l-.15.12-24.73 20.38V45.12a5.455 5.455 0 0 0-10.91 0v69.51a5.455 5.455 0 1 0 10.91 0V98.98l8.42-6.93 21.51 32.43a5.45 5.45 0 0 0 9.09-6" />
                            <path fill="red" d="M225.05 87.45q0 3.71-4.65 3.71h-20.51v-4.71a4.75 4.75 0 0 1 4.75-4.75h15.77q4.65 0 4.65 3.8v2Zm-4.6-16.05h-15.8a21.67 21.67 0 0 0-6.07.79l-.35.1a11.85 11.85 0 0 0-5.18 3.16 28.55 28.55 0 0 0-7.64 20.62 29.86 29.86 0 0 0 6.24 19.14q3.53 5.86 13 5.86h21.68a5 5 0 0 0 5-5 5.22 5.22 0 0 0-5.22-5.22h-21.45a4.16 4.16 0 0 1-4.75-4.65v-4.75h20.51q15 0 15-14v-2q0-14.06-15-14.06Z" data-name="Path 189"/>
                        </g>
                    </svg>
                    
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
                        <a className=" sm:block px-2 text-sm md:text-md text-black dark:text-white">Artikel</a>
                    </Link>
                    {/* <a className="hidden sm:block px-2 text-sm md:text-md text-black dark:text-white" href="https://academy.kerjaholic.com" >Akademi</a> */}
                    {/* <Link href="/colaboration"> */}
                        <a onClick = {() => handlerDirect('colaboration')} className=" sm:block last:px-2 text-sm md:text-md text-black dark:text-white">Kolaborasi</a>
                    {/* </Link> */}
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
                        {/* {!isAuth && (
                            <div style={{cursor: "pointer"}} onClick = {()=>setShowed(true)} className = "text-sm md:text-md bg-[#FF0000] shadow-md px-4 mx-2 py-2 rounded-lg text-white">Login</div>
                        )} */}

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