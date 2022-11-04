import React from "react";
import { useRouter } from "next/router";

export default function EmptyData(): JSX.Element {
    
    const router = useRouter()

    return (
        <div className = "flex items-center justify-center w-full h-screen">
            Tidak ada data
        </div>
    )
}