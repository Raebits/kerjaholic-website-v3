import React, { useEffect } from "react";
import { authGuard } from "../../../../helper/authentification-modules";
import Layout from "../../../../components/layout";
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
import { requestDetailTask } from "../../../../api/colaboration/task/request-detail-task";
import { DetailTaskBuilder } from "../../../../model-builder/colaboration/task/detail-task-builder";
import { InputSelectComponent } from "../../../../components/input/input-select-component";
import { InputDefaultComponent } from "../../../../components/input/input-default-component";
import { AddTaskModel } from "../../../../models/colaboration/task/add-task-model";
import { checkDataModelEmpty } from "../../../../helper/common/check-data-model-empty";
import { requestAddTask } from "../../../../api/colaboration/task/request-add-task";
import { responseErrorHandler } from "../../../../helper/common/response-request-handler";
import { ListReminderType } from "../../../../models/colaboration/list-reminder-type";
import { getListReminderType } from "../../../../api/colaboration/get-list-reminder-type";
import { InputToggleComponent } from "../../../../components/input/input-toggle-component";
import { InputDateComponent } from "../../../../components/input/input-date-component";
import { InputTimeComponent } from "../../../../components/input/input-time-component";
import { validate } from "../../../../helper/form-validation";
import Loading from "../../../../components/loading";


function AddTask({ slug, dataServer }: ServerPageProps) {
    let serverData = JSON.parse((dataServer == null)? null : dataServer)
    const [ dataTask, setDataTask ] = React.useState<AddTaskModel>(new AddTaskModel())
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [projectId, setProjectId] = React.useState<string>("")
    const [reminderDate, setReminderDate] = React.useState<string>("")
    const [reminderTime, setReminderTIme] = React.useState<string>("")

    if(serverData == null){
        return (
            <ServerError/>
        )
    }

    let projectData = serverData.projectData
    let reminderTypeList = serverData.reminderType

    React.useEffect(() => {
        setProjectId(slug)
    },[])

    React.useEffect(() => {
        setDataTask({...dataTask, projectId: projectData.projectId})
    },[projectId])
    
    React.useEffect(() => {
        setDataTask({...dataTask, reminder: reminderDate+" "+reminderTime})
    },[dataTask.reminderDate, dataTask.reminderTime])

    const dbProgressList = [
        {
            key : 'new',
            lable : 'Baru'
        },
        {
            key : 'finished',
            lable : 'Selesai'
        },
        {
            key : 'postponed',
            lable : 'Dibatalkan'
        },
        {
            key : 'processing',
            lable : 'Dalam Proses'
        }
    ]

    const dbPriorityList = [
        {
            key : '1',
            lable : 'Rendah'
        },
        {
            key : '2',
            lable : 'Sedang'
        },
        {
            key : '3',
            lable : 'Tinggi'
        }
    ]

    

    const checkCompleteData = async (callback: () => void) => {
        if (
            !validate(
                dataTask, // data will validate
                ["projectId",
                "title",
                "taskId",
                "reminderType",
                "reminder",
                "progress",
                "priority",
                "isAlarm",
                "description",], // field will validate
                true // show logger
            ) // true or false
        ){
            setShowValidInput(true)
            return;
        }
        callback();
        
    }

    
    async function saving() {

        setLoading(true)

        const request = await requestAddTask('-',dataTask)

        if (request.status == 'success') {

            router.push("/colaboration/project/detail/"+slug)

        } else {
            setLoading(false)
            responseErrorHandler(requestAddTask, (message) => {
                alert(message)
            })
        }
    }

    

    return (
        <>
        <Loading showed={loading} text={"Loading ..."} />
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                        <StickyHeader 
                            title = {"Tambah Tugas"}
                            breadcrumb = {[{title : "Proyek", path : "/colaboration/project"},{title : projectData.title, path : "/colaboration/project/detail/"+slug},{title : "Add Task", path : ""}]}
                            onBack = {true}
                        >
                            {/* button edit tugas */}
                            <div onClick = {() => checkCompleteData(() => !loading && saving())} className = "flex items-center justify-center bg-[#FF0000] rounded-md lg:rounded-full px-1 text-sm ">
                                <svg className = "fill-white" xmlns="http://www.w3.org/2000/svg" width="41" height="40">
                                    <g>
                                        <path d="M20.832 32c-6.617 0-12-5.383-12-12s5.383-12 12-12c6.618 0 12 5.383 12 12s-5.382 12-12 12Zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5Z"/><path d="M26.082 20.75h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z"/>
                                        <path d="M20.832 26a.75.75 0 0 1-.75-.75v-10.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-.75.75Z"/>
                                    </g>
                                </svg>
                                <div className = "hidden lg:block whitespace-nowrap text-white mr-2">
                                    Tambah Tugas
                                </div>
                            </div>
                        </StickyHeader>
                        {/* content */}
                        <div className=" mt-2 px-5">
                            <div className="flex flex-col md:flex-row  space-y-4 md:space-x-3">
                                <div className="flex flex-col w-full md:w-1/2">
                                    {/* left side */}
                                    <div className = "text-[#FF0000]">
                                        Tim
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className = "rounded-full p-3 bg-[#FF0000]">
                                            <svg className = "w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="#fff" d="M9.007.097a.996.996 0 0 0-.997.998l-.007 6.908H1.087a.996.996 0 1 0 0 1.994h6.916v6.916a.996.996 0 1 0 1.994 0V9.997h6.916a.996.996 0 1 0 0-1.994H9.997V1.087c0-.537-.453-.99-.99-.99Z"/></svg>
                                        </div>
                                        {/* <div className = "w-48">
                                            <GroupImageComponent
                                                data = {serverData.taskAssignment}
                                                limit = {4}
                                            />
                                        </div> */}
                                    </div>
                                    
                                    <div className = "mt-6 text-xl dark:text-white ">
                                        <InputDefaultComponent 
                                            title="Judul Tugas"
                                            placeholder="Judul Tugas"
                                            onChange={(val) => setDataTask({...dataTask, title: val})}
                                            value={dataTask.title}
                                            showValidInput={showValidInput}
                                            showTitle = {true}
                                        />
                                    </div>
                                    <div className = "w-full mt-4">
                                        <InputSelectComponent
                                            title = "Proyek" // title inputan
                                            showTitle = {true} // show title ??
                                            showValidInput={showValidInput} // validation message
                                            list={[]} // list city fetching when select clicked
                                            keyValue = "" // mau ambil key apa dinamis tergantung list untuk nilai value nya
                                            keyLabel = "" // mau ambil key apa dinamis tergantung list untuk nilai label nya
                                            value = {true} // for set value from database
                                            label = {projectData.title} // for set label from database
                                            fetchData = {(val) => val&& console.log(val)}
                                            loading = {false} // loading when fetching
                                            onSelect={(val) => {}}// when search then re fetching data
                                            disabled
                                            
                                        />
                                    </div>
                                    <div className = "text-sm mt-4 dark:text-gray-300">
                                        <InputDefaultComponent 
                                            title="Deskripsi"
                                            placeholder="Deskripsi"
                                            type="textarea"
                                            onChange={(val) => setDataTask({...dataTask, description: val})}
                                            value={dataTask.description}
                                            showValidInput={showValidInput}
                                            showTitle = {true}
                                        />    
                                    </div>
                                </div>

                                {/* right side */}
                                <div className = "flex flex-col w-full md:w-1/2">
                                    <div className="flex space-x-2">
                                        <div className = "w-full">
                                            <InputSelectComponent
                                                title = "Status" // title inputan
                                                showTitle = {true} // show title ??
                                                showValidInput={showValidInput} // validation message
                                                list={dbProgressList} // list city fetching when select clicked
                                                keyValue = "key" // mau ambil key apa dinamis tergantung list untuk nilai value nya
                                                keyLabel = "lable" // mau ambil key apa dinamis tergantung list untuk nilai label nya
                                                value = {dataTask.progress} // for set value from database
                                                label = {dbProgressList.filter(obj => obj["key"] == dataTask.progress)[0]?.lable} // for set label from database
                                                fetchData = {(val) => val&& console.log(val)}
                                                loading = {false} // loading when fetching
                                                onSelect={(val) => {
                                                    setDataTask({...dataTask, progress: val.key})
                                                }}// when search then re fetching data
                                                
                                            />
                                        </div>
                                        <div className = "w-full">
                                            <InputSelectComponent
                                                title = "Priority" // title inputan
                                                showTitle = {true} // show title ??
                                                showValidInput={showValidInput} // validation message
                                                list={dbPriorityList} // list city fetching when select clicked
                                                keyValue = "key" // mau ambil key apa dinamis tergantung list untuk nilai value nya
                                                keyLabel = "lable" // mau ambil key apa dinamis tergantung list untuk nilai label nya
                                                value = {dataTask.priority} // for set value from database
                                                label = {dbPriorityList.filter(obj => obj["key"] == dataTask.priority)[0]?.lable} // for set label from database
                                                fetchData = {(val) => val&& console.log(val)}
                                                loading = {false} // loading when fetching
                                                onSelect={(val) => {
                                                    setDataTask({...dataTask, priority: val.key})
                                                }}// when search then re fetching data
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-4 space-x-2 mb-2">
                                        <div className = "flex-none text-[#FF0000]">
                                            Pengingat
                                        </div>
                                        <div className = "w-full flex-grow text-[#FF0000]">
                                        <InputToggleComponent 
                                            onChange={(e) => setDataTask({...dataTask, isReminder: (e ? 1 : 0)})}
                                            showValidInput = {showValidInput}
                                            initValue={dataTask.isReminder == 1 ? true : false}
                                        />
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 mt-2 mb-2 items-center text-sm dark:text-gray-300">
                                        <div className = "w-full">
                                            <InputDateComponent
                                                onChange={(e) => setDataTask({...dataTask, reminderDate: e})}
                                                title = {"Tanggal"}
                                                hideLabel = {false}
                                                showValidInput = {showValidInput}

                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-x-2 mt-4 mb-2 items-center text-sm dark:text-gray-300 ">
                                        <div className = "w-full">
                                            <InputTimeComponent
                                                title="Time"
                                                onSelect={(e) => setDataTask({...dataTask, reminderTime: e})}
                                                showTitle = {true}
                                                showValidInput = {showValidInput}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 mt-4 mb-2 items-center text-sm dark:text-gray-300">
                                        <div className = "w-full">
                                            <InputSelectComponent
                                                title = "Interval" // title inputan
                                                showTitle = {true} // show title ??
                                                showValidInput={showValidInput} // validation message
                                                list={reminderTypeList} // list city fetching when select clicked
                                                keyValue = "id" // mau ambil key apa dinamis tergantung list untuk nilai value nya
                                                keyLabel = "name" // mau ambil key apa dinamis tergantung list untuk nilai label nya
                                                value = {dataTask.reminderType} // for set value from database
                                                label = {reminderTypeList.filter(obj => obj["id"] == dataTask.reminderType)[0]?.name} // for set label from database
                                                fetchData = {(val) => val&& console.log(val)} // fetch data true ? if true fetch data
                                                loading = {false} // loading when fetching
                                                onSelect={(val) => {
                                                    setDataTask({...dataTask, reminderType: val.id}) // set state
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <InputToggleComponent 
                                        onChange={(e) => setDataTask({...dataTask, isAlarm: (e ? 1 : 0)})}
                                        title = {"alarm"}
                                        showValidInput = {showValidInput}
                                        initValue={dataTask.isAlarm == 1 ? true : false}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </SidebarNavigation>
            
        </Layout>
        </>
    )
}

export const getServerSideProps = authGuard(async(context) => {
    const { projectSlug } = context.query
    const slug = projectSlug
    const cookies = await context.req ? new Cookies(context.req.headers.cookie) : new Cookies();
    const token = await cookies.get("token")
    const projectId = slug
    const taskStatus = 'all'
    const colaboratorLimit  = 9999
    const projectData = await requestDetailProject(token, projectId,taskStatus,colaboratorLimit)
    var projectDataServer = await JSON.stringify(projectData)
    const reminderType = await getListReminderType(token)
    var reminderTypeServer = await JSON.stringify(reminderType)
    var dataServer = JSON.stringify({projectData : projectData, reminderType: reminderType})
    console.log(dataServer)
    if (checkValidResponse(projectDataServer) == true && checkValidResponse(reminderTypeServer) ) {
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


export default AddTask;