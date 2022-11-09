import firebase from "firebase";
import { ProviderAuthType } from "../../enum/auth/provider-auth-type";

type ModalWrapperProps = {
    children: React.ReactNode,
    showed?: boolean,
    setShowed?: (val:boolean) => void,
    loading?: boolean,
}
  
export default ModalWrapperProps