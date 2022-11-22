import React from "react";
import { useRouter } from "next/router";
import TableProps from "../types/table-props";

export default function Table({ config, data, onClick, stickyColIndex }: TableProps): JSX.Element {
    
    const router = useRouter()

    return (
        <div className =" h-[calc(100vh-150px)] sm:h-[calc(100vh-170px)] overflow-x-scroll [@media(max-width:767px)]:scrollbar-hide ">
            <table className ="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className ="sticky top-0 z-20 bg-white dark:bg-[#0F172A] shadow-[0px_1px_0px_0px_rgba(204,204,204,1)] text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        {config.map((cObj, cKey) =>
                            {
                                return (stickyColIndex && cKey == stickyColIndex-1 ? 
                                    (
                                        <th key = {cKey} scope="col" className ="sticky left-0 py-3  bg-white dark:bg-[#0F172A]">
                                            
                                            <div className = "flex flex-row space-x-2 items-center">
                                                <div>{cObj.name}</div>
                                                <div className = "flex flex-col">
                                                    {cObj.sorting && (
                                                        <>
                                                            <div className = "text-xs">
                                                                <svg className = "fill-[#FF0000]" width="9" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5266 5.77551L1.47277 5.77551C1.31261 5.77492 1.15624 5.73226 1.02345 5.65294C0.890648 5.57362 0.787382 5.4612 0.726707 5.32989C0.66603 5.19858 0.650667 5.05428 0.682562 4.91523C0.714457 4.77619 0.792176 4.64865 0.905893 4.54873L5.4247 0.545546C5.49999 0.478303 5.58955 0.424932 5.68824 0.38851C5.78692 0.352088 5.89277 0.333335 5.99968 0.333335C6.10658 0.333335 6.21243 0.352088 6.31111 0.38851C6.4098 0.424932 6.49937 0.478304 6.57465 0.545546L11.0935 4.54873C11.2072 4.64865 11.2849 4.77619 11.3168 4.91523C11.3487 5.05428 11.3333 5.19858 11.2726 5.32989C11.212 5.4612 11.1087 5.57362 10.9759 5.65294C10.8431 5.73226 10.6867 5.77492 10.5266 5.77551Z"/>
                                                                </svg>
                                                            </div>
                                                            <div className = "text-xs">
                                                                <svg className = "fill-[#CCCCCC]" width="9" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.47293 0.224609H10.5267C10.6869 0.225204 10.8433 0.267858 10.9761 0.347178C11.1089 0.426497 11.2121 0.538921 11.2728 0.670231C11.3335 0.801542 11.3488 0.945842 11.3169 1.08489C11.2851 1.22393 11.2073 1.35148 11.0936 1.45139L6.57481 5.45458C6.49953 5.52182 6.40996 5.57519 6.31128 5.61161C6.21259 5.64803 6.10674 5.66679 5.99984 5.66679C5.89293 5.66679 5.78708 5.64803 5.6884 5.61161C5.58971 5.57519 5.50015 5.52182 5.42486 5.45458L0.906055 1.45139C0.792339 1.35148 0.714619 1.22393 0.682725 1.08489C0.65083 0.945842 0.666191 0.801542 0.726868 0.670231C0.787544 0.538921 0.89081 0.426497 1.02361 0.347178C1.15641 0.267858 1.31277 0.225204 1.47293 0.224609Z" />
                                                                </svg>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </th>
                                    ):(
                                        <th key = {cKey} scope="col" className ={`py-3 ${cKey > 0 && 'pl-3'} pr-3`}>
                                            <div className = "flex flex-row space-x-2 items-center">
                                                <div>{cObj.name}</div>
                                                <div className = "flex flex-col">
                                                    {cObj.sorting && (
                                                        <>
                                                            <div className = "text-xs">
                                                                <svg className = "fill-[#FF0000]" width="9" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M10.5266 5.77551L1.47277 5.77551C1.31261 5.77492 1.15624 5.73226 1.02345 5.65294C0.890648 5.57362 0.787382 5.4612 0.726707 5.32989C0.66603 5.19858 0.650667 5.05428 0.682562 4.91523C0.714457 4.77619 0.792176 4.64865 0.905893 4.54873L5.4247 0.545546C5.49999 0.478303 5.58955 0.424932 5.68824 0.38851C5.78692 0.352088 5.89277 0.333335 5.99968 0.333335C6.10658 0.333335 6.21243 0.352088 6.31111 0.38851C6.4098 0.424932 6.49937 0.478304 6.57465 0.545546L11.0935 4.54873C11.2072 4.64865 11.2849 4.77619 11.3168 4.91523C11.3487 5.05428 11.3333 5.19858 11.2726 5.32989C11.212 5.4612 11.1087 5.57362 10.9759 5.65294C10.8431 5.73226 10.6867 5.77492 10.5266 5.77551Z"/>
                                                                </svg>
                                                            </div>
                                                            <div className = "text-xs">
                                                                <svg className = "fill-[#CCCCCC]" width="9" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M1.47293 0.224609H10.5267C10.6869 0.225204 10.8433 0.267858 10.9761 0.347178C11.1089 0.426497 11.2121 0.538921 11.2728 0.670231C11.3335 0.801542 11.3488 0.945842 11.3169 1.08489C11.2851 1.22393 11.2073 1.35148 11.0936 1.45139L6.57481 5.45458C6.49953 5.52182 6.40996 5.57519 6.31128 5.61161C6.21259 5.64803 6.10674 5.66679 5.99984 5.66679C5.89293 5.66679 5.78708 5.64803 5.6884 5.61161C5.58971 5.57519 5.50015 5.52182 5.42486 5.45458L0.906055 1.45139C0.792339 1.35148 0.714619 1.22393 0.682725 1.08489C0.65083 0.945842 0.666191 0.801542 0.726868 0.670231C0.787544 0.538921 0.89081 0.426497 1.02361 0.347178C1.15641 0.267858 1.31277 0.225204 1.47293 0.224609Z" />
                                                                </svg>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </th>
                                    )
                                )
                            }
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((dObj,dKey) => 
                        <tr key = {dKey} className ="bg-white border-b border-[#F5F5F5] dark:bg-[#0F172A] dark:border-gray-700">
                            {config.map((cObj, cKey) =>
                                {
                                    return (stickyColIndex && cKey == stickyColIndex-1 ? 
                                        (
                                            <td onClick = {() => onClick && onClick(dObj)} key = {cKey} className ={`  sticky left-0 `}>
                                                {/* [@media(max-width:767px)]:scrollbar-hide */}
                                                <div className="flex">
                                                    <div className="flex py-3 items-center -ml-1 pl-1 w-20 sm:w-28 md:w-32 lg:w-full bg-white dark:bg-[#0F172A] overflow-y-scroll scrollbar-hide whitespace-nowrap">
                                                        {cObj.render ? cObj.render(dObj[cObj.field]) : dObj[cObj.field]}
                                                    </div>
                                                    {/* spacer for overflowing */}
                                                    <div className = "flex bg-white dark:bg-[#0F172A] px-5 shadow-[5px_0_12px_0_rgba(255,255,255,0.9)] dark:shadow-[5px_0_12px_0_rgba(15,23,42,0.9)]"/>
                                                    <></>
                                                </div>
                                            </td>
                                        ) : 
                                        (
                                            <td onClick = {() => onClick && onClick(dObj)} key = {cKey} className ={`py-4 ${cKey > 0 && 'pl-3'} pr-3 whitespace-nowrap`}>
                                                {cObj.render ? cObj.render(dObj[cObj.field]) : dObj[cObj.field]}
                                            </td>
                                        )
                                    )
                                }
                                                                                
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}