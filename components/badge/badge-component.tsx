import { useRouter } from "next/router";
import React from "react";
import { BadgeComponentProps } from "../../types/badge/badge-component-props";
export function BadgeComponent( { textColor, bgColor,text} : BadgeComponentProps) {
    const router = useRouter()

    return (
        <div style = {{backgroundColor:bgColor, color:textColor}} className =  {`$ flex text-xs lg:text-sm w-full items-center justify-center rounded-full px-4 py-2`}>
            {text}
        </div>
    );
};
