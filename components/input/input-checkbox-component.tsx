import { useRouter } from "next/router";
import React from "react";
import { InputChexboxComponentProps } from "../../types/input/input-checkbox-component-props";

export function InputCheckboxComponent( { onChange, title, name, initValue, children, showValidInput} : InputChexboxComponentProps) {
    const router = useRouter()
    const isInvalid = (): boolean => {
        if (showValidInput && !initValue) {
            return true
        }
        return false
    }

    return (
        <>
        <div className="flex items-center">
            <input 
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                name={(name)? name: "checkbox-name"}
                checked={initValue}
                onChange={(e) => onChange(e.target.checked)}
            />
            {children}
            
        </div>
        {(isInvalid()) && (
                <div className="flex mt-1 text-xs text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span>
                <div className = "mx-1">
                    '{title}' {((router.locale == "en") ? " harus dipilih" : " harus dipilih")}
                </div>
            </div>
        )}
        </>
    );
};
