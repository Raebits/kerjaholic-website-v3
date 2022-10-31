import firebase from "firebase";
import { ProviderAuthType } from "../../enum/auth/provider-auth-type";

type LoginModalProps = {
    deviceToken?: string,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    showedRegEmail?: boolean,
    setShowedRegEmail?: (val:boolean) => void,
    showedRegProvider?: boolean,
    setShowedRegProvider?: (val:boolean) => void,
    loading?: boolean,
    setProviderReg?: (state?: boolean, user?: firebase.User, idTokenFirebase?: string, provider? : ProviderAuthType) => void,
    setEmailReg?: (val:boolean) => void,
}
  
export default LoginModalProps