import React from "react";

export type InputDefaultComponentProps = {
    onChange?: (value: string) => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    placeholder: string
    label?: string
    showLabel?: boolean
    type?: string
    value: string
    className?: string 
    showValidInput?: boolean 
    disabled?: boolean 
}