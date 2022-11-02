import React from "react";
import { GetServerSideProps, GetStaticProps } from "next";

import Layout from "../components/layout";

import CoveredBySectionHome from "../components/home-index/coveredby-section-component";
import TestimonialsSectionHome from "../components/home-index/testimonials-section-component";
import ArticleSectionHome from "../components/home-index/article-section-component";
import FeatureKenalanSectionHome from "../components/home-index/features-kenalan-section-component";
import MainKenalanSectionHome from "../components/home-index/main-kenalan-section-component";
import Cookies from "universal-cookie";

function Index(): JSX.Element {

    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {true}>
            <div className="-mt-14">
                {/* Main Section */}
                <MainKenalanSectionHome />
                {/* Feature App Section */}
                <FeatureKenalanSectionHome />

                {/* article Section */}
                <ArticleSectionHome />

                {/* Covered By Section */}
                <CoveredBySectionHome />

                {/* Testimonials Section */}
                <TestimonialsSectionHome />
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, query } = context
    const { type, feedId, shareJob, jobId } = query
  
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();

    if (type != undefined && feedId != undefined && type == "detailFeed") {
        return {
            redirect: {
                destination: "/feed/" + feedId + "/-",
                permanent: false
            }
        }
    } else if (shareJob != undefined && jobId != undefined) {
        return {
            redirect: {
                destination: "/kerjaan/" + jobId + "/-",
                permanent: false
            }
        }
    } else {
        return {
            props: {
                
            }
        }
    }
}

export default Index;