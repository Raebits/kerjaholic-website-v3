export type InputSelectComponentProps = {
    showTitle? : boolean
    loading ?: boolean
    onSelect?: (obj: selectedObject) => void
    onSearch?: (keyword:string) => void
    fetchData?: (opened) => void
    list: ListType[]
    keyValue: string
    keyLabel:string
    title: string
    showValidInput? : boolean
    value: any
    label: string
    disabled ?: boolean
}

type ListType = {
    [key: string]: any
}

interface selectedObject {
    [key: string]: any
}

