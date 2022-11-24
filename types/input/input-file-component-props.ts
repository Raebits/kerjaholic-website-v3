export type InputFileComponentProps = {
    onChange: (value: File) => void
    placeholder: string
    type: TypeFileInputComponent
    label?: string
    className?: string 
    showValidInput?: boolean 
    initValue: any
}

export enum TypeFileInputComponent {
    pdf = "application/pdf",
    image = "image/*",
    video = "video/mp4"
}