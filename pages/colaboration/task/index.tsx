import React, { useEffect } from "react";
import { authGuard } from "../../../helper/authentification-modules";import Layout from "../../../components/layout";
import SidebarNavigation from "../../../components/navigation/sidebar-navigation";
import StickyHeader from "../../../components/colaboration/header";
import ProjectListCard from "../../../components/colaboration/project/project-list-card";
import Cookies from 'universal-cookie';
import { requestListProject } from "../../../api/colaboration/project/request-list-project";
import { checkValidResponse } from "../../../helper/check-error-response";
import { ListProjectModel } from "../../../models/colaboration/project/list-project-model";
import ServerError from "../../../components/colaboration/server-error";
import EmptyData from "../../../components/colaboration/empty-data";
import router from "next/router";
import ServerPageProps from "../../../types/colaboration/server-page-props";
import { ListTaskBuilder } from "../../../model-builder/colaboration/task/list-task-builder";
import { ListTaskModel } from "../../../models/colaboration/task/list-task-model";
import { requestListMyTask } from "../../../api/colaboration/task/request-list-my-task";
import Table from "../../../components/table";
import { BadgeOutlineComponent } from "../../../components/badge/badge-outline-component";
import { BadgeComponent } from "../../../components/badge/badge-component";
import GroupImageComponent from "../../../components/colaboration/group-image-component";


function ListTask({ dataServer }: ServerPageProps) {
    
    let serverData = ListTaskBuilder.jsonParse((dataServer == null)? null : dataServer)
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
                <div className = "flex-row flex">
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
                    <BadgeOutlineComponent
                        color = {'#FF0000'}
                        text = {"Ini Data"}
                    />
                </div>
            )
        },{
            field: 'priority',
            name: 'Priority',
            render: (data?: number) => (
                // wrapping with flex for sizing
                <div className = "inline-block">
                    <BadgeComponent
                        textColor="#43B9FF"
                        bgColor="#E7F6FF"
                        text="Ini Data"
                    />
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
    const [listTask, setListTask] = React.useState<ListTaskModel[]>(serverData)
    
    async function searchingFunc(e){
        const token = '-'
        const projectId = '90fea43c-9b4d-4bfd-9333-cc4c6068bb65'
        const taskStatus = 'init'
        const keyword = ""
        const taskSorting = "priorityToHigh"
        const response = await requestListMyTask(token,taskStatus,keyword,taskSorting)
        await setListTask(response)
    
    }

    function addData() {
        router.push("task/add")
    }

    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                        <StickyHeader 
                            title = {"All Task"}
                            onSearching = {(e) => searchingFunc(e)}
                            onSorting = {(e) => console.log(e)}
                        >
                            {/* button add project */}
                            <div onClick = {() => addData()} className = "flex items-center justify-center bg-[#FF0000] rounded-lg px-1 lg:px-6 ">
                                <svg className = "fill-white" xmlns="http://www.w3.org/2000/svg" width="41" height="40">
                                    <g>
                                        <path d="M20.832 32c-6.617 0-12-5.383-12-12s5.383-12 12-12c6.618 0 12 5.383 12 12s-5.382 12-12 12Zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5Z"/><path d="M26.082 20.75h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z"/>
                                        <path d="M20.832 26a.75.75 0 0 1-.75-.75v-10.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-.75.75Z"/>
                                    </g>
                                </svg>
                                <div className = "hidden lg:block whitespace-nowrap text-white">
                                    Tambah Proyek
                                </div>
                            </div>
                        </StickyHeader>
                        {/* content */}
                        <div className=" mt-6 px-3 ">
                            <Table
                                config = {tableHeadConfig}
                                data = {listTask}
                            />
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
    const taskStatus = 'all'
    const keyword = ""
    const taskSorting = "priorityToHigh"
    const response = await requestListMyTask(token,taskStatus,keyword,taskSorting)
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


export default ListTask;