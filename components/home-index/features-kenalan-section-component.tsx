import React from "react";

import FeatureKenalanComponent from "./feature-kenalan-component";

export default function FeatureKenalanSectionHome(): JSX.Element {
        
    return (
        <>
        <div className = " bg-white px-5 md:px-10 mb-5">
            {/* lg screen */}
            <div className = "hidden h-full md:flex">
                <div className = "w-1/2  py-10 md:py-20 flex">
                    <img className = "w-3/4 md:w-full object-scale-down" src = "/images/index/feature-kenalan-desktop-1.png"></img>
                </div>
                <div className = " w-1/2">
                    <div className = "md:mt-48 md:mr-5 text-right">
                        <div className = " text-2xl lg:text-4xl mb-2">Dapatkan teman & </div>
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl mb-2">pekerjaan <a className = "text-black">di</a> fitur</div>
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl mb-10">kenalan</div>
                    </div>
                </div>
            </div>
            {/* sm screen */}
            <div className = "md:hidden w-full flex flex-col justify-center items-center text-center">
                <img className = "w-full" src = "/images/index/feature-kenalan-1.png"></img>
                <div className = " text-xl mb-2 text-[#FF0000] mt-4">Dapatkan teman & pekerjaan <a className = "text-black">di</a> fitur kenalan</div>
            </div>
        </div>
        <div className = " bg-white px-5 md:px-10 mb-5">
            {/* lg screen */}
            <div className = "hidden h-full md:flex">
                
                <div className = " w-1/2">
                    <div className = "md:mt-48 md:ml-5 text-left">
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl mb-2"><a className = "text-black">Lamar Kerja dengan</a></div>
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl mb-10">CV Menarik</div>
                    </div>
                </div>
                <div className = "w-1/2  py-10 md:py-20 flex">
                    <img className = "w-3/4 md:w-full object-scale-down" src = "/images/index/feature-kenalan-desktop-2.png"></img>
                </div>
            </div>
            {/* sm screen */}
            <div className = "md:hidden w-full flex flex-col justify-center items-center text-center">
                <img className = "w-full" src = "/images/index/feature-kenalan-2.png"></img>
                <div className = " text-xl mb-2 text-[#FF0000] mt-4"><a className = "text-black">Lamar Kerja dengan</a> CV Menarik</div>
            </div>
        </div>
        <div className = " bg-white px-5 md:px-10 mb-5">
            {/* lg screen */}
            <div className = "hidden h-full md:flex">
                <div className = "w-1/2  py-10 md:py-20 flex">
                    <img className = "w-3/4 md:w-full object-scale-down" src = "/images/index/feature-kenalan-desktop-3.png"></img>
                </div>
                <div className = " w-1/2">
                    <div className = "md:mt-48 md:mr-5 text-right">
                        <div className = " text-2xl lg:text-4xl mb-2"><a className = "text-black">Update Terus</a> Bagikan </div>
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl mb-2">aktifitas sehari - hari </div>
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl mb-10"><a className = "text-black">ke semua teman</a></div>
                    </div>
                </div>
            </div>
            {/* sm screen */}
            <div className = "md:hidden w-full flex flex-col justify-center items-center text-center">
                <img className = "w-full" src = "/images/index/feature-kenalan-3.png"></img>
                <div className = " text-xl mb-2 text-[#FF0000] mt-4"><a className = "text-black">Update Terus</a> Bagikan aktifitas sehari - hari <a className = "text-black">ke semua teman</a></div>
            </div>
        </div>
        </>
        // <div className="col-lg-12 row mt-lg-5 mt-3 m-0 p-0 pr-lg-5-5 pl-lg-5-5 pr-5-5 pl-5-5">
        //     <div className="col-lg-12 m-0 p-0 my-auto">
        //         <div className="col-lg-12 row m-0 p-0">

        //             <FeatureKenalanComponent 
        //                 img="/images/index/feature-kenalan-1.png"
        //                 imgDesktop="/images/index/feature-kenalan-desktop-1.png"
        //                 >
        //                 <p className="text-feature-kenalan-black">
        //                     Dapatkan teman & <span className="text-feature-kenalan-red">pekerjaan</span> di <span className="text-feature-kenalan-red">fitur kenalan</span>
        //                 </p>
        //             </FeatureKenalanComponent>

        //             <FeatureKenalanComponent 
        //                 img="/images/index/feature-kenalan-2.png"
        //                 imgDesktop="/images/index/feature-kenalan-desktop-2.png"
        //                 reverse={true}
        //                 >
        //                 <p className="text-feature-kenalan-black">
        //                     Lamar Kerja dengan <span className="text-feature-kenalan-red">CV Menarik</span>
        //                 </p>
        //             </FeatureKenalanComponent>
              
        //             <FeatureKenalanComponent 
        //                 img="/images/index/feature-kenalan-3.png"
        //                 imgDesktop="/images/index/feature-kenalan-desktop-3.png"
        //                 >
        //                 <p className="text-feature-kenalan-black">
        //                     Update Terus <span className="text-feature-kenalan-red">Bagikan aktifitas sehari - hari</span> ke semua teman
        //                 </p>
        //             </FeatureKenalanComponent>

        //         </div>
        //     </div>
        // </div>
    )
}