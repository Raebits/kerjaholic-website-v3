import React from "react";
import { useRouter } from "next/router";
import GroupImageComponentProps from "../../types/colaboration/group-image-component-props";

export default function GroupImageComponent({ data, limit }: GroupImageComponentProps): JSX.Element {
    
    const router = useRouter()
    const autoSize = 1/(limit + 1) * 100
    return (
        
        <div className = "flex flex-row">
            {data.length > 0 && data.map((obj, i) => 
                (i<limit) && (
                    <div key = {i} style = {{marginLeft:`${i > 0 ? '-9px' : '0px'} `, width:`${autoSize}%`, height:`${autoSize}%`}} className="flex border-2 border-white bg-white rounded-full">
                        <img src={obj.avatar} alt="KJ" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                    </div>
                )
            )}
            {data.length > limit && (
                <div key = {limit+1} style = {{marginLeft:'-9px', width:`${autoSize}%`, height:`${autoSize}%`}} className="flex aspect-square shadow rounded-full  border-2 border-white bg-[#FFFFFF]">
                    <svg className = "" viewBox="0 0 56 18">
                        <text x="30%" y="90%">{data.length - limit}+</text>
                    </svg>
                </div>
            )}
            
        </div>
    )

    // return (
        
    //     <div className = "flex flex-row bg-orange-600">
    //         {data.length > 0 && data.map((obj, i) => 
    //             (i<limit) && (
    //                 <div key = {i} style = {{marginLeft:`${i > 0 ? '-9px' : '0px'} `, width:`${autoSize}%`}} className="flex border-2 border-white bg-white rounded-full">
    //                     <img src={obj.avatar} alt="KJ" style = {{width:`${100}%`, height:'auto'}} className="shadow rounded-full align-middle border-none" />
    //                 </div>
    //             )
    //         )}
    //         {data.length > limit && (
    //             <div key = {limit+1} style = {{marginLeft:'-9px', width:`${autoSize}%`}} className="flex items-center justify-center shadow rounded-full  border-2 border-white bg-[#FFFFFF] p-1 text-xs">
    //                 {data.length - limit}+
    //             </div>
    //         )}
            
    //     </div>
    // )
}


    