import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import qs from 'querystring';
import Meta from "../../../components/meta"
import Layout from "../../../components/layout";
import { getDetailArticle_json } from "../../../api/article/get-detail-article";
import { checkValidResponse } from "../../../helper/check-error-response";
import { DetailArticleBuilder } from "../../../model-builder/article/detail-article-builder";
import DetailArticleWebPageProps from "../../../types/article/detail-article-web-page-props";
import AppRedirectContext from "../../../utils/context/app-redirect-context";
import { requestReactionToArticle } from "../../../api/article/reaction-to-article";
import HTMLReactParser from "html-react-parser";
import { getAllArticle_json } from "../../../api/article/get-all-article";
import { ArticleBuilder } from "../../../model-builder/article/article-builder";

import { WhatsappIcon, WhatsappShareButton, 
    TwitterIcon, TwitterShareButton, 
    FacebookIcon, FacebookShareButton, 
    EmailIcon, EmailShareButton,
    FacebookMessengerIcon, FacebookMessengerShareButton,
    LineIcon, LineShareButton,
    LinkedinIcon, LinkedinShareButton,
    PinterestIcon, PinterestShareButton,
    TelegramIcon, TelegramShareButton
} from "react-share";

function DetailArticle({ slug, userIdAccess, dataServer, anotherArticleData }: DetailArticleWebPageProps) {
    
    const router = useRouter()
    const layoutRef = React.useRef<HTMLDivElement>()

    let detailArticle = DetailArticleBuilder.toDetailArticleModel((dataServer == null)? null : dataServer)
    let anotherArticle = ArticleBuilder.toArticleModel((anotherArticleData == null)? null : anotherArticleData)

    const [shareUrl, setShareUrl] = React.useState('')
    const { t } = useTranslation('home');
    const { toggleAppRedirectFull } = React.useContext(AppRedirectContext)
    const [isLiked, setIsLiked] = React.useState<boolean>(detailArticle.reacted == 1)
    const [numberLiked, setNumberLiked] = React.useState<number>(detailArticle.liked)
    const [isRequesting, setIsRequesting] = React.useState<boolean>(false)


    React.useEffect(() => {
        if(isRequesting){
            console.log('loading')
        }else{
            console.log('done')
        }
     }, [isRequesting])

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
        return (
            <Layout title={"Artikel"}>
                <div ref={layoutRef} className="w-30 m-5 bg-primary">
                    <div className="col-lg-12 m-0 p-0 pt-2 pb-3">

                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout title={"Artikel"}>
            {/* Meta */}
            <Meta title = {detailArticle.title}
                desc = {detailArticle.content}
                thumbnail= {((detailArticle.thumbnail == "-") ? null : detailArticle.thumbnail)} 
            />
            <div ref={layoutRef} className="mt-10 mx-6 md:px-32 " >
                {/* slug part */}
                <div className = "flex text-gray-500 dark:text-white">
                <p onClick = {() => router.push('/')} style={{cursor: "pointer"}} className = "mr-2 text-gray-500 dark:text-white">Home</p> / <p onClick = {() => router.push('/article')} style={{cursor: "pointer"}} className = "mx-2 text-gray-500 dark:text-white">Artikel</p> / <a className = "text-[#FF0000] mx-2 truncate">{detailArticle.title}</a>
                </div>
                {/* judul */}
                <div className = "text-2xl mt-2 text-gray-500 dark:text-white">{detailArticle.title}</div>
                {/* article date */}
                <div className = "flex items-center justify-center mt-3">
                    <div className = "flex-none text-gray-500">{detailArticle.postDate}</div>
                    <div className = "grow"></div>
                    <div className = "flex-none">
                        <div className = "flex justify-center items-center text-black dark:text-gray-500">
                            Share
                            <FacebookShareButton
                                url={shareUrl}
                                title={detailArticle.title}
                                className=" mx-2" >
                                <img className = "h-5 w-auto" src = "https://kerjaholic.s3.ap-southeast-1.amazonaws.com/images/website-assets/Facebook.png"/>
                            </FacebookShareButton>
                            <LinkedinShareButton 
                                url={shareUrl}
                                title={detailArticle.title}
                                className=" mx-2">
                                <img className = "h-5 w-auto" src = "https://kerjaholic.s3.ap-southeast-1.amazonaws.com/images/website-assets/LinkedIn.png"/>
                            </LinkedinShareButton>
                            <TwitterShareButton 
                                url={shareUrl}
                                title={detailArticle.title}
                                className=" mx-2">
                                <img className = "h-5 w-auto" src = "https://kerjaholic.s3.ap-southeast-1.amazonaws.com/images/website-assets/Twitter.png"/>
                            </TwitterShareButton>
                        </div>
                    </div>
                </div>
                {/* content part */}
                <div className = "mt-5 text-black dark:text-white">
                    {HTMLReactParser(detailArticle.content)}
                </div>
                {/* like button */}
                <div className = "flex justify-center">
                    <button className = "flex border border-gray-400 px-3 py-2 rounded-full mt-10 mb-20 bg-transparent dark:bg-white">
                        <img src = "https://kerjaholic.s3.ap-southeast-1.amazonaws.com/images/website-assets/like.png" className = "h-22 w-auto mr-3"/>
                        {detailArticle.liked}
                    </button>
                </div>
                {/* artikel lain */}
                <div className = "flex justify-center text-2xl font-bold text-black dark:text-white">
                    Artikel Lainnya
                </div>
                {/* list another article */}
                <div  className = "flex flex-wrap w-full justify-between items-center">
                {anotherArticle.map((obj, i) => 

                    <div key={i} className = "w-full lg:w-1/3 flex justify-center items-center lg:px-2 mb-6">
                        <div  onClick={() => router.push('/article/'+obj.slug)} style={{cursor: "pointer"}} className="w-full my-3 h-64">
                            <img className="object-cover rounded-lg" src={obj.image} alt="Article image"/>
                            <div className="mb-1 mt-3 text-md md:text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                                {obj.title}
                            </div>
                            <div className = "font-poppinsRegular  text-gray-500">
                                {obj.postDate}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale, req } = context
    const { slug } = context.query
    const lastPage = 0
    const take = 3
    const searchWord = ''

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

    let anotherArticleRes = []

    anotherArticleRes = await getAllArticle_json(lastPage as number, take as number, searchWord as string)
    
    var anotherArticleData = JSON.stringify(anotherArticleRes)

    if (checkValidResponse(dataServer) == true) {
        return {
            props: {
                slug,
                dataServer,
                anotherArticleData,
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