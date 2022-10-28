export type InputSelectComponentProps = {
    placeHolder: string
    loading: boolean
    onSelect: (obj: selectedObject) => void
    onSearch: (keyword:string) => void
    fetchData: (opened) => void
    list: ListType[]
    value: string
    label:string
}

type ListType = {
    [key: string]: any
}

interface selectedObject {
    [key: string]: any
}

