import React from "react";
import { useRouter } from "next/router";
import StickyHeaderProps from "../../types/colaboration/sticky-header-props";

export default function Header({ title, breadcrumb, children, onSearching, onSorting ,onFilter, onBack }: StickyHeaderProps): JSX.Element {
    
    const router = useRouter()
    const [searching, setSearching] = React.useState<string>("")
    const [sorting, setSorting] = React.useState<string>("")
    const [slideSearch, setSlideSearch] = React.useState<boolean>(false)
    return (
        <>
            {/* header tool */}
            <div className = "sticky flex justify-between top-14 h-16 bg-white shadow-md dark:bg-[#0F172A]  z-30 w-full mr-3">
                <div className = "absolute h-full space-x-2 flex items-center ml-5">
                    
                    <div className = "flex flex-col ">
                        <div className = {`${slideSearch ? '-translate-x-1/2 scale-x-0' : 'translate-none'} flex flex-row transition transform ease-in-out duration-500 text-xs `}>
                            {breadcrumb?.map((obj, index) => {
                                return(
                                    <>
                                        <div onClick = {() => index !== breadcrumb.length - 1 && router.push(obj.path)} className = {`${index == breadcrumb.length - 1 ? 'text-[#2C2C2C] dark:text-white' : 'text-[#828282]'} `}>{obj.title} </div>
                                        <div className = "px-1 text-black dark:text-gray-500">{index < breadcrumb.length-1 && ">"}</div>
                                    </>
                                )
                            })}
                        </div>
                        <div className="flex items-center space-x-1">
                            {onBack &&(
                                <div onClick = {() => router.back() } className="rounded-full text-black dark:text-white dark:hover:text-[#FF0000] hover:text-[#FF0000]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </div> 
                            )}
                            <div className = {`${slideSearch ? '-translate-x-1/2 scale-x-0' : 'translate-none'} transition transform ease-in-out duration-500 text-sm lg:text-md  text-black dark:text-white`}>{title}</div>
                        </div>
                    </div>
                </div>
                <div className = "w-full px-3 flex flex-row items-center justify-end ">
                    {/* search bar */}
                    {onSearching && (
                        <div className = "flex w-full items-center flex-row-reverse">
                            <div onClick = {() => {setSlideSearch(!slideSearch);slideSearch && onSearching(searching);}} className = " dark:bg-[#0F172A] flex flex-none items-center justify-center h-10 p-2 hover:text-gray-600">
                                <svg aria-hidden="true" className="w-4 h-4 fill-black dark:fill-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            {/* wrapper flex for positioning search bar beside search icon */}
                            <div className = "flex p-2 w-full flex-grow relative"> 
                                <div className = " ml-2 absolute right-0 flex items-center w-full">
                                    <div className =  {`${!slideSearch ? 'translate-x-1/2 scale-x-0' : 'translate-none'} overflow-x-hidden transition transform ease-in-out duration-500 absolute flex w-full`}>
                                        <input onChange = {(e) => setSearching(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Search" required/>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )}

                    {/* sorting */}
                    {onSorting && (
                        <div className = "mx-2" onClick = {() => onSorting("sorting nih")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-black dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>

                        </div>
                    )}
                    {onFilter && (
                        <div className = "mx-2" onClick = {() => onSorting("filter nih")}>
                            <svg className="w-4 h-4 fill-black dark:fill-white" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 19 20"><path d="M10.831 20a.833.833 0 0 1-.5-.167l-3.333-2.5a.832.832 0 0 1-.333-.666v-4.684L.818 5.406A3.25 3.25 0 0 1 3.248 0H15.08a3.25 3.25 0 0 1 2.428 5.407l-5.844 6.576v7.184a.833.833 0 0 1-.834.833Zm-2.5-3.75 1.667 1.25v-5.833c0-.204.075-.401.21-.554L16.266 4.3a1.583 1.583 0 0 0-1.184-2.632H3.248a1.583 1.583 0 0 0-1.184 2.631l6.057 6.815c.136.153.21.35.21.554v4.583Z"/></svg>
                        </div>
                    )}
                    {/* custom toolbar  */}
                    {children}
                </div>
            </div>
        </>
    )
}