import { useRouter } from "next/router"
import React from "react"
import { is_iOS } from "../../helper/get-mobile-operating-system"
import AppRedirecDialogProps from "../../types/dialog/app-redirect-dialog-props"

export default function AppRedirectDialog({ showed, deeplink }: AppRedirecDialogProps): JSX.Element {

    const router = useRouter()
    const { ref } = router.query // fmAcE6MrH3oRCui87

    const [ store, setStore ] = React.useState<string>("Playstore")
 
    React.useEffect(() => {
        setStore((is_iOS() == true) ? "AppStore" : "Playstore")
    }, [])

    const openApp = () => {
        if (deeplink == null) {
            router.push("https://kerjaholic.page.link/" + ref)
        } else {
            if(deeplink !== ''){
                router.push("/")
            }

        }
    }

    if ((ref == undefined || ref == "-") && deeplink == null) {
        return (
            <div className="p-0 m-0"></div>
        )
    } else {
        return (
            <div className = {`${showed ? 'translate-y-0' : 'translate-y-12'} transition transform ease-in-out duration-300 w-full fixed bottom-0 flex justify-center z-30`}>
                <div className =  {`${!showed && 'flex-col-reverse' } py-4 bg-white shadow-[0_-2px_4px_2px_rgba(0,0,0,0.1)]  flex flex-col items-center rounded-t-lg justify-center w-full sm:w-1/2 lg:w-1/3 px-2`}>
                    <div className = "flex text-center p-5"> 
                        {showed && (
                            <p>
                                Fitur ini dapat diakses melalui aplikasi mobile kami, silahkan buka atau download di {store}.
                            </p>

                        )}
                    </div>
                    <button onClick={() => openApp()} className = "bg-[#FF0000] flex justify-center w-full py-2 text-sm text-white rounded-md">Buka di Aplikasi mobile</button>
                </div>
            </div>
        )
    }
}
  