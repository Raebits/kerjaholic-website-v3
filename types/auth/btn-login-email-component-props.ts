export type BtnLoginEmailComponentProps = {
    email: string
    password: string
    success: (token: string) => void
}