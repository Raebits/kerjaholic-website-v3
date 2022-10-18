import { TFunction } from "next-i18next"

type HeaderProfileComponentProps = {
    translate?: TFunction,
    avatar: string,
    name: string, 
    kenalan: number,
    address: string,
    about: string,
    userId: string,
    isMyProfile: boolean
}

export default HeaderProfileComponentProps