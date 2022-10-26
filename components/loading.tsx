import { useRouter } from "next/router"
import React from "react"
import LoadingProps from "../types/loading-props"

export default function Loading({ showed }: LoadingProps): JSX.Element {
    
    return (
            <div className = {`${!showed ? 'hidden' : 'flex'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 justify-center h-screen items-center z-50`}>
                <div className = "flex flex-col items-center justify-center bg-white rounded-lg p-2 w-36 h-36">
                    <img className = "w-1/2" src = "../images/loading.gif"/>
                    <div>Menunggu . . . </div>
                </div>
            </div>
    )
}

  