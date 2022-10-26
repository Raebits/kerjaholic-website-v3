import firebase from "firebase";
type RegisterProviderModalProps = {
    deviceToken?: string,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    loading?: boolean,
    idTokenFirebase: string,
    user: firebase.User
}
  
export default RegisterProviderModalProps