import React from "react";
import { listTestimonialsData } from "../../constant/list-testimonials-constant";

export default function TestimonialsSectionHome(): JSX.Element {
    

    return (
        <div className = "relative px-5 md:px-10 pb-10">
            <div style = {{zIndex:-1}} className = "absolute -top-40 left-0 h-screen w-full bg-cover bg-[url('/images/index/bg-testimonials.png')] dark:bg-[#0F172A]  bg-no-repeat "></div>
            <div className = " flex justify-center text-3xl font-bold py-5 text-black dark:text-white">Testimoni</div>
            
            <div  className = "flex flex-wrap w-full justify-between items-center ">

                {
                    listTestimonialsData.map((prop, index) => {
                        return (

                            <div key={"TestimonialsData" + index} className = "w-full lg:w-1/3 flex flex-col justify-center items-center ">
                                <div className = "border bg-gray-50 dark:bg-slate-700 border-gray-400 rounded-lg  m-2">
                                    <div className="block text-sm w-full mx-2 my-3 px-5 py-2 text-black dark:text-white  ">
                                    {prop.text}
                                    </div>
                                    <div className = "flex w-full px-5 py-2">
                                        <div className="flex-none  w-14 h-14 flex justify-between">
                                        <img src = {prop.avatar}/>
                                        </div>
                                        <div className="grow flex flex-col justify-center">
                                            <div className = "text-black dark:text-white px-2 text-base">{prop.name}</div>
                                            <div className = " px-2 text-sm text-gray-500 dark:text-gray-300">{prop.date}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                        )
                    })
                }
            </div>
        </div>
    )
}