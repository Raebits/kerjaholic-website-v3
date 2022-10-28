import { useRouter } from "next/router";
import React from "react";
import { isValidEmail } from "../../helper/auth/is-valid-email";
import { InputDefaultComponentProps } from "../../types/input/input-default-component-props";

export function InputDefaultComponent({ onChange, onKeyDown, placeholder, label, showLabel,
    type, showValidInput, disabled, value } : InputDefaultComponentProps) {

    const router = useRouter()

    const [ newValue, setNewValue ] = React.useState<string>((value)? value : "")

    const isInvalid = (): boolean => {
        if (showValidInput && newValue == "") {
            return true
        } else if (showValidInput && !isValidEmail(newValue) && newValue != "" && type == "email") {
            return true
        }
        return false
    }
    
    return (
    <>
        {(type != "textarea" && onKeyDown == null) && (
        <div className="mb-3">
            {(showLabel == true) && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            )}
            {(type == "textarea") && (
                <textarea 
                    rows={4}
                    className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder={placeholder}>
                    value={(value)? value : ""}
                    onChange={(e) => {
                        (onChange) ? onChange(e.target.value) : console.log("")
                        setNewValue(e.target.value)
                    }}
                    disabled={disabled}
                </textarea>
            )}
            {(type != "textarea" && onKeyDown == null) && (
                <input type={(type) ? type : "text" }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    defaultValue={(value)? value : ""}
                    onChange={(e) => {
                        (onChange) ? onChange(e.target.value) : console.log("")
                        setNewValue(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (onKeyDown) {
                            onKeyDown(e)
                        }
                    }}
                    disabled={disabled}
                />
            )}
            {(type != "textarea" && onKeyDown) && (
                <input type={(type) ? type : "text" }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                defaultValue={(value)? value : ""}
                onChange={(e) => {
                    (onChange) ? onChange(e.target.value) : console.log("")
                    setNewValue(e.target.value)
                }}
                onKeyDown={(e) => {
                    onKeyDown(e)
                    if (e.key == "Enter" || e.key === "") {
                        setNewValue("")
                    }
                }}
                disabled={disabled}
            />
            )}




            {(showValidInput && newValue == "") && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    '{label}' {((router.locale == "en") ? " cannot empty" : " tidak boleh kosong")}
                </p>
            )}
            {(showValidInput && !isValidEmail(newValue) && newValue != "" && type == "email") && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    {(router.locale == "en") ? "Please enter the correct email." : "Silahkan ketik email yang benar"}
                </p>
            )}
            
        </div>
        )}
    </>
    );
};