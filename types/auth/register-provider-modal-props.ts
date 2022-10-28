import firebase from "firebase";
import { ProviderAuthType } from "../../enum/auth/provider-auth-type";

type RegisterProviderModalProps = {
    deviceToken?: string,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    loading?: boolean,
    idTokenFirebase: string,
    user: firebase.User,
    providerType: ProviderAuthType 
}
  
export default RegisterProviderModalProps