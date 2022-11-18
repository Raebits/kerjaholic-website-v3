import React, { useEffect } from "react";
import { authGuard } from "../../../helper/authentification-modules";import Layout from "../../../components/layout";
import SidebarNavigation from "../../../components/navigation/sidebar-navigation";
import StickyHeader from "../../../components/colaboration/header";
import ProjectListCard from "../../../components/colaboration/project/project-list-card";
import Cookies from 'universal-cookie';
import { requestListProject } from "../../../api/colaboration/project/request-list-project";
import { checkValidResponse } from "../../../helper/check-error-response";
import { ListProjectModel } from "../../../models/colaboration/project/list-project-model";
import { ListProjectBuilder } from "../../../model-builder/colaboration/project/list-project-builder";
import ServerError from "../../../components/colaboration/server-error";
import EmptyData from "../../../components/colaboration/empty-data";
import router from "next/router";
import ServerPageProps from "../../../types/colaboration/server-page-props";
import ModalWrapper from "../../../components/modal-wrapper";
import { InputDefaultComponent } from "../../../components/input/input-default-component";
import { InputColorComponent } from "../../../components/input/input-color-component";
import { responseErrorHandler } from "../../../helper/common/response-request-handler";
import { requestAddProject } from "../../../api/colaboration/project/request-add-project";
import { checkDataModelEmpty } from "../../../helper/common/check-data-model-empty";
import { ListColorModel } from "../../../models/colaboration/list-color-model";
import { AddProjectModel } from "../../../models/colaboration/project/add-project-model";
import { getListColor } from "../../../api/colaboration/get-list-color";
import AlertComponent from "../../../components/colaboration/alert-component";


function ListProject({ dataServer }: ServerPageProps) {
    let serverData = ListProjectBuilder.jsonParse((dataServer == null)? null : dataServer)
    if(serverData == null){
        return (
            <ServerError/>
        )
    }
    
    const [loading, setLoading] = React.useState<boolean>(false)
    const [newProject, setNewProject] = React.useState<boolean>(false)
    const [listProject, setListProject] = React.useState<ListProjectModel[]>(serverData)
    const [ dataProject, setDataProject ] = React.useState<AddProjectModel>(new AddProjectModel())
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    const [listColor, setListColor] = React.useState<ListColorModel[]>([])
    const [colorFetch, setColorFetch] = React.useState<boolean>(false)

    async function refetching(e){
        const token = '-'
        const lastPage = 0
        const take = 10
        const keyword = e
        const sorting = "asc"
        const response = await requestListProject(token, lastPage,take,keyword,sorting)
        await setListProject(response)
    
    }

    async function addData() {
        // using page
        // router.push("project/add")

        // using modal
        await setDataProject(new AddProjectModel())
        await setShowValidInput(false)
        await setNewProject(true)
        await setColorFetch(true)
        const response = await getListColor('-')
        var dataServer = await JSON.stringify(response)
        if (checkValidResponse(dataServer) == true) {
            await setListColor(response)
            await setColorFetch(false)
        }
    }

    const checkCompleteData = (callback: () => void) => {
        
        if (checkDataModelEmpty(dataProject)) {
            setShowValidInput(true)
            return;
        }
        callback();
    }

    async function saving() {

        setLoading(true)

        const request = await requestAddProject('-',dataProject)

        if (request.status == 'success') {
            await refetching("")
            await setNewProject(false)
            await setLoading(false)
        } else {
            setLoading(false)
            responseErrorHandler(requestAddProject, (message) => {
                alert(message)
            })
        }
    }
    
    return (
        <>
            <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                {/* <AlertComponent
                    title={"coba coba"}
                    icon = {"https://embed.lottiefiles.com/animation/105198"}
                    isConfirmation = {(e) => console.log(e)}
                    message = {"ini adalah message"}
                    setShowed = {(e) => console.log(e)}
                    showed = {true}

                /> */}
                    <SidebarNavigation>
                        <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                            <StickyHeader 
                                title = {"Proyek"}
                                onSearching = {(e) => refetching(e)}
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
                                                    onClick = {(slug) => router.push("/colaboration/project/detail/"+slug)}
                                                    slug = {obj.projectId}
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
                    <ModalWrapper 
                        showed = {newProject} 
                        setShowed = {(e) => setNewProject(e)} 
                        loading = {loading} 
                        extendClass = {"w-full sm:w-1/2 lg:w-1/3 mx-4 flex flex-col px-4 pt-9 pb-4 bg-white rounded-md w-full"}
                        closeOutsideClick = {true}
                    >
                        {/* title */}
                        <div className = "w-full flex justify-center text-2xl text-black dark:text-white">
                            Proyek Baru
                        </div>
                        <InputDefaultComponent 
                            title="Judul Proyek"
                            placeholder="Judul Proyek"
                            onChange={(val) => setDataProject({...dataProject, title: val})}
                            value={dataProject.title}
                            showValidInput={showValidInput}
                            showTitle = {true}
                        />
                        <InputColorComponent
                            title="Background (Opsional)"
                            loading = {colorFetch}
                            showTitle={true}
                            showValidInput = {showValidInput}
                            list = {listColor}
                            onSelect = {(e) => setDataProject({...dataProject, color: e.id})}
                            value = {dataProject.color}
                        />
                        <div className = "flex flex-row space-x-2 w-full items-center justify-center">
                            <div onClick={() => setNewProject(false)} className=" bg-white border border-[#FF0000] text-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-center">
                                Batal
                            </div>
                            <div onClick={() => checkCompleteData(() => !loading && saving())} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-white text-center">
                                {loading ? "Menambahkan ... ":"Tambah"}
                            </div>
                        </div>
                    </ModalWrapper>
            </Layout>
            
        </>
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