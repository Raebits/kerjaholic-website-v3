import React from "react";
import { useRouter } from "next/router";
import SidebarProps from "../../types/navigation/sidebar-navigation-props";
import AppDarkContext from "../../utils/context/dark-context";

export default function SidebarNavigation({ children }: SidebarProps): JSX.Element {
    
    const router = useRouter()
    // const {isDark, setDark} = React.useContext(AppDarkContext)
    
    return (
        <>
            <div className="fixed bg-red-600 w-64">
                {/* content sidebar wrapper */}
                <div className ="flex flex-col bg-white dark:bg-[#0F172A] border-r border-gray-500 mt-2 py-4 px-3 h-screen">
                    <div className = "mb-2 p-2 hover:bg-slate-600 dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-gray-300">Artikel</div>
                    <div className = "mb-2 p-2 hover:bg-slate-600 dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-gray-300">Akademi</div>
                    <div className = "mb-2 p-2 hover:bg-slate-600 dark:hover:bg-white hover:text-white dark:hover:text-black text-black dark:text-gray-300">Kolaborasi</div>
                </div>
            </div>
            <div className=" bg-gray-200 ml-64">
                {/* content main wrapper */}
                <div className ="bg-green-600 mt-2 p-3">
                    {children}
                </div>
            </div>
        </>
    )
}