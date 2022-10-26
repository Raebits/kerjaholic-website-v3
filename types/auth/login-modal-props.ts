import firebase from "firebase";
type LoginModalProps = {
    deviceToken?: string,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    loading?: boolean,
    setProviderReg?: (state?: boolean, user?: firebase.User, idTokenFirebase?: string) => void,
    setEmailReg?: (val:boolean) => void,
}
  
export default LoginModalProps