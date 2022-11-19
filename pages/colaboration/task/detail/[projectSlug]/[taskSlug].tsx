import React, { useEffect } from "react";
import { authGuard } from "../../../../../helper/authentification-modules";import Layout from "../../../../../components/layout";
import SidebarNavigation from "../../../../../components/navigation/sidebar-navigation";
import StickyHeader from "../../../../../components/colaboration/header";
import ProjectListCard from "../../../../../components/colaboration/project/project-list-card";
import Cookies from 'universal-cookie';
import { requestListProject } from "../../../../../api/colaboration/project/request-list-project";
import { checkValidResponse } from "../../../../../helper/check-error-response";
import ServerError from "../../../../../components/colaboration/server-error";
import EmptyData from "../../../../../components/colaboration/empty-data";
import router from "next/router";
import ServerPageProps from "../../../../../types/colaboration/server-page-props";
import { ListTaskModel } from "../../../../../models/colaboration/task/list-task-model";
import { requestListtask } from "../../../../../api/colaboration/task/request-list-task";
import Table from "../../../../../components/table";
import GroupImageComponent from "../../../../../components/colaboration/group-image-component";
import { requestDetailProject } from "../../../../../api/colaboration/project/request-detail-project";
import { DetailProjectBuilder } from "../../../../../model-builder/colaboration/project/detail-project-builder";
import { DetailProjectModel } from "../../../../../models/colaboration/project/detail-project-model";
import ProjectDetailCard from "../../../../../components/colaboration/project/project-detail-card";
import { route } from "next/dist/server/router";
import { BadgeOutlineComponent } from "../../../../../components/badge/badge-outline-component";
import { BadgeComponent } from "../../../../../components/badge/badge-component";
import { requestDetailTask } from "../../../../../api/colaboration/task/request-detail-task";
import { DetailTaskBuilder } from "../../../../../model-builder/colaboration/task/detail-task-builder";


function DetailTask({ slug,dataServer }: ServerPageProps) {
    
    let serverData = DetailTaskBuilder.jsonParse((dataServer == null)? null : dataServer)
    if(serverData == null){
        return (
            <ServerError/>
        )
    }

    const [loading, setLoading] = React.useState<boolean>(false)
    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                        <StickyHeader 
                            title = {"Detail Proyek"}
                            breadcrumb = {[{title : "Proyek", path : "/colaboration/project"},{title : serverData.title, path : "/"}]}
                            onBack = {(e) => router.push("/colaboration/task")}
                        >
                            {/* button edit tugas */}
                            <div onClick = {() => {}} className = "flex items-center justify-center bg-[#FF0000] rounded-md lg:rounded-full px-1 text-sm ">
                                <svg className = "fill-white" xmlns="http://www.w3.org/2000/svg" width="41" height="40">
                                    <g>
                                        <path d="M20.832 32c-6.617 0-12-5.383-12-12s5.383-12 12-12c6.618 0 12 5.383 12 12s-5.382 12-12 12Zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5Z"/><path d="M26.082 20.75h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z"/>
                                        <path d="M20.832 26a.75.75 0 0 1-.75-.75v-10.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-.75.75Z"/>
                                    </g>
                                </svg>
                                <div className = "hidden lg:block whitespace-nowrap text-white mr-2">
                                    Edit Tugas
                                </div>
                            </div>
                        </StickyHeader>
                        {/* content */}
                        <div className=" mt-2 px-5">
                            <div className="flex flex-col md:flex-row  md:space-x-3">
                                <div className="flex flex-col w-full md:w-1/2">
                                    <div className = "text-[#FF0000]">
                                        Tim
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className = "rounded-full p-3 bg-[#FF0000]">
                                            <svg className = "w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="#fff" d="M9.007.097a.996.996 0 0 0-.997.998l-.007 6.908H1.087a.996.996 0 1 0 0 1.994h6.916v6.916a.996.996 0 1 0 1.994 0V9.997h6.916a.996.996 0 1 0 0-1.994H9.997V1.087c0-.537-.453-.99-.99-.99Z"/></svg>
                                        </div>
                                        <div className = "w-48">
                                            <GroupImageComponent
                                                data = {serverData.taskAssignment}
                                                limit = {4}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className = "mt-6 text-xl ">
                                        {serverData.title}
                                    </div>
                                    <div className = "flex space-x-1 text-xs">
                                        <div className = "text-[#828282]">Proyek</div>
                                        <div className = "text-[#FF0000]" >
                                            {serverData.projectName}
                                        </div>
                                    </div>
                                        <div className = "text-sm mt-4">{serverData.description}</div>
                                </div>
                                <div className="flex w-full md:w-1/2">
                                    <div className = "flex w-1/2">
                                        1
                                    </div>
                                    <div className = "flex w-1/2">
                                        2
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </SidebarNavigation>
            
        </Layout>
    )
}

export const getServerSideProps = authGuard(async(context) => {
    const { projectSlug, taskSlug } = context.query
    const slug = taskSlug
    const cookies = await context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
    const token = await cookies.get("token")
    const projectId = projectSlug
    const taskId = taskSlug
    const response = await requestDetailTask(token, projectId,taskId)
    var dataServer = await JSON.stringify(response)
    
    if (checkValidResponse(dataServer) == true) {
        return {
            props: {
                dataServer,
                slug
            }
        }    
    } else {
        return {
            props: {
                
            }
        }    
    }
})


export default DetailTask;