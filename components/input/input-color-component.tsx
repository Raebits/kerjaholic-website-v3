import React from "react";
import { useRouter } from "next/router";
import { InputColorComponentProps } from "../../types/input/input-color-component-props";

export function InputColorComponent( { onSelect, loading, title, showTitle, showValidInput, list, value } : InputColorComponentProps) {

    const [ newValue, setNewValue ] = React.useState<string>("")

    const router = useRouter()
    const [color, setColor] = React.useState<string>("1")
    

    const isInvalid = (): boolean => {
        if (showValidInput && !color) {
            return true
        }
        return false
    }

    return (
        <div className = "flex flex-col mb-3">
            {(showTitle) && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
            )}
            <div className="flex">
                {!loading ? (
                    <div className = "flex flex-row w-full overflow-y-scroll scrollbar-hide">
                        {list.length > 0 && (
                            list.map((obj, index) => 
                                <div onClick = {() => {onSelect(obj); setColor(obj.id);}} key = {index} className = {`${color == obj.id ? 'border-[#FF0000]' : 'border-gray-300'} p-4 mx-1 mr-7 rounded-full border hover:border-[#FF0000]`} style = {{backgroundColor:obj.content}}/>
                            )
                        )}
                    </div>
                ):(
                    <div className = "flex flex-row w-1/2">
                        <div className = "p-1.5 w-full rounded-full bg-[#CCCCCC] animate-pulse"/>
                    </div>
                )}
            </div>
            {(isInvalid()) && (
                <div className="flex mt-1 text-xs text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    <div className = "mx-1">
                        '{title}' {((router.locale == "en") ? " tidak boleh kosong" : " tidak boleh kosong")}
                    </div>
                </div>
            )}
        </div>
    );
};
