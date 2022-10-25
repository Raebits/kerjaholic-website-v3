import React from "react";
import { listCoveredByData } from "../../constant/list-covered-by-constant";

export default function CoveredBySectionHome(): JSX.Element {
    
    return (
        <div className = " bg-white dark:bg-[#0F172A] px-5 md:px-10">
            <div className = " flex justify-center text-3xl font-bold py-5 text-black dark:text-white">Diliput Oleh</div>
            
            <div  className = "flex flex-wrap w-full justify-between items-center ">
            {
                listCoveredByData.map((prop, index) => {
                    return (
                        <div key={"CoveredByData" + index} className = "w-full lg:w-1/3 flex justify-center items-center">
                            <div style={{cursor: "pointer"}} className="block w-full mx-2 my-3 h-48 bg-white dark:bg-[#0F172A]">

                                    <img  className="object-left" src={prop.img} alt="Article image"/>
                                
                                <div className="mb-1 mt-3 text-md md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {prop.title}
                                </div>
                                <div className="flex text-red-600 mt-4 mb-5">
                                    <a href={prop.link}  className="text-coveredBy-btn-detail" target="_blank">
                                        Link Detail 
                                    </a>
                                    <img className="img img-fluid" src={"/images/index/arrow_right_covered-by.png"} alt="" />
                                </div>
                                {/* <p className="font-normal mx-6 text-gray-700 ">Content</p> */}
                            </div>
                        </div>
                )})
            }
                
            </div>
        </div>
    )
}