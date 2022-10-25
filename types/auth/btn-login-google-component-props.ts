import firebase from "firebase";

export type BtnLoginGoogleComponentProps = {
    success: (token: string) => void,
    notFound: (user: firebase.User, idTokenFirebase: string) => void
    className?: string 
}