import React from "react";
import { useRouter } from "next/router";
import { InputToggleComponentProps } from "../../types/input/input-toggle-component-props";

export function InputToggleComponent( { onChange, title, name, initValue, children, showValidInput } : InputToggleComponentProps) {

    const router = useRouter()
    
    const isInvalid = (): boolean => {
        if (showValidInput && !initValue ) {
            return true
        }
        return false
    }

    return (
        <div className="flex flex-col items-start">
            {(title) && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
            )}
            <label  className="z-0 inline-flex relative items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={initValue}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-[#FF0000] dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#FF0000]"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</span>
            </label>
            {(isInvalid()) && (
                <div className="flex mt-1 text-xs text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    <div className = "mx-1">
                        '{title}' {((router.locale == "en") ? " harus dipilih" : " harus dipilih")}
                    </div>
                </div>
            )}
        </div>
    );
};
