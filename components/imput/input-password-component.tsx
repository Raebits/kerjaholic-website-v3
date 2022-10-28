import { useRouter } from "next/router";
import React from "react";
import { InputPasswordComponentProps } from "../../types/input/input-password-component-props";


export function InputPasswordComponent( { onChange, placeholder, label, showValidInput } : InputPasswordComponentProps) {
    const router = useRouter()

    const [passwordHide, setPasswordHide] = React.useState<boolean>(true);
    const [ value, setValue ] = React.useState<string>("")

    const isInvalid = (): boolean => {
        if (showValidInput && value == "") {
            return true
        }
        return false
    }

    return (
        <>
        <div className="flex flex-col mb-3">
            <div className="flex ">
                <input 
                    type={(passwordHide)? "password": "text"}
                    id="website-admin" 
                    className="rounded-none rounded-l-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 px-3 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={(placeholder) ? placeholder : "Kata Sandi"}
                    onChange={(e) => {
                        onChange(e.target.value)
                        setValue(e.target.value)
                    }}
                />
                <span className="inline-flex items-center px-3 text-xs text-gray-900 bg-gray-200 rounded-r-lg border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <img src={(!passwordHide)? '../icons/ic_password_invisible.svg' : '../icons/ic_password_visible.svg'} 
                        width="15px"
                        height="15px"
                        onClick={() => setPasswordHide(!passwordHide)} 
                    />
                </span>
            </div>
            {(isInvalid()) && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oops!</span>
                    '{label}' {((router.locale == "en") ? " cannot empty" : " tidak boleh kosong")}
                </p>
            )}
        </div>
        </>
    );
};
