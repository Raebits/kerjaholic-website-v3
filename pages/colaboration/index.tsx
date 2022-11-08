import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import qs from 'querystring';
import { authGuard } from "../../helper/authentification-modules";
import HTMLReactParser from "html-react-parser";
import { GetServerSidePropsContext } from 'next'
import DetailProjectPageProps from "../../types/project/detail-project-page-props";
import Layout from "../../components/layout";
import { InputSelectComponent } from "../../components/input/input-select-component";
import { getCity_json } from "../../api/get-list-city";
import { CityModel } from "../../models/city-model";
import SidebarNavigation from "../../components/navigation/sidebar-navigation";

function DetailProject({ slug, userIdAccess, dataServer }: DetailProjectPageProps) {
    // React.useEffect(() => {
    //     console.log(slug)
    // })
    
    const [listCity, setListCity] = React.useState<CityModel[]>([])
    const [loadingCity, setLoadingCity] = React.useState<boolean>(false)
    async function getCity(searchWord){
        await setLoadingCity(true)
        // hit endpoint
        let response = await getCity_json(searchWord as string)
    
    
        if (response) {
                await setListCity(response)
                console.log(response)
                await setLoadingCity(false)
        }

    }

    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="h-screen">I want to redirect You</div>
                </SidebarNavigation>
            
        </Layout>
    )
}

export const getServerSideProps = authGuard((context) => {
    // const { slug } = context.query
    return {
        redirect: {
            destination: "/colaboration/project",
            permanent: false
        }
    }
})


export default DetailProject;