import React from "react";
import { useRouter } from "next/router";
import SidebarProps from "../../types/navigation/sidebar-navigation-props";

export default function SidebarNavigation({ children }: SidebarProps): JSX.Element {
    
    const router = useRouter()
    return (
        <>
            <div className="fixed bg-red-600 w-64">
                {/* content sidebar wrapper */}
                <div className ="flex flex-col bg-white border-r border-gray-500 mt-2 py-4 px-3 h-screen">
                    <div className = "mb-2 p-2 hover:bg-slate-400">Menu 1</div>
                    <div className = "mb-2 p-2 hover:bg-slate-400">Menu 2</div>
                    <div className = "mb-2 p-2 hover:bg-slate-400">Menu 3</div>
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