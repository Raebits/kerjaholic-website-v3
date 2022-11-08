import React from "react";
import { useRouter } from "next/router";
import ProjectListCardProps from "../../../types/colaboration/project/project-list-card-props";

export default function ProjectListCard({ listId, onClick, title, totalColaborator, totalTask, creator, createdDate, messageUnread, pic, slug, done, projectCreated }: ProjectListCardProps): JSX.Element {
    
    const router = useRouter()
    
    function progressCounter(done){
        if(totalTask > 0 ){
            return done / totalTask * 100
        }else{
            return 0
        }
    }

    return (
        <div key = {listId} onClick={() => onClick(slug) } className = "w-full lg:w-1/2 ">
            <div className = "bg-white dark:bg-[#CCCCCC] shadow-md rounded-md m-2 p-3 relative">
                {/* chat absolute */}
                <div className = "absolute right-3 top-2 p-2">
                    <div className = "flex flex-row">
                        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_8775_11)">
                            <path d="M22.9543 3.48995C21.4762 2.2734 19.7592 1.37283 17.9117 0.844987C16.0643 0.317145 14.1262 0.173474 12.2198 0.423026C8.69308 0.876162 5.47287 2.63976 3.21308 5.35573C0.953287 8.07169 -0.176693 11.5364 0.0525815 15.0464C0.281856 18.5564 1.8532 21.8486 4.44755 24.2544C7.04189 26.6602 10.4648 27.9994 14.0212 27.9999H22.1668C23.7134 27.9981 25.196 27.3897 26.2896 26.3082C27.3831 25.2266 27.9983 23.7603 28.0002 22.2307V13.3565V13.2838C27.8767 11.3978 27.3655 9.55647 26.4979 7.8725C25.6304 6.18853 24.4246 4.69729 22.9543 3.48995ZM9.3335 8.38456H14.0002C14.3096 8.38456 14.6063 8.50613 14.8251 8.72252C15.0439 8.93891 15.1668 9.23239 15.1668 9.53841C15.1668 9.84443 15.0439 10.1379 14.8251 10.3543C14.6063 10.5707 14.3096 10.6923 14.0002 10.6923H9.3335C9.02408 10.6923 8.72734 10.5707 8.50855 10.3543C8.28975 10.1379 8.16684 9.84443 8.16684 9.53841C8.16684 9.23239 8.28975 8.93891 8.50855 8.72252C8.72734 8.50613 9.02408 8.38456 9.3335 8.38456ZM18.6668 19.923H9.3335C9.02408 19.923 8.72734 19.8015 8.50855 19.5851C8.28975 19.3687 8.16684 19.0752 8.16684 18.7692C8.16684 18.4632 8.28975 18.1697 8.50855 17.9533C8.72734 17.7369 9.02408 17.6153 9.3335 17.6153H18.6668C18.9763 17.6153 19.273 17.7369 19.4918 17.9533C19.7106 18.1697 19.8335 18.4632 19.8335 18.7692C19.8335 19.0752 19.7106 19.3687 19.4918 19.5851C19.273 19.8015 18.9763 19.923 18.6668 19.923ZM18.6668 15.3076H9.3335C9.02408 15.3076 8.72734 15.1861 8.50855 14.9697C8.28975 14.7533 8.16684 14.4598 8.16684 14.1538C8.16684 13.8478 8.28975 13.5543 8.50855 13.3379C8.72734 13.1215 9.02408 12.9999 9.3335 12.9999H18.6668C18.9763 12.9999 19.273 13.1215 19.4918 13.3379C19.7106 13.5543 19.8335 13.8478 19.8335 14.1538C19.8335 14.4598 19.7106 14.7533 19.4918 14.9697C19.273 15.1861 18.9763 15.3076 18.6668 15.3076Z" fill="#FF0000"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_8775_11">
                            <rect width="28" height="27.6923" fill="white" transform="translate(0 0.307617)"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <div className = "-mt-2 -ml-2">
                            <div className = "bg-[#FF0000] border border-white px-1.5 rounded-lg  text-xs text-white" style={{fontSize : "8px"}}>{messageUnread}</div>
                        </div>
                    </div>

                </div>
                <div className="flex space-x-2">
                    <div className = "flex-none">
                        <div className="w-10 ">
                            <img src={pic} alt="project Pic" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                        </div>
                    </div>
                    <div className = "flex flex-col flex-grow">
                        <div className = "">{title}</div>
                        <div className = "flex mb-4 space-x-6 text-xs ">
                            <div>
                                {totalColaborator} Kolaborator
                            </div>
                            <div>
                                {totalTask} Tugas
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                        
                            <div className={`${progressCounter(done) < 100 ? 'bg-[#FF0000] dark:bg-[#FF0000]' :'bg-green-500 dark:bg-green-500'}  h-2.5 rounded-full`} style={{width: progressCounter(done)+'%'}}></div>
                        </div>
                        <div className = "text-xs m-1">{done}/{totalTask}</div>
                        <div className = "flex mt-3 text-xs justify-between">
                            <div className = "flex">
                                Dibuat Oleh {creator}
                            </div>
                            <div className = "flex">
                                {projectCreated}
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}