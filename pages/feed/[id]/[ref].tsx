import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import Meta from "../../../components/meta";

import ShareLayout from "../../../components/share-layout";
import { CommentSosmedModel } from "../../../models/sosmed/comment-sosmed-model";
import { DetailStatusSosmedModel } from "../../../models/sosmed/detail-status-sosmed-model";
import DetailStatusPageProps from "../../../types/sosmed/detail-status-page-props";
import { checkValidResponse } from "../../../helper/check-error-response";
import { DetailStatusSosmedBuilder } from "../../../model-builder/sosmed/detail-status-sosmed-builder";
import { getDetailSosmedStatus_json } from "../../../api/status-sosmed/get-detail-status-sosmed";
import AppRedirectContext from "../../../utils/context/app-redirect-context";

function Status({ id, dataServer }: DetailStatusPageProps): JSX.Element {

    let dataServerSide = DetailStatusSosmedBuilder.toDetailStatusSosmedModel((dataServer == null)? null : dataServer)

    const { t } = useTranslation('home');
    const { showAppRedirect, showAppRedirectMini,toggleAppRedirectFull, toggleAppRedirectMini } = React.useContext(AppRedirectContext)

    const [ loading, setLoading ] = React.useState<boolean>(true)
    const [ detailSosmedStatus, setDetailSosmedStatus ] = React.useState<DetailStatusSosmedModel>()
    const [ listCommentSosmed, setListCommentSosmed ] = React.useState<CommentSosmedModel[]>([])
    const [lastScrolled, setLastScrolled] = React.useState<number>(0)

    const [mobilePop, setMobilePop] = React.useState<boolean>(true)

    let listener = null
    React.useEffect(() => {
        listener = document.addEventListener("scroll", e => {
            var scrolled = document.scrollingElement.scrollTop
            if(lastScrolled != scrolled){
                if(mobilePop){
                    setMobilePop(false)
                }
            }
            
        })
        return () => {
            document.removeEventListener("scroll", listener)
        }
    }, [])

    React.useEffect(() => {
        if (dataServer) {
            setDetailSosmedStatus(dataServerSide)
            setListCommentSosmed(dataServerSide.comment)
            setLoading(false)
        }
    }, [id, dataServer])
  
    function directApp() {
        toggleAppRedirectFull()
    }

    return (
        <ShareLayout
            useTopNav={true} 
            titleNav={"Share Feed"}
            useMobileRedirectDialog={true}
            meta={{
                title: "@" + dataServerSide.userName + " on Kerjaholic",
                desc: dataServerSide.feedContent,
                thumbnail: ((dataServerSide.metaImage == "-") ? null : dataServerSide.metaImage)
            }}
        >
            {(!loading) && (
                <>
                {/* content wrapper  */}
                <div className = "flex flex-col pt-4 pb-20 px-5">
                    {/* feed header  */}
                    <div className = "flex bg-white w-full justify-center items-center">
                        <div className = "flex-none  w-10">
                            <img src={detailSosmedStatus.pic} alt="profile-pic" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                        </div>
                        <div className = "flex-grow  px-2">
                            <div className = "">{detailSosmedStatus.userName}</div>
                            <div className = "">{detailSosmedStatus.inPostDate}</div>
                        </div>
                        <div style={{cursor: "pointer"}} onClick={() => directApp()} className = "flex-none">
                            <img src="/images/status-sosmed/dot-more.png" 
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    {/* feed text  */}
                    <div className = " py-3">
                        {detailSosmedStatus.feedContent}
                    </div>
                    {/* feed image (no image "-") */}
                    {detailSosmedStatus.feedMedia !== '-' && (
                        <img className = "object-cover" src = {detailSosmedStatus.feedMedia}/>
                    )}

                    {/* feed tooltip */}
                    <div className = "flex justify-center items-center ">
                        <div style={{cursor: "pointer"}} onClick={() => directApp()} className = " z-10 flex-none flex items-center p-2">
                            <img className = "h-4 w-auto " src="/images/status-sosmed/love.png" ></img>
                            <div className = "px-2 ">0</div>
                        </div>
                        <div style={{cursor: "pointer"}} onClick={() => directApp()}  className = "z-10 flex-grow flex items-center p-2">
                            <img className = "h-4 w-auto " src="/images/status-sosmed/comment.png" ></img>
                            <div className = "px-2 ">0</div>
                        </div>
                        <div style={{cursor: "pointer"}} onClick={() => directApp()}  className = "z-10 flex-none flex items-center p-2">
                            <img className = "h-4 w-auto " src="/images/status-sosmed/share.png" ></img>
                            <div className = "px-2 ">Bagikan</div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </ShareLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale, req } = context
    const { id } = context.query

    if (id == null) {
        return {
            props: {
                ...(await serverSideTranslations(locale, ['home'])),
            }
        } 
    } 
    
    let response = await getDetailSosmedStatus_json(id as string)
    
    var dataServer = JSON.stringify(response)

    if (checkValidResponse(dataServer) == true) {
        return {
            props: {
                id,
                dataServer,
                ...(await serverSideTranslations(locale, ['home'])),
            }
        }    
    } else {
        return {
            props: {
                id,
                ...(await serverSideTranslations(locale, ['home'])),
            }
        }    
    }
}


export default Status;