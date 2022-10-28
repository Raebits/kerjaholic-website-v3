import React from "react";
import { InputDateComponentProps } from "../../types/input/input-date-component-props";

import moment from "moment";
import { useRouter } from "next/router";

export function InputDateComponent( { onChange, outFormat, label, hideLabel, showValidInput, value } : InputDateComponentProps) {

    const [ newValue, setNewValue ] = React.useState<string>("")

    const router = useRouter()

    const isInvalid = (): boolean => {
        if (showValidInput && newValue == "") {
            return true
        }
        return false
    }

    return (
        <div className = "flex flex-col mb-3">
            {(!hideLabel) && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            )}
            <div className="flex">
                <span className="inline-flex items-center px-3 text-xs text-gray-900 bg-gray-200 rounded-l-lg border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <img src='../icons/ic_calender.png' 
                        width="20px"
                        height="20px"
                    />
                </span>
                <input 
                    defaultValue={value}
                    type="date" 
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 px-3 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    onChange={(e) => {
                        setNewValue(moment(new Date(e.target.value)).format((outFormat) ? outFormat : "YYYY-MM-DD"))
                        onChange(moment(new Date(e.target.value)).format((outFormat) ? outFormat : "YYYY-MM-DD"))
                    }}
                />
            </div>
            {(isInvalid()) && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    '{label}' {((router.locale == "en") ? " cannot empty" : " tidak boleh kosong")}
                </p>
            )}
        </div>
    );
};
