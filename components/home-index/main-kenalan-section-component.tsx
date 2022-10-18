import React from "react";
import MainKenalanSectionComponentProps from "../../types/home/main-kenalan-section-component-props";

export default function MainKenalanSectionHome({ heightDevice }: MainKenalanSectionComponentProps): JSX.Element {
    
    return (

        <div className = "relative h-screen mb-10 bg-white bg-no-repeat bg-cover bg-center md:bg-left-top bg-[url('/images/index/bg-main-section-kenalan.png')] md:bg-[url('/images/index/bg-main-section-kenalan-desktop.png')]">
            {/* lg screen */}
            <div className = "hidden h-full md:flex">
                <div className = "w-1/2">
                </div>
                <div className = " w-1/2">
                    <div className = "md:mt-48 md:ml-24">
                        <div className = "text-[#FF0000] text-3xl lg:text-5xl font-poppinsBold mb-2">TAMBAH KENALAN</div>
                        <div className = "text-[#FF0000] text-2xl lg:text-4xl font-poppinsThin mb-2">Sekaligus</div>
                        <div className = "text-[#FF0000] text-3xl lg:text-5xl mb-10">CARI KERJAAN</div>
                        <a href="https://kerjaholic.page.link/5DWr7m4EkWZj3KTDA" >
                            <button className = "bg-[#FF0000] text-white px-5 py-1 rounded-md text-2xl lg:text-3xl">Unduh Aplikasi</button>
                        </a>
                    </div>
                </div>
            </div>
            {/* sm screen */}
            <div className = "md:hidden h-full flex text-left">
                <div className = " w-full">
                    <div className = "mt-20 ml-6">
                        <div className = "text-[#FF0000] text-2xl font-bold mb-2">TAMBAH KENALAN</div>
                        <div className = "text-[#FF0000] text-xl font-thin mb-2">Sekaligus</div>
                        <div className = "text-[#FF0000] text-2xl mb-10">CARI KERJAAN</div>
                        
                    </div>
                    <div className = "absolute bottom-9 flex items-center justify-center w-full mt-64"  >
                        <div className = "flex ">
                            <a href="https://kerjaholic.page.link/5DWr7m4EkWZj3KTDA">
                                <button className = "bg-[#FF0000] text-white px-5 py-1 rounded-md text-md">Unduh Aplikasi</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}