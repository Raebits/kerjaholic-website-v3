import React from "react";
import { useRouter } from 'next/router'
import { getAllArticle_json } from "../../api/article/get-all-article";
import { ArticleBuilder } from "../../model-builder/article/article-builder";
import { AllArticleModel } from "../../models/article/all-article-model";

export default function ArticleSectionHome(): JSX.Element {
    
    const router = useRouter()
    const [ listArticle, setListArticle ] = React.useState<AllArticleModel[]>([])

    async function getArticle(){
        let response = await getAllArticle_json(0, 3, '')
        var dataServer = JSON.stringify(response)

        let dataServerSide = ArticleBuilder.toArticleModel((dataServer == null)? null : dataServer)
        setListArticle(dataServerSide)
        
    }

    React.useEffect(() => {
        getArticle()
    }, [])
    


    return (
        <div className = "relative px-5 md:px-10">
            <div style = {{zIndex:-1}} className = "absolute -top-40 left-0 h-screen w-full bg-cover bg-[url('/images/index/bg-testimonials.png')]  bg-no-repeat "></div>
            <div className = " flex justify-center text-3xl font-bold py-5">Artikel</div>
            
            <div  className = "flex flex-wrap w-full justify-between items-center ">
                {listArticle.map((obj, i) => 

                    <div key={i} className = "w-full lg:w-1/3 flex justify-center items-center">
                        <div  onClick={() => router.push('article/'+obj.slug)} style={{cursor: "pointer"}} className="block w-full mx-2 my-3 h-64 bg-white ">

                                <img className="object-cover w-full h-36" src={obj.image} alt="Article image"/>
                            
                            <div className="mb-1 mt-3 text-md md:text-xl font-bold tracking-tight text-gray-900 ">{obj.title}</div>
                            <div className = "text-gray-500">
                            {obj.postDate}
                            </div>
                            {/* <p className="font-normal mx-6 text-gray-700 ">Content</p> */}
                        </div>
                    </div>
                )}
                
            </div>
            
            <div className = " flex justify-center pb-10">
                <div style={{cursor: "pointer"}} onClick={() => router.push('article')} className = "border border-red-600 text-red-600 rounded-md px-6 py-2">Lihat Semua Artikel</div>
            </div>
        </div>
    )
}