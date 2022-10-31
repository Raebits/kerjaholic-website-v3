import React from "react";

export type InputPhoneComponentProps = {
    onChange?: (value: string) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder: string
    title?: string
    showTitle?: boolean
    type?: string
    value: string
    showValidInput?: boolean 
    disabled?: boolean 
}