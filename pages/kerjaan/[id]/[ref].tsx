import React from "react";
import { useRouter } from "next/router"
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";

import ShareLayout from "../../../components/share-layout";
import JobDetailProps from "../../../types/job/job-detail-props";
import { JobDetailModel } from "../../../models/job/job-detail-model";
import { checkValidResponse } from "../../../helper/check-error-response";
import { JobDetailBuilder } from "../../../model-builder/job/job-detail-builder";
import { getDetailJob_json } from "../../../api/job/get-detail-job";
import { capitalizeFirstWords } from "../../../helper/capitalize-first-letter";
import AppRedirectContext from "../../../utils/context/app-redirect-context";

export default function Detail({ id, dataServer }: JobDetailProps): JSX.Element {

    let dataServerSide = JobDetailBuilder.toJobDetailModel((dataServer == null)? null : dataServer)
    const { showAppRedirect, showAppRedirectMini,toggleAppRedirectFull, toggleAppRedirectMini } = React.useContext(AppRedirectContext)

    const router = useRouter()
    const { t } = useTranslation('kerjaan');

    const [ loading, setLoading ] = React.useState<boolean>(true)
    const [ jobDetail, setJobDetail ] = React.useState<JobDetailModel>(null)

    React.useEffect(() => {
        if (dataServerSide != null) {
            setJobDetail(dataServerSide)
            setLoading(false)
        }
    }, [id])
    
    function redirectApp(){
        toggleAppRedirectFull()
    }

    return (
        <ShareLayout
            useTopNav={true} 
            titleNav={"Detail Kerjaan"}
            useMobileRedirectDialog={true}
            meta={{
                title: ("Lowongan pekerjaan baru : " + dataServerSide.jobName),
                desc: dataServerSide.jobDetail
            }}
        >
            {(!loading) && (
                <div className = "bg-gray-100 mb-40">
                    {/* relative red  */}
                    <div className = "bg-[#FF0000] relative flex w-full h-14">
                        <div className ="absolute flex h-20 w-20 top-4 left-4">
                            <img className="shadow rounded-full max-w-full h-auto align-middle border-none" src={jobDetail.bosPhoto} alt="profile-pic"  />
                        </div>
                    </div>
                    {/* content  */}
                    <div className = "px-4 pt-12 bg-white">
                        {/* date  */}
                        <div className = "text-xs text-gray-500">{jobDetail.jobDate}</div>

                        <div className = "font-bold text-lg">{jobDetail.jobName}</div>

                        <div className = "">{jobDetail.bosName}</div>

                        <div className = "">{capitalizeFirstWords(jobDetail.jobCityString)}</div>

                        <div className = "mt-3 text-green-600 pb-3">{jobDetail.jobSalary}</div>
                    </div>
                    {/* detail job  */}
                    <div className = "px-4 mt-1 bg-white py-4">
                        <div className = "mt-5 font-bold mb-2">Detil</div>

                        <div className = "flex justify-center items-center">
                            <div className = "flex-none">
                                <img className = "h-4" src= "/images/job-detail/job-type.png"/>
                            </div>
                            <div className = "flex-grow flex flex-col justify-center px-3">
                                <div className = "flex">
                                    Tipe Pekerjaan
                                </div>
                                <div className = "flex">
                                    {jobDetail.jobTypeString}
                                </div>
                            </div>
                        </div>

                        <div className = "flex justify-center items-center mt-3">
                            <div className = "flex-none ">
                                <img className = "h-4" src= "/images/job-detail/job-category.png"/>
                            </div>
                            <div className = "flex-grow  flex flex-col justify-center px-3">
                                <div className = "flex">
                                    Kategori Pekerjaan
                                </div>
                                <div className = "flex">
                                    {jobDetail.categoryString}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* deskripsi job  */}
                    <div className = "px-4 mt-1 py-4 bg-white">
                        <div className = "mt-5 font-bold mb-2">Deskripsi</div>
                        <div className ="">
                            {jobDetail.jobDetail}
                        </div>
                    </div>
                    {/* lokasi job  */}
                    <div className = "px-4 mt-1 pt-4 pb-20 bg-white">
                        <div className = "mt-5 font-bold mb-2">Lokasi Kerja</div>
                        <div className ="">
                            {jobDetail.jobCityString}
                        </div>
                        <div className ="text-gray-400 text-xs">
                            {jobDetail.jobTypingAddress}
                        </div>
                        {/* button lamar  */}
                        <div className = "py-4">
                            <button style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "bg-[#FF0000] px-4 py-3 rounded-md text-white w-full">Lamar</button>
                        </div>
                    </div>

                    
                </div>
            )}
        </ShareLayout>
        
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale } = context
    const { id } = context.query

    if (id == null) {
        return {
            props: {
                ...(await serverSideTranslations(locale, ['kerjaan'])),
            }
        } 
    } 
    var response = await getDetailJob_json(id as string, "in");

    var dataServer = JSON.stringify(response)
    
    if (checkValidResponse(dataServer) == true) {
        return {
            props: {
                id,
                dataServer,
                ...(await serverSideTranslations(locale, ['kerjaan'])),
            }
        }    
    } else {
        return {
            props: {
                id,
                ...(await serverSideTranslations(locale, ['kerjaan'])),
            }
        }  
    }
}
