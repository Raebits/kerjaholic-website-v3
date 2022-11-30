import React, { useEffect } from "react";
import { authGuard } from "../../../../helper/authentification-modules";import Layout from "../../../../components/layout";
import SidebarNavigation from "../../../../components/navigation/sidebar-navigation";
import StickyHeader from "../../../../components/colaboration/header";
import ProjectListCard from "../../../../components/colaboration/project/project-list-card";
import Cookies from 'universal-cookie';
import { requestListProject } from "../../../../api/colaboration/project/request-list-project";
import { checkValidResponse } from "../../../../helper/check-error-response";
import ServerError from "../../../../components/colaboration/server-error";
import EmptyData from "../../../../components/colaboration/empty-data";
import router from "next/router";
import ServerPageProps from "../../../../types/colaboration/server-page-props";
import { ListTaskModel } from "../../../../models/colaboration/task/list-task-model";
import { requestListtask } from "../../../../api/colaboration/task/request-list-task";
import Table from "../../../../components/table";
import GroupImageComponent from "../../../../components/colaboration/group-image-component";
import { requestDetailProject } from "../../../../api/colaboration/project/request-detail-project";
import { DetailProjectBuilder } from "../../../../model-builder/colaboration/project/detail-project-builder";
import { DetailProjectModel } from "../../../../models/colaboration/project/detail-project-model";
import ProjectDetailCard from "../../../../components/colaboration/project/project-detail-card";
import { route } from "next/dist/server/router";
import { BadgeOutlineComponent } from "../../../../components/badge/badge-outline-component";
import { BadgeComponent } from "../../../../components/badge/badge-component";


function ListTask({ slug,dataServer }: ServerPageProps) {
    
    let serverData = DetailProjectBuilder.jsonParse((dataServer == null)? null : dataServer)
    if(serverData == null){
        return (
            <ServerError/>
        )
    }
    
    const tableHeadConfig:any  = [
        {
            field: 'title',
            name: 'Tugas',
        },{
            field: 'taskAssignment',
            name: 'Tim',
            render: (data: any) => (
                <div className = "w-24">
                    <GroupImageComponent
                        data = {data}
                        limit = {4}
                    />
                </div>
            )
        },{
            field: 'status',
            name: 'Status',
            sorting: true,
            render: (data?: string) => (
                // wrapping with flex for sizing
                <div className = "inline-block">
                    {(data === "finished") && (
                        <BadgeComponent
                            textColor="#00B828"
                            bgColor="#D7FFE0"
                            text={"Selesai"}
                        />
                    )}

                    {(data === "new") && (
                        <BadgeComponent
                            textColor="#43B9FF"
                            bgColor="#E7F6FF"
                            text={"Baru"}
                        />
                    )}

                    {(data === "postponed") && (
                        <BadgeComponent
                            textColor="#FF0000"
                            bgColor="#FFE7E7"
                            text={"Ditunda"}
                        />
                    )}

                    {(data === "processing") && (
                        <BadgeComponent
                            textColor="#FFA51F"
                            bgColor="#FFEFD7"
                            text={"Dalam Proses"}
                        />
                    )}
                    
                </div>
            )
        },{
            field: 'priority',
            name: 'Priority',
            render: (data?: string) => (
                // wrapping with flex for sizing
                <div className = "inline-block">
                    {(data == "1") && (
                        <BadgeOutlineComponent
                            color = {'#00B828'}
                            text = {"Rendah"}
                        />
                    )}

                    {(data == "2") && (
                        <BadgeOutlineComponent
                            color = {'#FFA51F'}
                            text = {"Sedang"}
                        />
                    )}

                    {(data == "3") && (
                        <BadgeOutlineComponent
                            color = {'#FF0000'}
                            text = {"Tinggi"}
                        />
                    )}
                    
                </div>
            )
        },{
            field: 'reminder',
            name: 'Alarm',
            // render: (data?: string) => (
            //     <div className =  {`flex items-center justify-center text-black`}>{data}</div>
            // )
        }
    ];
    const [loading, setLoading] = React.useState<boolean>(false)
    const [listTask, setListTask] = React.useState<ListTaskModel[]>([])

    React.useEffect(() => {
        getTaskList("")
    },[])

    async function getTaskList(e){
        const token = '-' // client side request token set on request 
        const projectId = serverData.projectId
        const taskStatus = 'init'
        const keyword = e
        const taskSorting = "priorityToHigh"
        const response = await requestListtask(token, projectId,taskStatus,keyword,taskSorting)
        await setListTask(response)
    
    }


    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                        <StickyHeader 
                            title = {"Detail Proyek"}
                            breadcrumb = {[{title : "Proyek", path : "/colaboration/project"},{title : serverData.title, path : "/"}]}
                            onSearching = {(e) => getTaskList(e)}
                            onSorting = {(e) => console.log(e)}
                            onBack = {true}
                        >
                            {/* button join project */}
                            <div onClick = {() => {}} className = "flex items-center justify-center bg-[#FF0000] rounded-md lg:rounded-full px-1 text-sm ">
                                <svg className = "fill-white" xmlns="http://www.w3.org/2000/svg" width="41" height="40">
                                    <g>
                                        <path d="M20.832 32c-6.617 0-12-5.383-12-12s5.383-12 12-12c6.618 0 12 5.383 12 12s-5.382 12-12 12Zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5Z"/><path d="M26.082 20.75h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z"/>
                                        <path d="M20.832 26a.75.75 0 0 1-.75-.75v-10.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-.75.75Z"/>
                                    </g>
                                </svg>
                                <div className = "hidden lg:block whitespace-nowrap text-white mr-2">
                                    Join Proyek
                                </div>
                            </div>
                        </StickyHeader>
                        {/* content */}
                        <div className=" mt-2 px-3">
                                
                            <div className="flex flex-wrap my-5 ">
                                {/* <div className = "w-1/3">
                                    <ProjectDetailCard
                                        title = {"Kolaborator"}
                                        onClick = {(e) => console.log(e)}
                                    >
                                        <GroupImageComponent
                                            data = {serverData.colaborator}
                                            limit = {4}
                                            size = {36}
                                        />
                                    </ProjectDetailCard>
                                </div> */}
                                <div className = "w-full lg:w-1/3">
                                    <div className = "m-1">
                                    <ProjectDetailCard
                                        title = {"Kolaborator"}
                                        onClick = {(e) => console.log(e)}
                                    >
                                        <div className = "w-1/3 lg:w-2/3">
                                            <GroupImageComponent
                                                data = {serverData.colaborator}
                                                limit = {4}
                                            />
                                        </div>
                                    </ProjectDetailCard>
                                    </div>
                                </div>
                                <div className = "w-full md:w-1/2 lg:w-1/3 ">
                                    <div className = "m-1">
                                        <ProjectDetailCard
                                            title = {"Jadwal Meeting"}
                                            onClick = {(e) => console.log(e)}
                                        >
                                            <div className = "flex space-x-1 items-center md:space-x-3 flex-row ">
                                                <div className = "w-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" d="M17.595 10.932a2.902 2.902 0 1 0 0-5.803M18.929 14.085c.478.032.954.1 1.422.206.651.127 1.434.394 1.713.978.177.374.177.81 0 1.184-.278.584-1.062.85-1.713.984M6.29 10.932a2.902 2.902 0 1 1 0-5.803M4.956 14.085c-.479.032-.955.1-1.423.206-.65.127-1.434.394-1.711.978-.18.374-.18.81 0 1.184.276.584 1.06.85 1.711.984"/><path stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" d="M11.938 14.71c3.246 0 6.02.49 6.02 2.457 0 1.965-2.755 2.475-6.02 2.475-3.248 0-6.021-.491-6.021-2.458 0-1.966 2.755-2.475 6.02-2.475ZM11.938 11.905a3.845 3.845 0 0 1-3.858-3.86 3.845 3.845 0 0 1 3.858-3.858 3.845 3.845 0 0 1 3.858 3.859 3.845 3.845 0 0 1-3.858 3.859Z" clipRule="evenodd"/></svg>
                                                </div>
                                                <div className = "text-[#828282] text-xs">3 Jadwal</div>
                                            </div>
                                        </ProjectDetailCard>
                                    </div>
                                </div>
                                <div className = "w-full md:w-1/2 lg:w-1/3">
                                    <div className = "m-1">
                                        <ProjectDetailCard
                                            title = {"Jadwal Meeting"}
                                            onClick = {(e) => console.log(e)}
                                        >
                                            <div className = "flex space-x-1 items-center md:space-x-3 flex-row ">
                                                <div className = "w-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" d="M17.595 10.932a2.902 2.902 0 1 0 0-5.803M18.929 14.085c.478.032.954.1 1.422.206.651.127 1.434.394 1.713.978.177.374.177.81 0 1.184-.278.584-1.062.85-1.713.984M6.29 10.932a2.902 2.902 0 1 1 0-5.803M4.956 14.085c-.479.032-.955.1-1.423.206-.65.127-1.434.394-1.711.978-.18.374-.18.81 0 1.184.276.584 1.06.85 1.711.984"/><path stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" d="M11.938 14.71c3.246 0 6.02.49 6.02 2.457 0 1.965-2.755 2.475-6.02 2.475-3.248 0-6.021-.491-6.021-2.458 0-1.966 2.755-2.475 6.02-2.475ZM11.938 11.905a3.845 3.845 0 0 1-3.858-3.86 3.845 3.845 0 0 1 3.858-3.858 3.845 3.845 0 0 1 3.858 3.859 3.845 3.845 0 0 1-3.858 3.859Z" clipRule="evenodd"/></svg>
                                                </div>
                                                <div className = "text-[#828282] text-xs">3 Catatan</div>
                                            </div>
                                        </ProjectDetailCard>
                                    </div>
                                </div>
                            </div>
                            <div className = "flex mb-3">
                                <div className="flex w-1/2 items-center dark:text-white justify-start">
                                    Tugas (10)
                                </div>
                                <div className="flex w-1/2 items-center justify-end">
                                    <div onClick = {() => router.push("/colaboration/task/add/"+serverData.projectId)} className = "flex items-center justify-center bg-[#FF0000] rounded-full px-1 text-sm ">
                                        <svg className = "fill-white" xmlns="http://www.w3.org/2000/svg" width="41" height="40">
                                            <g>
                                                <path d="M20.832 32c-6.617 0-12-5.383-12-12s5.383-12 12-12c6.618 0 12 5.383 12 12s-5.382 12-12 12Zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5Z"/><path d="M26.082 20.75h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z"/>
                                                <path d="M20.832 26a.75.75 0 0 1-.75-.75v-10.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-.75.75Z"/>
                                            </g>
                                        </svg>
                                        <div className = "flex whitespace-nowrap text-white mr-2">
                                            Tambah Tugas
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Table
                                config = {tableHeadConfig}
                                data = {listTask}
                                onClick = {(data) => router.push("/colaboration/task/detail/"+serverData.projectId+"/"+data.id)}
                                stickyColIndex = {1}
                            />
                        </div>
                        
                    </div>
                </SidebarNavigation>
            
        </Layout>
    )
}

export const getServerSideProps = authGuard(async(context) => {
    const { slug } = context.query
    const cookies = await context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
    const token = await cookies.get("token")
    const projectId = slug
    const taskStatus = 'all'
    const colaboratorLimit  = 9999
    const response = await requestDetailProject(token, projectId,taskStatus,colaboratorLimit)
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


export default ListTask;