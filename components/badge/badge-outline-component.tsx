import { useRouter } from "next/router";
import React from "react";
import { BadgeOutlineComponentProps } from "../../types/badge/badge-outline-component-props";

export function BadgeOutlineComponent( { color,text} : BadgeOutlineComponentProps) {
    const router = useRouter()

    return (
        <div style = {{borderColor:color, color:color}} className =  {`$ flex border text-xs lg:text-sm w-full items-center justify-center rounded-full px-4 py-2`}>
            {text}
        </div>
    );
};
