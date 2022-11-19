import React from "react";
import { useRouter } from "next/router";
import StickyHeaderProps from "../../types/colaboration/sticky-header-props";

export default function Header({ title, children, onSearching, onSorting , onBack }: StickyHeaderProps): JSX.Element {
    
    const router = useRouter()
    const [searching, setSearching] = React.useState<string>("")
    const [sorting, setSorting] = React.useState<string>("")
    const [slideSearch, setSlideSearch] = React.useState<boolean>(false)
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
                <div className = "  w-full px-3 md:w-fit md:flex-none flex flex-row items-center justify-end ">
                    {/* search bar */}
                    {onSearching && (
                        // <div className="relative w-full">
                        //     <div onClick = {() => onSearching(searching)} className="flex absolute right-1 top-2 items-center p-1 bg-gray-50 dark:bg-gray-700">
                        //         <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        //     </div>
                        //     <input onChange = {(e) => setSearching(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                        // </div>
                        <div className = "bg-purple-600 absolute right-24 mr-2 lg:right-64 flex items-center w-[calc(100vw-115px)] sm:w-[calc(100vw-305px)] lg:w-[calc(100vw-535px)]">
                            <div className =  {`${!slideSearch ? 'translate-x-1/2 scale-x-0' : 'translate-none'} pr-10 overflow-x-hidden transition transform ease-in-out duration-500 absolute flex w-full`}>
                                <input onChange = {(e) => setSearching(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                            </div>
                            {/* <div onClick = {() => setSlideSearch(!slideSearch)} className = "flex items-center justify-center bg-black-500 w-3/4 p-2">s</div>
                            */}
                            <div onClick = {() => {setSlideSearch(!slideSearch); slideSearch && onSearching(searching);}} className = "absolute bg-white dark:bg-[#0F172A] right-0 flex items-center justify-center h-10 p-2 hover:text-gray-600">
                            <svg aria-hidden="true" className="w-4 h-4 fill-black dark:fill-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                           
                        </div>
                    )}

                    {/* sorting */}
                    {onSorting && (
                        <div className = "mx-4" onClick = {() => onSorting("sorting nih")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
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