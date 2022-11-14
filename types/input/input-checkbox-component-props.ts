import React from "react";

export type InputChexboxComponentProps = {
    onChange: (value: boolean) => void
    title?: string,
    name?: string
    initValue?: boolean,
    children?: React.ReactNode,
    showValidInput?: boolean
}