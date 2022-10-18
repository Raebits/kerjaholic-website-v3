import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import qs from 'querystring';
import Meta from "../../../components/meta";

import ShareLayout from "../../../components/share-layout";
import { getDetailArticle_json } from "../../../api/article/get-detail-article";
import { checkValidResponse } from "../../../helper/check-error-response";
import { DetailArticleBuilder } from "../../../model-builder/article/detail-article-builder";
import DetailArticlePageProps from "../../../types/article/detail-article-page-props";

import AppRedirectContext from "../../../utils/context/app-redirect-context";
import { requestReactionToArticle } from "../../../api/article/reaction-to-article";
import HTMLReactParser from "html-react-parser";

function DetailArticle({ slug, userIdAccess, dataServer }: DetailArticlePageProps) {
    
    const layoutRef = React.useRef<HTMLDivElement>()

    let detailArticle = DetailArticleBuilder.toDetailArticleModel((dataServer == null)? null : dataServer)

    const { t } = useTranslation('home');

    const { toggleAppRedirectFull } = React.useContext(AppRedirectContext)

    const { showAppRedirectMini } = React.useContext(AppRedirectContext)

    const [widthDevice, setWidthDevice] = React.useState<number>()

    const [isLiked, setIsLiked] = React.useState<boolean>(detailArticle.reacted == 1)
    const [numberLiked, setNumberLiked] = React.useState<number>(detailArticle.liked)
    const [isRequesting, setIsRequesting] = React.useState<boolean>(false)

    
    React.useEffect(() => {
       console.log(detailArticle);
    }, [detailArticle])

    const actionLike = () => {
        if (userIdAccess != "-") {
            if (isRequesting == false) {
                setIsLiked(!isLiked)
                setNumberLiked((numberLiked - ((isLiked) ? 1 : (-1))))
                reactionToArticle()
            }
        } else {
            toggleAppRedirectFull()
        }
    }

    const reactionToArticle = async () => {

        setIsRequesting(true)        

        let response = await requestReactionToArticle(slug, userIdAccess)
    
        if (response) {
            setIsRequesting(false)
        }
    }


    if (detailArticle == null) {
        // return (
        //     <Layout
        //         useTopNav={false} 
        //         useBackNav={(userIdAccess != "-") ? false : true}
        //         translate={t}
        //         titleNav={t("Detil Artikel")}
        //         meta={{
        //             title: "Tidak Ditemukan"
        //         }}>
                    
        //         <div ref={layoutRef} 
        //             className="container-content m-0 pr-lg-0 pl-lg-0 pr-0 pl-0">
        //             <div className="col-lg-12 m-0 p-0 pt-2 pb-3">

        //             </div>
        //         </div>
        //     </Layout>
        // )
    }

    return (
        <ShareLayout
            useTopNav={userIdAccess === '-'} 
            titleNav={"Detail Artikel"}
            useMobileRedirectDialog={userIdAccess === '-'}
            deeplink={(userIdAccess === '-' && detailArticle.deeplink)}
            meta={{
                title: detailArticle.title,
                desc: detailArticle.content,
                thumbnail: ((detailArticle.thumbnail == "-") ? null : detailArticle.thumbnail)
            }}
        >
            {/* banner */}
            <div className = { userIdAccess === '-' ? "flex items-center justify-center" : "flex items-center justify-center -mt-12" }>
                <img className = "object-cover" src={detailArticle.image}/>
            </div>
            {/* content */}
            <div className = "px-5 mt-5 mb-16">
                {/* judul */}
                <div className = " font-poppinsMedium">
                    {detailArticle.title}
                </div>
                {/* properties */}
                <div className = "flex items-center">
                    <div className = "flex-grow text-xs text-gray-500">
                        {detailArticle.creatorName} | {detailArticle.postDate}
                    </div>
                    <div className = "flex-none flex items-center text-xs text-gray-500">
                        <img src="/images/article/eye.png" className={"h-3 w-auto"}/>
                        <div className = "px-1">{detailArticle.viewed}</div>
                    </div>
                </div>
                {/* content */}
                <div className = "mt-5">
                    {HTMLReactParser(detailArticle.content)}
                </div>
                {/* like  */}
                <div className = "flex justify-center mt-10 mb-52">
                    <button onClick={() => !isRequesting && actionLike()} className = {`${isLiked ? 'border-[#FF0000] fill-bl' : 'border-gray-600 bg-white'} flex items-center px-3 py-2 rounded-full border`}>
                        <img src={(isLiked) ? "/images/status-sosmed/like-red.svg" : "/images/status-sosmed/like.png"}
                            className={"h-5 w-auto"}
                        />
                        <div className = "mx-2 text-xs">{numberLiked}</div>
                    </button>
                </div>
            </div>
        </ShareLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale, req } = context
    const { slug } = context.query
    
    // handler form data userId from mobile
    var userIdAccess: string = "-";

    const streamPromise = new Promise( ( resolve, reject ) => {

        let postBody = '';
  
        req.on( 'data', ( data ) => {
          postBody += data.toString();
        });
  
        req.on( 'end', () => {
            const postData = qs.parse( postBody );
            resolve(postData);
        });
    });
  
    try {
        const { userId }: any = await streamPromise;
        
        if (userId) {
            userIdAccess = userId
        }
    } catch ( error ) { }

    if (slug == null) {
        return {
            props: {
                ...(await serverSideTranslations(locale, ['home'])),
            }
        } 
    }
    
    let response = await getDetailArticle_json(slug as string, userIdAccess)
    
    var dataServer = JSON.stringify(response)

    if (checkValidResponse(dataServer) == true) {
        return {
            props: {
                slug,
                dataServer,
                userIdAccess,
                ...(await serverSideTranslations(locale, ['home'])),
            }
        }    
    } else {
        return {
            props: {
                slug,
                userIdAccess,
                ...(await serverSideTranslations(locale, ['home'])),
            }
        }    
    }
}


export default DetailArticle;