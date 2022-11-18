import React from "react";
import { useRouter } from "next/router";
import StickyHeaderProps from "../../types/colaboration/sticky-header-props";

export default function Header({ title, children, onSearching, onSorting , onBack }: StickyHeaderProps): JSX.Element {
    
    const router = useRouter()
    const [searching, setSearching] = React.useState<string>("")
    const [sorting, setSorting] = React.useState<string>("")

    return (
        <>
            {/* header tool */}
            <div className = "sticky flex justify-center items-center top-14 h-16 bg-white shadow-md dark:bg-[#0F172A] px-2  z-30 w-full mr-3">
                <div className = "flex space-x-2 items-center justify-center flex-none px-1 md:px-3  ">
                    {onBack &&(
                        <div onClick = {() => onBack(true)} className="rounded-md text-black dark:text-white dark:hover:text-[#FF0000] hover:text-[#FF0000]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </div> 
                    )}
                    <div className = "text-md lg:text-lg  text-black dark:text-white">{title}</div>
                </div>
                <div className = "hidden md:block flex-grow p-2"/>
                <div className = "  w-full px-3 md:w-fit md:flex-none flex flex-row items-center justify-center ">
                    {/* search bar */}
                    {onSearching && (
                        <div className="relative w-full">
                            <div onClick = {() => onSearching(searching)} className="flex absolute right-1 top-2 items-center p-1 bg-gray-50 dark:bg-gray-700">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input onChange = {(e) => setSearching(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                        </div>
                    )}

                    {/* sorting */}
                    {onSorting && (
                        <div className = "mx-4" onClick = {() => onSorting("sorting nih")}>
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.61392 10.8987V2.72803" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.0629 8.44116L9.61399 10.8992L7.16504 8.44116" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3.65152 1.09985V9.27052" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.20264 3.55761L3.65159 1.09961L6.10054 3.55761" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    )}
                    {/* custom toolbar  */}
                    {children}
                </div>
            </div>
        </>
    )
}