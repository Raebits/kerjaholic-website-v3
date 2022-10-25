import React from "react";
import FollowUsComponentProps from "../../types/home-index/follow-us-props";

export default function FollowUsFooterSectionHome({ name, icon, link }: FollowUsComponentProps): JSX.Element {
    
    return (
        <div className = "flex w-full py-2">
                <div className="flex-none flex justify-between">
                <a href={link} target="_blank"><img src = {icon}/></a>
                </div>
                <div className="grow flex text-gray-700 dark:text-gray-400">
                    <div className = " px-2"><a href={link} target="_blank">{name}</a></div>
                </div>
        </div>
    )
}