export type BtnLoginEmailComponentProps = {
    email: string
    password: string
    success: (token: string) => void
    onLoading: (status: boolean) => void
}