import { TFunction } from "next-i18next"

type ItemTopNavProps = {
    translate?: TFunction,
    widthLayout: number,
    title?: string,
    selected?: number
}

export default ItemTopNavProps