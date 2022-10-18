import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";

import ProfileComponentProps from "../../../types/profile/profile-component-props";
import { CertificateProfileModel } from "../../../models/profile/certificate-model";
import { StatusSosmedModel } from "../../../models/sosmed/status-sosmed-model";
import { capitalizeFirstWords } from "../../../helper/capitalize-first-letter";
import { ProfileDetailModel } from "../../../models/profile/profile-detail-model";
import { StudyProfileModel } from "../../../models/profile/profile-study-model";
import { ExperienceProfileModel } from "../../../models/profile/profile-experience-model";
import { getListStatusProfile } from "../../../api/profile/get-list-status-profile";
import { ProfileTestimoniModel } from "../../../models/profile/profile-testimoni-model";
import { getListTestimoniProfile } from "../../../api/profile/get-list-testimoni-profile";
import Cookies from "universal-cookie";
import { getStatusLogin } from "../../../helper/get-status-login-boolean";
import { ProfileDetailBuilder } from "../../../model-builder/profile/profile-detail-builder";
import { useRouter } from "next/router";
import { checkValidResponse } from "../../../helper/check-error-response";
import { selectionPropsResponse } from "../../../helper/profile/selection-props-response";
import { getDetailProfile_json } from "../../../api/profile/get-detail-profile";
import ShareLayout from "../../../components/share-layout";
import moment from "moment";
import AppRedirectContext from "../../../utils/context/app-redirect-context";

function Profil({ dataServer, idProfile }: ProfileComponentProps): JSX.Element {
    
    let dataServerSide = ProfileDetailBuilder.toProfileDetailModel(dataServer)
    const { showAppRedirect, showAppRedirectMini,toggleAppRedirectFull, toggleAppRedirectMini } = React.useContext(AppRedirectContext)

    const router = useRouter()
    moment.locale(router.locale)
    const { id, ref } = router.query

    const { t } = useTranslation('profile');

    const [ widthtDevice, setWidthDevice] = React.useState(0)

    const [ loadingState, setLoadingState ] = React.useState<boolean>(false)
    const [ loadingStatusState, setLoadingStatusState ] = React.useState<boolean>(false)
    const [ loadingTestimoniState, setLoadingTestimoniState ] = React.useState<boolean>(false)
    const [ profileData, setProfileData ] = React.useState<ProfileDetailModel>(new ProfileDetailModel())
    const [ userId, setUserId ] = React.useState("");
    const [ isMyProfile, setIsMyProfile ] = React.useState<boolean>(false);
    const [ educations, setEducations ] = React.useState<StudyProfileModel[]>([])
    const [ jobExp, setJobExp ] = React.useState<ExperienceProfileModel[]>([])
    const [ certificates, setCertificates ] = React.useState<CertificateProfileModel[]>([])
    const [ listStatus, setListStatus ] = React.useState<StatusSosmedModel[]>([])
    const [ testimonials, setTestimonials ] = React.useState<ProfileTestimoniModel[]>([])

    React.useEffect(() => {
        var ID = localStorage.getItem("userId")
        setIsMyProfile((ID == idProfile))

        if (idProfile != null) {
            ID = idProfile
        }
        
        setUserId(ID);
        setLoadingState(true);

        setProfileData(dataServerSide)
        setEducations(dataServerSide.study)
        setJobExp(dataServerSide.experience)
        setCertificates(dataServerSide.cert)
        setLoadingState(false)

        // Next request list status profile
        setLoadingStatusState(true)
        getListStatusProfile(ID, (list) => {
            console.log(list)
            setListStatus(customListStatus(list));
            setLoadingStatusState(false)

            setLoadingTestimoniState(true)

            getListTestimoniProfile(ID, (list) => {
                setTestimonials(list)
                setLoadingTestimoniState(false)
            })
        })

    }, [id, dataServer])

    const customListStatus = (list: StatusSosmedModel[]): StatusSosmedModel[] => {

        var newList: StatusSosmedModel[] = []

        if (list.length > 2) {
            for (let i = 0; i < 2; i++) {
                let status = list[i];
                newList.push(status)
            }
        } else {
            newList = list
        }

        return newList
    }

    function redirectApp(){
        toggleAppRedirectFull()
    }

    return (
        <ShareLayout
            useTopNav={true} 
            titleNav={("@" + dataServerSide.name) + " on Kerjaholic"}
            useMobileRedirectDialog={true}
            meta={{
                title: ("@" + dataServerSide.name) + " on Kerjaholic",
                desc: dataServerSide.aboutMe,
                thumbnail: ((dataServerSide.metaImage == "-") ? null : dataServerSide.metaImage)
            }}
        >
            {(loadingState == false) && (
                <div className = "bg-gray-100">
                    {/* wrapper  */}
                    <div className = "bg-white px-3">
                        {/* avatar dan statistic  */}
                        <div className= "flex mt-6">
                            <div className = "flex-none flex justify-center">
                                <div className="w-20 ">
                                    <img src={profileData.pic} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                </div>
                            </div>
                            <div className = "flex item-center pt-4 justify-center text-center flex-grow">
                                <div className = "flex-grow">
                                    <p className = "text-gray-500 text-sm">Post</p>
                                    <p className = "text-lg">{profileData.postFeed}</p>
                                </div>
                                <div className = "flex-grow">
                                    <p className = "text-gray-500 text-sm">Reply</p>
                                    <p className = "text-lg">{profileData.postComment}</p>
                                </div>
                                <div className = "flex-grow">
                                    <p className = "text-gray-500 text-sm">Liked</p>
                                    <p className = " text-lg">{profileData.postLike}</p>
                                </div>
                            </div>
                        </div>
                        {/* name part  */}
                        <div className = "mt-3">
                            {profileData.name}
                        </div>
                        {/* username part  */}
                        <div className = "mt-3">
                            
                        </div>
                        {/* total kenalan dana kota asal  */}
                        <div className = "flex">
                            <div className = "flex-grow flex items-center">
                                <div className = "flex-none  p-3">
                                    <img className = "h-4" src= "/images/profile/icon-kenalan.png"/>
                                </div>
                                <div className="flex-grow">
                                    {profileData.friend}
                                </div>
                            </div>
                            <div className = "flex-grow flex items-center">
                                <div className = "flex-none  p-3">
                                    <img className = "h-4" src= "/images/profile/icon-location.png"/>
                                </div>
                                <div className="flex-grow">
                                    {profileData.city}
                                </div>
                            </div>
                        </div>
                        {/* about part  */}
                        <div className = "pb-6">
                            {profileData.aboutMe}
                        </div>
                    </div>
                    {/* wrapper  */}
                    <div className = "bg-white mt-1">
                        <div className = "px-3 py-4">
                            Pendidikan
                        </div>
                        {educations.length > 0 ? (
                            educations.map((item, index) => {
                                return (
                                    <div key = {index} className = "flex items-center pb-3">
                                        <div className = "flex-none  p-3">
                                            <img className = "h-4" src= "/images/profile/icon-education.png"/>
                                        </div>
                                        <div className = "flex-grow flex flex-col ">
                                            <div className = "flex ">
                                                {item.institution} ({item.strata})
                                            </div>
                                            <div className = "flex text-gray-500 text-xs">
                                                {item.major} • {item.year} - {item.year_to}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        ):(
                            <div className = "flex items-center justify-center text-gray-500 pb-3">
                                Data Kosong
                            </div>
                        )}
                    </div>
                    {/* wrapper  */}
                    <div className = "bg-white mt-1">
                        <div className = "px-3 py-4">
                            Riwayat Pekerjaan
                        </div>
                        {jobExp.length > 0 ? (
                            jobExp.map((item, index) => {
                                return (
                                    <div key = {index} className = "flex items-center pb-3">
                                        <div className = "flex-none  p-3">
                                            <img className = "h-4" src= "/images/profile/icon-job-exp.png"/>
                                        </div>
                                        <div className = "flex-grow flex flex-col ">
                                            <div className = "flex ">
                                                {item.companyName}
                                            </div>
                                            <div className = "flex text-gray-500 text-xs">
                                                {item.posisi} •  {moment(item.startDate).format('YYYY')}-{moment(item.endDate).format('YYYY')}
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        ):(
                            <div className = "flex items-center justify-center text-gray-500 pb-3">
                                Data Kosong
                            </div>
                        )}
                    </div>
                    {/* wrapper  */}
                    <div className = "bg-white flex flex-col mt-1">
                        <div className = "flex mt-3 mx-4">
                            <div className = "flex-none">
                                Postingan Saya
                            </div>
                            <div className = "flex-grow" />
                            <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "flex-none text-[#FF0000]">
                                Lihat Semua
                            </div>
                        </div>
                        <div className = "mx-4">
                            {listStatus.length > 0 ? (
                                listStatus.map((item, index) => {
                                    return (
                                        <div key = {index} className = "mt-4 mb-3">
                                            {/* list feed  */}
                                            <div className= "flex items-center">
                                                <div className = "flex-none flex justify-center ">
                                                    <div className="w-10 ">
                                                        <img src={item.pic} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                                    </div>
                                                </div>
                                                <div className = "flex-grow mx-3">
                                                    <div>{item.userName}</div>
                                                    <div className = " text-gray-500 text-xs">{item.inPostDate}</div>
                                                </div>
                                                <div className = "flex-none">
                                                    <img src = "/images/status-sosmed/dot-more.png" alt="dot-more"/>
                                                </div>
                                            </div>
                                            <div className = "flex flex-col">
                                                <div className = "my-2">
                                                    {item.feedContent}
                                                </div>
                                                {item.feedMedia !== '-' && (
                                                    <img className = "object-cover object-top h-36 rounded-xl" src = {item.feedMedia} alt = "feed-media"/>
                                                )}
                                            </div>
                                            <div className = "flex mt-6">
                                                <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "flex-none flex items-center">
                                                    <img src="/images/status-sosmed/love.png" 
                                                        className="h-4 mx-2"
                                                    />
                                                    {item.likes}
                                                </div>
                                                <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "flex-grow flex items-center mx-5 ">
                                                    <img src="/images/status-sosmed/comment.png" 
                                                        className="h-4 mx-2"
                                                    />
                                                    {item.comments}
                                                </div>
                                                <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "flex-none flex items-center ">
                                                    <img src="/images/status-sosmed/share.png" 
                                                        className="h-4 mx-2"
                                                    />
                                                    Share
                                                </div>
                                            </div>
                                            <hr className = "mt-5"/>
                                        </div>
                                    )
                                })
                            ):(
                                <div className = "flex items-center justify-center text-gray-500 pb-3">
                                    Data Kosong
                                </div>
                            )}
                        </div>
                    </div>
                    {/* wrapper  */}
                    <div className = "bg-white flex flex-col mt-1 mb-96 px-4">
                        <div className = "flex mt-3 mb-5">
                            <div className = "flex-none">
                                Testimoni
                            </div>
                            <div className = "flex-grow"/>
                            <div style={{cursor: "pointer"}} onClick = {()=>redirectApp()} className = "flex-none text-[#FF0000]">Lihat Semua</div>
                        </div>
                        <div className = "flex flex-col" >
                        {testimonials.length > 0 ? (
                            testimonials.map((item, index) => {
                                return (
                                    <div className = "flex flex-col shadow-xl p-3 rounded-xl h-44 w-5/6">
                                        <div className = "flex items-center">
                                            <div className = "flex-none">
                                                <div className="w-10 ">
                                                    <img src={item.pic} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                                                </div>
                                            </div>
                                            <div className = "flex flex-col flex-grow px-3">
                                                <div className = "">{item.name}</div>
                                                <div className = "text-gray-500 text-xs">{item.inTestyDate}</div>
                                            </div>
                                        </div>
                                        <div className="flex py-3 truncate">
                                            {item.testy}
                                        </div>
                                    </div>
                                )
                            })
                        ):(
                            <div className = "flex items-center justify-center text-gray-500 pb-3">
                                    Data Kosong
                            </div>
                        )}
                        </div>
                    </div>
                    
                </div>
            )}
        </ShareLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { locale, req } = context
    const { id } = context.query
    
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();

    var idProfile = (id == null) ? cookies.get("userId") : id

    if (getStatusLogin(cookies) == false && id == null) { // login FALSE, /profil
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    // ------- passed, get profile data -------
    let response = await getDetailProfile_json(idProfile as string)
    
    var dataServer = JSON.stringify(response)
    
    if (checkValidResponse(dataServer) == true && selectionPropsResponse(getStatusLogin(cookies), idProfile) == true) {
        return {
            props: {
                dataServer,
                idProfile,
                ...(await serverSideTranslations(locale, ['profile'])),
            }
        }    
    } else {
        return {
            props: {
                ...(await serverSideTranslations(locale, ['profile'])),
            }
        }  
    }
}

export default Profil;