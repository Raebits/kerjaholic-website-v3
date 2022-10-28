import React from "react";

export type InputChexboxComponentProps = {
    onChange: (value: boolean) => void
    label?: string,
    name?: string
    initValue?: boolean,
    children?: React.ReactNode,
}