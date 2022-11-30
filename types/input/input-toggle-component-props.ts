import React from "react";

export type InputToggleComponentProps = {
    onChange: (value: boolean) => void
    title?: string,
    name?: string
    initValue?: boolean,
    children?: React.ReactNode,
    showValidInput? : boolean
}