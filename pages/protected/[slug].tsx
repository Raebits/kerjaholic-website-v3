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
import { InputSelectComponent } from "../../components/imput/input-select-component";
import { getCity_json } from "../../api/get-list-city";
import { CityModel } from "../../models/city-model";

function DetailProject({ slug, userIdAccess, dataServer }: DetailProjectPageProps) {
    React.useEffect(() => {
        console.log(slug)
    })
    
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
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"}>
            <div className = "mt-10 mx-6 md:px-32 h-screen ">
                menu list nih
            <InputSelectComponent
                    placeHolder="Pilih menu"
                    list={listCity}
                    value = "id" // define key for value
                    label = "city" // define key for label
                    fetchData = {(val) => val? getCity("") : setListCity([])}
                    onSelect={(val) => {
                        console.log(val)
                    }}
                    onSearch = {(keyword) => getCity(keyword)}
                    loading = {loadingCity}
                />
            </div>
        </Layout>
    )
}

export const getServerSideProps = authGuard((context) => {
    const { slug } = context.query
    return {
        props: {slug},
    }
})


export default DetailProject;