import React, { useEffect } from "react";
import { authGuard } from "../../../helper/authentification-modules";import Layout from "../../../components/layout";
import SidebarNavigation from "../../../components/navigation/sidebar-navigation";
import StickyHeader from "../../../components/colaboration/header";
import ProjectListCard from "../../../components/colaboration/project/project-list-card";
import Cookies from 'universal-cookie';
import { requestListProject } from "../../../api/colaboration/project/request-list-project";
import { checkValidResponse } from "../../../helper/check-error-response";
import { ListProjectModel } from "../../../models/colaboration/project/ListProjectModel";
import { ListProjectBuilder } from "../../../model-builder/colaboration/project/list-project-builder";
import ServerError from "../../../components/colaboration/server-error";
import EmptyData from "../../../components/colaboration/empty-data";
import router from "next/router";
import ServerPageProps from "../../../types/colaboration/server-page-props";


function ListProject({ dataServer }: ServerPageProps) {
    
    let serverData = ListProjectBuilder.jsonParse((dataServer == null)? null : dataServer)
    if(serverData == null){
        return (
            <ServerError/>
        )
    }
    
    const [loading, setLoading] = React.useState<boolean>(false)
    const [listProject, setListProject] = React.useState<ListProjectModel[]>(serverData)
    

    async function searchingFunc(e){
        const token = '-'
        const lastPage = 0
        const take = 10
        const keyword = e
        const sorting = "asc"
        const response = await requestListProject(token, lastPage,take,keyword,sorting)
        await setListProject(response)
    
    }

    function addData() {
        router.push("project/add")
    }

    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                        <StickyHeader 
                            title = {"Proyek"}
                            useSearching = {true}
                            useSorting = {true}
                            onSearching = {(e) => searchingFunc(e)}
                            onSorting = {(e) => console.log(e)}
                            mainPage = {true}
                            onBack = {(e) => {}}
                        >
                            {/* button add project */}
                            <div onClick = {() => addData()} className = "flex items-center justify-center bg-[#FF0000] rounded-lg px-1 lg:px-6 ">
                                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_8807_636)">
                                    <path d="M20.8325 32C14.2155 32 8.83252 26.6171 8.83252 20C8.83252 13.3829 14.2155 8 20.8325 8C27.4496 8 32.8325 13.3829 32.8325 20C32.8325 26.6171 27.4496 32 20.8325 32ZM20.8325 9.5C15.0425 9.5 10.3325 14.21 10.3325 20C10.3325 25.79 15.0425 30.5 20.8325 30.5C26.6225 30.5 31.3325 25.79 31.3325 20C31.3325 14.21 26.6225 9.5 20.8325 9.5Z" fill="white"/>
                                    <path d="M26.0825 20.75H15.5825C15.1685 20.75 14.8325 20.414 14.8325 20C14.8325 19.586 15.1685 19.25 15.5825 19.25H26.0825C26.4965 19.25 26.8325 19.586 26.8325 20C26.8325 20.414 26.4965 20.75 26.0825 20.75Z" fill="white"/>
                                    <path d="M20.8325 26C20.4185 26 20.0825 25.664 20.0825 25.25V14.75C20.0825 14.336 20.4185 14 20.8325 14C21.2465 14 21.5825 14.336 21.5825 14.75V25.25C21.5825 25.664 21.2465 26 20.8325 26Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_8807_636">
                                    <rect width="24" height="24" fill="white" transform="translate(8.83252 8)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                <div className = "hidden lg:block whitespace-nowrap text-white">
                                    Tambah Proyek
                                </div>
                            </div>
                        </StickyHeader>
                        {/* content */}
                        <div className=" mt-6 px-3">
                            {/* card wrapper */}
                            <div className = "flex flex-wrap w-full">
                                {listProject.length > 0 ? (
                                    listProject.map((obj, key) => {
                                        return(
                                            <ProjectListCard
                                                key = {key}
                                                listId = {key}
                                                title = {obj.projectTitle}
                                                totalColaborator = {obj.colaboratorTotal}
                                                totalTask = {obj.taskTotal}
                                                creator = {obj.creatorName}
                                                createdDate = {"3 Maret 1990"}
                                                pic = {obj.projectLogo}
                                                messageUnread = {obj.messageUnreadTotal}
                                                onClick = {(slug) => console.log(slug)}
                                                slug = "hello-world"
                                                done={obj.taskDone}
                                                projectCreated = {obj.projectCreated}
                                            />
                                        )
                                    })
                                ) : (
                                    <EmptyData/>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </SidebarNavigation>
            
        </Layout>
    )
}

export const getServerSideProps = authGuard(async(context) => {
    // const { slug } = context.query
    
    const cookies = await context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
    const token = await cookies.get("token")
    const lastPage = 0
    const take = 10
    const keyword = ""
    const sorting = "asc"
    const response = await requestListProject(token, lastPage,take,keyword,sorting)
    var dataServer = await JSON.stringify(response)

    if (checkValidResponse(dataServer) == true) {
        return {
            props: {
                dataServer,
            }
        }    
    } else {
        return {
            props: {
                
            }
        }    
    }
})


export default ListProject;