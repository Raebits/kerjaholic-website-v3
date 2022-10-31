export type InputSelectComponentProps = {
    showTitle? : boolean
    placeHolder: string
    loading: boolean
    onSelect: (obj: selectedObject) => void
    onSearch: (keyword:string) => void
    fetchData: (opened) => void
    list: ListType[]
    value: string
    label:string
    title: string
    showValidInput? : boolean
}

type ListType = {
    [key: string]: any
}

interface selectedObject {
    [key: string]: any
}

