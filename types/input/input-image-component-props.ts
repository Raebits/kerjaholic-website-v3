export type InputImageComponentProps = {
    onChange: (value: File) => void
    placeholder: string
    type: TypeImageInputComponent
    label?: string
    className?: string 
    showValidInput?: boolean 
    initValue: any
    isShowed?: (e:boolean) => void
    aspectRatio ?: number
}

export enum TypeImageInputComponent {
    pdf = "application/pdf",
    image = "image/*",
    video = "video/mp4"
}