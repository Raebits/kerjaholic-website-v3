export type InputColorComponentProps = {
    title: string
    showTitle?: Boolean
    showValidInput?: boolean 
    onSelect: (obj: selectedObject) => void
    list?: ListType
    value?: string
    loading :boolean
}

type ListType = {
    [key: string]: any
}

interface selectedObject {
    [key: string]: any
}