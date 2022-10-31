import { useRouter } from "next/router";
import React from "react";
import { isValidEmail } from "../../helper/auth/is-valid-email";
import { InputPhoneComponentProps } from "../../types/input/input-phone-component-props";

export function InputPhoneComponent({ onChange, onKeyDown, placeholder, title, showTitle,
    type, showValidInput, disabled, value }: InputPhoneComponentProps) {

    const router = useRouter()

    const [newValue, setNewValue] = React.useState<string>((value) ? value : "")

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
                    {(showTitle == true) && (
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
                    )}
                    {(type != "textarea" && onKeyDown == null) && (
                        <input type={(type) ? type : "text"}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={placeholder}
                            defaultValue={(value) ? value : ""}
                            onChange={(e) => {
                                (onChange) ? onChange(e.target.value) : console.log("")
                                setNewValue(e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (onKeyDown) {
                                    onKeyDown(e)
                                }
                            }}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                            }}
                            disabled={disabled}
                        />
                    )}
                    {(type != "textarea" && onKeyDown) && (
                        <input type={(type) ? type : "text"}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={placeholder}
                            defaultValue={(value) ? value : ""}
                            onChange={(e) => {
                                
                                if (/[0-9]/.test(e.target.value)) {
                                    (onChange) ? onChange(e.target.value) : console.log("")
                                setNewValue(e.target.value)
                                  }
                            }}
                            onKeyDown={(e) => {
                                onKeyDown(e)
                                if (e.key == "Enter" || e.key === "") {
                                    setNewValue("")
                                }
                            }}
                            // onKeyPress={(event) => {
                            //     if (!/[0-9]/.test(event.key)) {
                            //       event.preventDefault();
                            //     }
                            //     "014".replace(/^0+/, '')
                            // }}
                            disabled={disabled}
                        />
                    )}




                    {(showValidInput && newValue == "") && (
                        <div className="flex mt-1 text-xs text-red-600 dark:text-red-500">
                            <span className="font-medium">Oops!</span>
                            <div className = "mx-1">
                                '{title}' {((router.locale == "en") ? " tidak boleh kosong" : " tidak boleh kosong")}
                            </div>
                        </div>
                    )}

                </div>
            )}
        </>
    );
};