import React from "react";
import Link from "next/link";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from "../../components/layout";
import { getAllArticle_json } from "../../api/article/get-all-article";
import ListArticlePageProps from "../../types/article/list-article-page-props";
import { AllArticleModel } from "../../models/article/all-article-model";
import { checkValidResponse } from "../../helper/check-error-response";
import Cookies from "universal-cookie";
import { ArticleBuilder } from "../../model-builder/article/article-builder";

export default function Index(): JSX.Element {

    const router = useRouter()
    const limit = 10

    const [ heightDevice, setHeightDevice] = React.useState(0)
    const [ listArticle, setListArticle ] = React.useState<AllArticleModel[]>([])
    const [ loading, setLoading] = React.useState(true)
    const [ hasMore, setHasMore] = React.useState(false)
    const [ lastPage, setLastPage] = React.useState(0)

    const observer = React.useRef<any>();

    const lastArticleElementRef = React.useCallback(node => {
        if(loading) return 
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                nextArticle(lastPage,limit,'')
            }
        })

        if (node) observer.current.observe(node)
    },[loading, hasMore]) 
    

    React.useEffect(() => {

        setHeightDevice(window.innerHeight)
        nextArticle(lastPage,limit,'')

    }, [])

    async function nextArticle(lastPage, take, searchWord){
        setLoading(true)
        // hit endpoint
        let response = await getAllArticle_json(lastPage as number, take as number, searchWord as string)
    
        var dataServer = JSON.stringify(response)

        let dataServerSide = ArticleBuilder.toArticleModel((dataServer == null)? null : dataServer)

        if (dataServer) {
            if(dataServerSide.length > 0){
                let newArray = listArticle.concat(dataServerSide)
                setListArticle(newArray)
                setLastPage(newArray.length)
                setHasMore(true)
            }else{
                setHasMore(false)

            }
            // setInterval(() => {
                setLoading(false)
            //   }, 1000);
        }

    }

    return (
        <Layout title={"Artikel"}>
            <div className = "mt-10 mx-6 md:px-32 ">
                {/* breadcrumb */}
                <div className = "mb-5 flex text-gray-500 dark:text-white">
                    <p onClick = {() => router.push('/')} style={{cursor: "pointer"}} className = "mr-2 text-gray-500 dark:text-white">Home</p> / <p className = "mx-2 text-[#FF0000]">Artikel</p>
                </div>
                {/* content */}
                {/* mdup handler */}
                <div className = "flex flex-col">
                {
                    listArticle.map((obj, i) =>{ 
                        if(listArticle.length === i+1){
                            return(
                                <div style={{cursor: "pointer"}} className = "flex mb-10 sm:mb-0 flex-col sm:flex-row " ref = {lastArticleElementRef} key={i} onClick={() => router.push('article/'+obj.slug)}>
                                    <div className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-2 flex justify-center items-center">
                                        <img src={obj.image} className = "object-cover h-full rounded-lg" />
                                        
                                    </div>
                                    <div className = "w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
                                        <div className = "flex flex-col p-2">
                                            <div className="text-xl text-gray-800 dark:text-white" >
                                            {obj.title}
                                            </div>
                                            <div className="text-gray-500" >
                                            {obj.postDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )        
                        }else{
                            return(
                                <div style={{cursor: "pointer"}} className = "flex mb-10 sm:mb-0 flex-col sm:flex-row " key={i} onClick={() => router.push('article/'+obj.slug)}>
                                    <div className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4  pr-2 py-2 flex justify-center items-center">
                                        <img src={obj.image} className = "object-cover h-full rounded-lg" />
                                        
                                    </div>
                                    <div className = "w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
                                        <div className = "flex flex-col p-2">
                                            <div className="text-xl text-gray-800 dark:text-white" >
                                            {obj.title}
                                            </div>
                                            <div className="text-gray-500" >
                                            {obj.postDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )    
                        }
                    })
                }
                {loading && (
                    <>
                     <div className = "flex mb-10 sm:mb-0 flex-col sm:flex-row animate-pulse" >
                        <div className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-2 flex justify-center items-center">
                            <img src="/images/loading-image.svg" className = "object-cover h-full w-full rounded-lg" />
                            
                        </div>
                        <div className = "w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
                            <div className = "flex flex-col p-2">
                                <div className="h-5 bg-gray-600 rounded-full mb-3 mt-2 " >
                                    
                                </div>
                                <div className="bg-gray-600 rounded-full text-gray-500 h-3.5" >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "flex mb-10 sm:mb-0 flex-col sm:flex-row animate-pulse" >
                        <div className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-2 flex justify-center items-center">
                            <img src="/images/loading-image.svg" className = "object-cover h-full w-full rounded-lg" />
                            
                        </div>
                        <div className = "w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
                            <div className = "flex flex-col p-2">
                                <div className="h-5 bg-gray-600 rounded-full mb-3 mt-2 " >
                                    
                                </div>
                                <div className="bg-gray-600 rounded-full text-gray-500 h-3.5" >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "flex mb-10 sm:mb-0 flex-col sm:flex-row animate-pulse" >
                        <div className = "w-full sm:w-1/2 md:w-1/3 lg:w-1/4  p-2 flex justify-center items-center">
                            <img src="https://listim.com/resize?path=%2Fupload%2F2018%2F11%2F1200_400--croped.jpg&w=400&h=260" className = "object-cover h-full w-full rounded-lg" />
                            
                        </div>
                        <div className = "w-full sm:w-1/2 md:w-2/3 lg:w-3/4">
                            <div className = "flex flex-col p-2">
                                <div className="h-5 bg-gray-600 rounded-full mb-3 mt-2 " >
                                    
                                </div>
                                <div className="bg-gray-600 rounded-full text-gray-500 h-3.5" >
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
                </div>
            </div>

        </Layout>
    )
}
