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
import { getListColor } from "../../../../api/colaboration/get-list-color";
import { ListColorBuilder } from "../../../../model-builder/colaboration/ListColorBuilder";
import { ListColorModel } from "../../../../models/colaboration/ListColorModel";
import { InputDefaultComponent } from "../../../../components/input/input-default-component";
import { AddProjectModel } from "../../../../models/colaboration/project/AddProjectModel";
import { checkDataModelEmpty } from "../../../../helper/common/check-data-model-empty";
import { requestAddProject } from "../../../../api/colaboration/project/request-add-project";
import { responseErrorHandler } from "../../../../helper/common/response-request-handler";
import router from "next/router";
import { route } from "next/dist/server/router";
import { InputColorComponent } from "../../../../components/input/input-color-component";
import ServerPageProps from "../../../../types/colaboration/server-page-props";

function AddProject({ dataServer }: ServerPageProps) {
    
    let serverData = ListColorBuilder.jsonParse((dataServer == null)? null : dataServer)
    if(serverData == null){
        return (
            <ServerError/>
        )
    }
    

    const [ dataProject, setDataProject ] = React.useState<AddProjectModel>(new AddProjectModel())
    const [ showValidInput, setShowValidInput ] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(false)
    const [listColor] = React.useState<ListColorModel[]>(serverData)
    
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

            router.push('/colaboration/project')

        } else {
            setLoading(false)
            responseErrorHandler(requestAddProject, (message) => {
                alert(message)
            })
        }
    }

    return (
        <Layout title={"Tambah Kenalan sekaligus Cari Kerjaan | Kerjaholic"} useFooter = {false}>
                <SidebarNavigation>
                    <div className="flex flex-col bg-white dark:bg-[#0F172A]">
                        <StickyHeader 
                            title = {"Tambah Proyek"}
                            onBack = {(e) => router.back()}
                        >
                            <div/>
                        </StickyHeader>
                        {/* content */}
                        <div className=" mt-6 px-5">
                            <InputDefaultComponent 
                                title="Judul Proyek"
                                placeholder="Judul Proyek"
                                onChange={(val) => setDataProject({...dataProject, title: val})}
                                value={dataProject.title}
                                showValidInput={showValidInput}
                                showTitle = {true}
                            />
                            <InputColorComponent
                                title="Warna Latar"
                                showTitle={true}
                                showValidInput = {showValidInput}
                                list = {listColor}
                                onSelect = {(e) => setDataProject({...dataProject, color: e.id})}
                            />

                            <div onClick={() => checkCompleteData(() => !loading && saving())} className=" bg-[#FF0000] px-4 py-4 my-3 rounded-full text-white text-center">
                                {loading ? "Menyimpan ... ":"Simpan"}
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
    const response = await getListColor(token)
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


export default AddProject;