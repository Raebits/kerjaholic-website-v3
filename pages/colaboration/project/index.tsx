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
import { TypeImageInputComponent } from "../../../types/input/input-image-component-props";
import  InputImageComponent  from "../../../components/input/input-image-component";
import { InputFileComponent } from "../../../components/input/input-file-component";
import { TypeFileInputComponent } from "../../../types/input/input-file-component-props";


function ListProject({ dataServer }: ServerPageProps) {
    let serverData = ListProjectBuilder.jsonParse((dataServer == null)? null : dataServer)
    if(serverData == null){
        return (
            <ServerError/>
        )
    }
    
    const inputRef = React.createRef<HTMLInputElement>();

    const [loading, setLoading] = React.useState<boolean>(false)
    const [newProject, setNewProject] = React.useState<boolean>(false)
    const [listProject, setListProject] = React.useState<ListProjectModel[]>(serverData)
    const [ dataProject, setDataProject ] = React.useState<AddProjectModel>(new AddProjectModel())
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    const [listColor, setListColor] = React.useState<ListColorModel[]>([])
    const [colorFetch, setColorFetch] = React.useState<boolean>(false)
    const [cropImage, setCropImage] = React.useState<boolean>(false)
    const [previewImage, setPreviewImage] = React.useState(null)

    async function refetching(e){
        const token = '-'
        const lastPage = 0
        const take = 10
        const keyword = e
        const sorting = "asc"
        const response = await requestListProject(token, lastPage,take,keyword,sorting)
        await setListProject(response)
        console.log(response)
    
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
        console.log(dataProject,'before input')
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
    
    const onChangePic = async (file: File) => {
        if (file) {
            console.log(file)
            await setDataProject({...dataProject, useLogo: 1, pic:file})
            let reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    }

    async function modalAction(e){
        setNewProject(e)
        if(!e){
            await setDataProject(new AddProjectModel())
            await setPreviewImage(null)
        }
    }

    async function deleteCroppedImage () {
        await setDataProject({...dataProject, useLogo: 0, pic:null})
        await setPreviewImage(null)
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
                                // breadcrumb = {[{title : "Proyek", path : "colaboration/project"},{title : "List Proyek", path : "/"}]}
                                onSearching = {(e) => refetching(e)}
                                onSorting = {(e) => console.log(e)}
                            >
                                {/* button add project */}
                                <div onClick = {() => addData()} className = "flex items-center justify-center bg-[#FF0000] rounded-md lg:rounded-full px-1 text-sm ">
                                    <svg className = "fill-white" xmlns="http://www.w3.org/2000/svg" width="41" height="40">
                                        <g>
                                            <path d="M20.832 32c-6.617 0-12-5.383-12-12s5.383-12 12-12c6.618 0 12 5.383 12 12s-5.382 12-12 12Zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5Z"/><path d="M26.082 20.75h-10.5a.75.75 0 0 1 0-1.5h10.5a.75.75 0 0 1 0 1.5Z"/>
                                            <path d="M20.832 26a.75.75 0 0 1-.75-.75v-10.5a.75.75 0 0 1 1.5 0v10.5a.75.75 0 0 1-.75.75Z"/>
                                        </g>
                                    </svg>
                                    <div className = "hidden lg:block whitespace-nowrap text-white mr-2">
                                        Tambah Proyek
                                    </div>
                                </div>
                            </StickyHeader>
                            {/* content */}
                            <div className=" mt-6 px-3 mb-20 sm:mb-6">
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
                                                    color = {obj.color}

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
                        setShowed = {(e) => modalAction(e)} 
                        loading = {loading} 
                        extendClass = {"w-full sm:w-1/2 lg:w-1/3 mx-4 flex flex-col px-4 pt-9 pb-4 bg-white dark:bg-gray-800 rounded-md w-full"}
                        // closeOutsideClick = {true}
                    >
                            {/* {!cropImage && (
                                <> */}
                                <div className = "w-full flex justify-center text-2xl text-black dark:text-white">
                                    Proyek Baru
                                </div>
                                
                                <div className="flex space-x-2 items-center ">
                                    <div onClick={() => inputRef.current.click()} className = "flex-none ">
                                        <div className = "relative flex items-center justify-center h-16 w-16 bg-[#CCCCCC] rounded-full">
                                            {previewImage ? (
                                                <>
                                                <img className="shadow rounded-full max-w-full h-auto align-middle border-none" src={previewImage} />
                                                {/* <div onClick = {()=>deleteCroppedImage()} className = "absolute p-3.5 bg-opacity-30 hover:bg-opacity-40 hover:bg-[#FF0000] rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-gray-200">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </div>     */}
                                                <div className = "absolute p-5 rounded-full group hover:bg-[#FF0000] hover:bg-opacity-20">
                                                    <svg className = "w-7 h-7 fill-[#828282]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path  d="M16.767 4.5 15.59 2.974A2.518 2.518 0 0 0 13.61 2h-3.22a2.52 2.52 0 0 0-1.98.974L7.232 4.5h9.535ZM12 17a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 12 17Z"/>
                                                        <path  d="M17.833 6.167H6.167A4.172 4.172 0 0 0 2 10.334v7.5a4.172 4.172 0 0 0 4.167 4.167h11.666A4.172 4.172 0 0 0 22 17.834v-7.5a4.172 4.172 0 0 0-4.167-4.167ZM12 18.667a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
                                                    </svg>
                                                </div>
                                                </>
                                            ):(
                                                <svg className = "w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path fill="#828282" d="M16.767 4.5 15.59 2.974A2.518 2.518 0 0 0 13.61 2h-3.22a2.52 2.52 0 0 0-1.98.974L7.232 4.5h9.535ZM12 17a3.333 3.333 0 1 0 0-6.667A3.333 3.333 0 0 0 12 17Z"/>
                                                    <path fill="#828282" d="M17.833 6.167H6.167A4.172 4.172 0 0 0 2 10.334v7.5a4.172 4.172 0 0 0 4.167 4.167h11.666A4.172 4.172 0 0 0 22 17.834v-7.5a4.172 4.172 0 0 0-4.167-4.167ZM12 18.667a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className = "flex-grow py-2 pt-5">
                                        <InputDefaultComponent 
                                            title="Judul Proyek"
                                            placeholder="Judul Proyek"
                                            onChange={(val) => setDataProject({...dataProject, title: val})}
                                            value={dataProject.title}
                                            showValidInput={showValidInput}
                                            showTitle = {true}
                                        />
                                    </div>
                                </div>
                                
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
                                    <div onClick={async () => {await setNewProject(false); await modalAction(false);}} className=" bg-white border border-[#FF0000] text-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-center">
                                        Batal
                                    </div>
                                    <div onClick={() => checkCompleteData(() => !loading && saving())} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-md w-full text-white text-center">
                                        {loading ? "Menambahkan ... ":"Tambah"}
                                    </div>
                                </div>
                            {/* </>
                            )} */}

                            {/* <InputImageComponent 
                                ref={inputRef}
                                label="Foto Diri"
                                placeholder={"Image"}
                                onChange={(file) => onChangePic(file)}
                                type={TypeImageInputComponent.image}
                                showValidInput={showValidInput}
                                initValue={null}
                                isShowed = {(e) => setCropImage(e)}
                            /> */}
                    </ModalWrapper>
                    <InputImageComponent 
                        ref={inputRef}
                        label="Foto Diri"
                        placeholder={"Image"}
                        onChange={(file) => onChangePic(file)}
                        type={TypeImageInputComponent.image}
                        showValidInput={showValidInput}
                        initValue={null}
                        isShowed = {(e) => setCropImage(e)}
                        aspectRatio = {1 / 1}
                    />
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