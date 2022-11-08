import React from "react";
import { useRouter } from "next/router";
import Layout from "../layout";
import SidebarNavigation from "../navigation/sidebar-navigation";

export default function ServerError(): JSX.Element {
      
    const router = useRouter()

    return (
        <Layout title={"Internal Server Error | Kerjaholic"} useFooter = {false}>
            <SidebarNavigation>
                <div className = "flex items-center justify-center w-full h-screen ">
                    Internal Server Error
                </div>
            </SidebarNavigation>
        </Layout>
    )
}