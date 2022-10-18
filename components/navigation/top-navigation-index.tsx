import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TopNavigationIndex(): JSX.Element {
    
    const router = useRouter()

    let listener = null
    const [navBarColor, setNavBarColor] = React.useState<string>("")
  
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
        
        <div className = {"fixed w-full z-50 flex "+navBarColor+" p-2  items-center justify-center rounded-md h-16 px-6 md:px-10"}>
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
                    
            </div>
        </div>
    )
}