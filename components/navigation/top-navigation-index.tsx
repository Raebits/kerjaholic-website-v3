import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppAuthContext from "../../utils/context/auth-context";
import MainNavigationProps from "../../types/navigation/main-navigation-props";
import MiniProfileProps from "../../types/profile/mini-profile-props";
import MiniProfile from "../profile/mini-profile";

export default function TopNavigationIndex({ setShowed }: MainNavigationProps): JSX.Element {
    
    const router = useRouter()
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

    React.useEffect(() => {
        if (document.scrollingElement.scrollTop >= 60) {
            setNavBarColor("bg-white shadow-md")
        } else {
            setNavBarColor("")
        }
        
        listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop
            if (scrolled <= 200) {
                if (scrolled >= 60) {
                    setNavBarColor("bg-white shadow-md")
                } else {
                    setNavBarColor("")
                }
            }
        })
        return () => {
            document.removeEventListener("scroll", listener)
        }
    }, [navBarColor])

    return (
        <>
        <div className = {"fixed w-full z-30 flex "+navBarColor+" p-2  items-center justify-center rounded-md h-16 px-6 md:px-10"}>
            <div className = "flex-none h-full flex items-center justify-center">
            <Link href="/">
                    <img className="h-7 md:h-9 w-auto" src="/images/ic_logo.png" />
            </Link>
            </div>
            <div className = "grow h-full flex items-center justify-center">
                
            </div>
            <div className = "flex-none h-full text-center flex items-center justify-center">
                    <Link href="/article">
                        <a className="px-2 text-sm md:text-md">Artikel</a>
                    </Link>
                    <a href="https://academy.kerjaholic.com" className="px-2 text-sm md:text-md">Akademi</a>
                    {isAuth === null ? (
                        <div onClick = {() => setOpenProfile(true)} className = "flex space-x-1 items-center px-3">
                            <div className = "flex animate-pulse justify-center">
                                <div className="w-8  ">
                                    <img src="./images/loading-people.svg" alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>

                            <div className = "text-sm md:text-md h-4 w-20 bg-gray-400 animate-pulse rounded-lg"></div>
                        </div>
                    ):(
                        !isAuth ? (
                            <div style={{cursor: "pointer"}} onClick = {()=>setShowed(true)} className = "text-sm md:text-md bg-[#FF0000] shadow-md px-4 py-2 rounded-lg text-white">Login</div>
                        ):(
                            <>
                            <div className="bg-[#ff0000] text-white px-4 py-2 shadow-lg rounded-md">Kolaborasi</div>
                            <div onClick = {() => setOpenProfile(true)} className = "flex space-x-3 items-center px-3">
                                <div className = "flex-none flex justify-center">
                                    <div className="w-8 ">
                                        <img src={avatar} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                    </div>
                                </div>
    
                                <div className = "text-sm md:text-md">{username}</div>
                            </div>
                            </>
                        )
                    )}
                    
            </div>
        </div>
        <MiniProfile showed = {openProfile} setShowed = {(isShowed) => setOpenProfile(isShowed)} loading={false}/>
        </>
    )
}