import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import qs from 'querystring';

import ShareLayout from "../../../components/share-layout";
import { getShareDetailProject_json } from "../../../api/project/get-detail-project";
import { checkValidResponse } from "../../../helper/check-error-response";
import { DetailProjectBuilder } from "../../../model-builder/project/detail-project-builder";
import DetailProjectPageProps from "../../../types/project/detail-project-page-props";

import AppRedirectDialog from "../../../components/dialog/app-redirect-dialog";
import HTMLReactParser from "html-react-parser";
import AppRedirectContext from "../../../utils/context/app-redirect-context";

function DetailProject({ slug, userIdAccess, dataServer }: DetailProjectPageProps) {
    
    const layoutRef = React.useRef<HTMLDivElement>()
    const { showAppRedirect, showAppRedirectMini,toggleAppRedirectFull, toggleAppRedirectMini } = React.useContext(AppRedirectContext)

    // let detailProject = DetailProjectBuilder.toDetailProjectModel((dataServer == null)? null : dataServer)
    const [ detailProject, setDetailProject ] = React.useState(DetailProjectBuilder.toDetailProjectModel((dataServer == null)? null : dataServer))
    
    const { t } = useTranslation('home');

    const [widthDevice, setWidthDevice] = React.useState<number>()

    const [isRequesting, setIsRequesting] = React.useState<boolean>(false)

    const [filter, setFilter] = React.useState<string>("totalAll")

    const [optionClick, setOptionClick] = React.useState<boolean>(false)

    const [taskStatus, setTaskStatus] = React.useState<string>("all")

    const [taskSorting, setTaskSorting] = React.useState<string>("createdToLow")


    React.useEffect(() => {
        console.log(detailProject)
    }, [detailProject])


    async function filtering(type){
        await setTaskStatus(type)
        let response = await getShareDetailProject_json(slug as string, userIdAccess, type, taskSorting)
    
        setDetailProject(response)
    }

    async function sortFunc(key){
        await setTaskSorting(key)
        await setOptionClick(false)
        let response = await getShareDetailProject_json(slug as string, userIdAccess, taskStatus, key)
    
        setDetailProject(response)
    }

    // if (detailProject == null) {
    //     return (
    //         <Layout
    //             useTopNav={false} 
    //             useBackNav={(userIdAccess != "-") ? false : true}
    //             translate={t}
    //             titleNav={t("Detil Proyek")}
    //             meta={{
    //                 title: "Tidak Ditemukan"
    //             }}>
                    
    //             <div ref={layoutRef} 
    //                 className="container-content m-0 pr-lg-0 pl-lg-0 pr-0 pl-0">
    //                 <div className="col-lg-12 m-0 p-0 pt-2 pb-3">
    //                     Data Tidak Ditemukan
    //                 </div>
    //             </div>
    //         </Layout>
    //     )
    // }

    function redirectApp(){
        toggleAppRedirectFull()
    }

    return (
        <ShareLayout
            useTopNav={userIdAccess === '-'} 
            titleNav={"Detail Project"}
            useMobileRedirectDialog={userIdAccess === '-'}
            deeplink={(userIdAccess === '-' && detailProject.deeplink)}
            meta={{
                title: detailProject.title,
                thumbnail: ((detailProject.projectThumbnail == "-") ? null : detailProject.projectThumbnail)
            }}
        >

            {/* judul project  */}
            <div className = "text-xl pt-6 mx-5">
            {detailProject.title}
            </div>
            {/* creator  */}
            <div className = "mt-3 mx-5 flex">
                <p className = "text-gray-500 text-sm mr-2">Dibuat oleh</p> 
                <p className = "text-sm">{detailProject.projectCreator}</p>
            </div>
            {/* total kolaborator  */}
            <div className = "mt-7 mx-5">
                Kolaborator ({detailProject.colaborator.length})
            </div>
            {/* colaborator scroll  */}
            <div className = "mt-3 mx-5 flex overflow-x-scroll">
            {detailProject.colaborator.map((obj, i) => 
                <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} key = {i} className = "flex-col flex items-center p-2 justify-center">
                    <div className="w-20 ">
                        <img src={obj.avatar} alt={obj.displayName+'-pic'} className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                        <div className = "text-sm truncate text-center">{obj.displayName}</div>
                    </div>
                    
                </div>
            )}
            </div>
            {/* tugas  */}
            <div className = "mt-3 mx-5">
                <div className = "mb-3">
                    Tugas (9)
                </div>
                <div className = "flex overflow-x-scroll">
                    <div onClick = {() => setOptionClick(true)} className = " flex justify-center border text-gray-300 border-gray-300 rounded-full px-4 py-2 mx-1">
                        <img className = "img-cover mx-2" src = "/icons/ic_filter.svg"/>
                                
                        <div className = "">Urutkan</div>
                    </div>
                    {detailProject.filter.map((obj, i) => 
                        {
                            if(obj.type === taskStatus){
                                return (
                                    <div key={i} onClick = {() => filtering(obj.type)} className = "flex-none bg-[#FF0000] text-white rounded-full px-4 py-2 mx-1">
                                        {obj.name} ({detailProject[obj.key]})
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={i} onClick = {() => filtering(obj.type)} className = "flex-none bg-white border text-gray-300 border-gray-300 rounded-full px-4 py-2 mx-1">
                                        {obj.name} ({detailProject[obj.key]})
                                    </div>
                                )
                            }
                        }
                    )}
                </div>
            </div>
            {/* list task  */}
            <div className = "mx-5 mb-28">
            {detailProject.task.map((obj, i) => 
                <div key = {i} className = "flex flex-col  rounded-2xl p-5 shadow-xl mt-6 ">
                    {/* task head  */}
                    <div className = "flex items-center justify-center py-3">
                        <div className = "flex-none">
                            {obj.progress === 'new' && (
                                <div className = "rounded-full px-4 py-1" style = {{background: "#E7F6FF", color: "#43B9FF"}}>{obj.statusStr}</div>
                            )}

                            {obj.progress === 'postponed' && (
                                <div className = "rounded-full px-4 py-1" style = {{background: "#FFE7E7", color: "#FF0000"}}>{obj.statusStr}</div>
                            )}

                            {obj.progress === 'processing' && (
                                <div className = "rounded-full px-4 py-1" style = {{background: "#FFEFD7", color: "#FFA51F"}}>{obj.statusStr}</div>
                            )}

                            {obj.progress === 'finished' && (
                                <div className = "rounded-full px-4 py-1" style = {{background: "#D7FFE0", color: "#00B828"}}>{obj.statusStr}</div>
                            )}
                            
                        </div>
                        <div className = "flex-grow"/>
                        <div className = "flex-none">
                        {obj.reminderDate !== '-' && (
                            <div className = "flex ">
                                <img className = "img-cover mx-2" src = "/icons/ic_bell.svg" style = {{ width : 20}}></img> 
                                {obj.reminderDate.split(" ")[0]+" "+obj.reminderDate.split(" ")[1]+" "+obj.reminderDate.split(" ")[2] }
                            </div>
                        )}
                        </div>
                    </div>
                    {/* task image  */}
                    {obj.picture !== '-' && (
                        <img className="object-cover w-full h-28" src={obj.picture}/>
                    )}
                    {/* task title  */}
                    <div className = "Text-2xl mt-4">{obj.title}</div>
                    {/* task footer  */}
                    <div className = "flex justify-center items-center py-3">
                        <div className = "flex-none text-gray-500 text-xs">
                            Tim
                        </div>
                        <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "flex-grow">
                        {obj.taskAssignment.length > 0 &&
                            <div className = "flex-row flex px-8">
                                {obj.taskAssignment.map((obj, i) => 
                                <div key = {i} style = {{marginLeft:`-16px`}} className="w-8 border-2 border-white rounded-full">
                                    <img src={obj.avatar} alt="KJ" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                </div>
                                )}
                            </div>
                        }
                        </div>
                        <div className = "flex-none">
                            {obj.priority === "3" && (
                                <div style = {{background: "#FFE7E7", color: "#FF0000"}} className = " rounded-full px-4 py-1">Tinggi</div>
                            )}

                            {obj.priority === "2" && (
                                <div style = {{background: "#FFEFD7", color: "#FFA51F"}} className = " rounded-full px-4 py-1">Sedang</div>
                                
                            )}

                            {obj.priority === "1" && (
                                <div style = {{background: "#D7FFE0", color: "#00B828"}} className = " rounded-full px-4 py-1">Rendah</div>
                                
                            )}

                            {obj.priority === "0" && (
                                <div style = {{background: "#D7FFE0", color: "#00B828"}} className = " rounded-full px-4 py-1">??</div>
                                
                            )}
                            
                        </div>
                    </div>
                </div>
            )}

                
            </div>
            {/* filter modal  */}
            {/* <div class="{controllMax ? 'translate-y-0'  : 'translate-y-72'} transition transform ease-in-out duration-300 bottom-0> */}
   
            {/* <div className = {optionClick ? 'translate-y-0'  : 'translate-y-72' + "transition transform ease-in-out duration-300 py-6 bottom-0 flex flex-col bg-white shadow-inner rounded-t-xl w-full"}> */}
            <div className = {`${optionClick ? 'translate-y-0' : 'translate-y-72'} fixed transition transform ease-in-out duration-300 py-6 bottom-0 flex flex-col bg-white shadow-inner rounded-t-xl w-full z-50`}>
            
                <div className = "flex p-4">
                    <div className = "flex-none">Urutkan</div>
                    <div className = "flex-grow"/>
                    <div onClick = {() => setOptionClick(false)} className = "flex-none">
                        <img src = "/icons/ic_close.svg" width="20"></img>
                    </div>
                </div>
                {detailProject.sorting.map((obj, i) => 
                    <div className = " ml-4 flex" onClick = {() => sortFunc(obj.key)} key={i}>
                        <input onChange = {() => sortFunc(obj.key)} style = {{accentColor : '#FF0000'}} className="" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked = {obj.key === taskSorting}/>
                        <label className="px-4">
                        {obj.name}
                        </label>
                    </div>
                )}
            </div>
        </ShareLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { locale, req } = context
    const { slug } = context.query
    const taskStatus = 'all'
    const taskSorting = "createdToLow"
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
    
    let response = await getShareDetailProject_json(slug as string, userIdAccess, taskStatus, taskSorting)
    
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


export default DetailProject;