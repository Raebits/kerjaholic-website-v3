import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import qs from 'querystring';
import { authGuard } from "../../helper/authentification-modules";
import HTMLReactParser from "html-react-parser";
import { GetServerSidePropsContext } from 'next'
import DetailProjectPageProps from "../../types/project/detail-project-page-props";

function DetailProject({ slug, userIdAccess, dataServer }: DetailProjectPageProps) {
    React.useEffect(() => {
        console.log(slug)
    })

    return (
        <div>
            protected routes
        </div>
    )
}

export const getServerSideProps = authGuard((context) => {
    const { slug } = context.query
    return {
        props: {slug},
    }
})


export default DetailProject;