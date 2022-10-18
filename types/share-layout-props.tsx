import { TFunction } from "next-i18next"
import MetaProps from "../types/meta-props"

type LayoutProps = {
    children: React.ReactNode,
    useTopNav?: boolean,
    meta: MetaProps,
    titleNav?: string,
    useMobileRedirectDialog?: boolean,
    deeplink?: string
}
  
export default LayoutProps