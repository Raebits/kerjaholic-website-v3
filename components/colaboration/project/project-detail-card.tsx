import React from "react";
import { useRouter } from "next/router";
import StickyHeaderProps from "../../../types/colaboration/sticky-header-props";
import GroupImageComponent from "../group-image-component";
import ProjectDetailCardProps from "../../../types/colaboration/project/project-detail-card-props";

export default function ProjectDetailCard({ children,title, onClick }: ProjectDetailCardProps): JSX.Element {
    
    const router = useRouter()
    const [searching, setSearching] = React.useState<string>("")
    const [sorting, setSorting] = React.useState<string>("")

    return (
        <div onClick = {() => onClick(true)} className = "flex flex-row w-full bg-[#F5F5F5] rounded-md p-3">
            <div className = "flex items-center bg-[#D9D9D9] p-2 rounded-md flex-none w-16 h-16">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 52"><g clipPath="url(#a)"><path fill="#fff" d="M18 27.778a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm0-12.445a4.444 4.444 0 1 0 0 8.889 4.444 4.444 0 0 0 0-8.889Zm13.333 30.222v-.889a13.333 13.333 0 0 0-26.666 0v.89a1.778 1.778 0 1 0 3.555 0v-.89a9.778 9.778 0 0 1 19.556 0v.89a1.778 1.778 0 1 0 3.555 0Zm16-8.889a12.445 12.445 0 0 0-20.741-9.274 1.78 1.78 0 0 0 1.774 3.009c.22-.08.424-.202.597-.36a8.888 8.888 0 0 1 14.815 6.625 1.778 1.778 0 1 0 3.555 0Zm-11.555-16a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm0-12.444a4.445 4.445 0 1 0 0 8.89 4.445 4.445 0 0 0 0-8.89Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M4.667 4.667h42.666v42.666H4.668z"/></clipPath></defs></svg>
            </div>
            <div className = "flex flex-col justify-around flex-grow ml-5">
                <div className = "text-xs whitespace-nowrap">
                    {title}
                </div>
                <div className = "">
                    {children}
                </div>
            </div>
            <div className = " flex items-center flex-none">
                <svg className = "w-4 h-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                    <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.667 3.333 10.332 8l-4.667 4.667"/>
                </svg>
            </div>
        </div>
    )
}