export type InputDateComponentProps = {
    title: string
    hideLabel?: boolean
    onChange: (value: string) => void
    outFormat?: string
    showValidInput?: boolean 
    value?: string | number
}