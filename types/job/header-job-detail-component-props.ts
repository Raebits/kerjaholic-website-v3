import { TFunction } from "next-i18next"
import { JobDetailModel } from "../../models/job/job-detail-model"

type HeaderJobDetailComponentProps = {
    translate?: TFunction,
    data: JobDetailModel
}

export default HeaderJobDetailComponentProps