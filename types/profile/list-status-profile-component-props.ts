import { TFunction } from "next-i18next"
import { StatusSosmedModel } from "../../models/sosmed/status-sosmed-model"

type ListStatusProfileComponentProps = {
    userId: string,
    userName: string,
    refShare?: string,
    listStatus: StatusSosmedModel[],
    translate: TFunction,
    loadingState?: boolean
}

export default ListStatusProfileComponentProps