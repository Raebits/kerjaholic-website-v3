import React from "react";
import { baseNotApiUrl } from "../../constant/base-url";
import { listFollowUsData } from "../../constant/list-follow-us-constant";
import FollowUsFooterSectionHome from "./follow-us-footer-section-component";

export default function FooterSectionHome(): JSX.Element {
    
    return (
        <>
        <div className = " hidden md:flex flex-col md:flex-row bg-white px-10 pt-12">
            <div className = "w-1/4 pr-10">
                <div className = "font-bold mb-2">
                    PT Kerjaholic Inovasi Teknologi
                </div>
                <div className = "mb-3 text-gray-700">
                    contact@kerjaholic.com
                </div>

                <div className = "font-bold mb-2 mt-10">
                    Metro Center (Utama)
                </div>
                <div className = "mb-3 text-gray-700">
                    Jl. K.H Agus Salim No. 7
                    Purwodinatan, Semarang
                    Tengah
                    Kota Semarang, Indonesia
                </div>
                <div className = "mt-2 text-gray-700">
                    0818 0278 7888
                </div>            
            </div>
            <div className = "w-1/4">
                <div className = "font-bold mb-2">
                    (Cabang)
                </div>
                <div className = "mb-3 text-gray-700">
                    Jl. Hayam Wuruk No. 99
                    Taman Sari, Kota Jakarta Barat
                    Daerah Khusus Ibukota Jakarta,
                    Indonesia                
                </div>
                <div className = "mt-2 text-gray-700">
                0878 8799 7888
                </div>      
            </div>
            <div className = "w-1/4">
                <div className = "font-bold mb-2">
                    Sitemap
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href="https://academy.kerjaholic.com">Online Academy</a>        
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href="https://x23eu.app.goo.gl/kjhl">Portal Lowongan</a>             
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href={baseNotApiUrl + "about/kjhl"}>About Us</a>              
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href={baseNotApiUrl + "tnc"}>Terms & Condition</a>              
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href={baseNotApiUrl + "privacy"}>Privacy Policy</a>              
                </div>
                <div className = "mb-3 text-gray-700">
                    Help              
                </div>
                <a className = "mb-3 text-gray-700">
                    Send Feedback              
                </a>

            </div>
            <div className = "w-1/4">
                <div className = "font-bold mb-2">
                    Ikuti Kami
                </div>
                {
                        listFollowUsData.map((item, index) => {
                            return (
                                <FollowUsFooterSectionHome 
                                    key={"listFollowUsData" + index}
                                    {...item}
                                />
                            )
                        })
                    }
            </div>
        </div>
        {/* <div className = "flex md:hidden pt-12 mx-6">
            <div className = "w-1/2">
                <div className = "font-bold mb-2">
                    PT Kerjaholic Inovasi Teknologi
                </div>
                <div className = "mb-3 text-gray-700">
                    contact@kerjaholic.com
                </div>

                <div className = "font-bold mb-2 mt-10">
                    Metro Center (Utama)
                </div>
                <div className = "mb-3 text-gray-700">
                    Jl. K.H Agus Salim No. 7
                    Purwodinatan, Semarang
                    Tengah
                    Kota Semarang, Indonesia
                </div>
                <div className = "mt-2 text-gray-700">
                    0818 0278 7888
                </div>            
            </div>
            <div className = "w-1/2">
                <div className = "font-bold mb-2">
                    (Cabang)
                </div>
                <div className = "mb-3 text-gray-700">
                    Jl. Hayam Wuruk No. 99
                    Taman Sari, Kota Jakarta Barat
                    Daerah Khusus Ibukota Jakarta,
                    Indonesia                
                </div>
                <div className = "mt-2 text-gray-700">
                0878 8799 7888
                </div>      
            </div>
        </div> */}
        <div className = "flex flex-col md:hidden pt-12 mx-6">
            <div className = "w-1/2">
                <div className = "font-bold mb-2">
                    Sitemap
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href="https://academy.kerjaholic.com">Online Academy</a>        
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href="https://x23eu.app.goo.gl/kjhl">Portal Lowongan</a>             
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href={baseNotApiUrl + "about/kjhl"}>About Us</a>              
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href={baseNotApiUrl + "tnc"}>Terms & Condition</a>              
                </div>
                <div className = "mb-3 text-gray-700">
                    <a href={baseNotApiUrl + "privacy"}>Privacy Policy</a>              
                </div>
                <div className = "mb-3 text-gray-700">
                    Help              
                </div>
                <a className = "mb-3 text-gray-700">
                    Send Feedback              
                </a>

            </div>
            <div className = "w-1/2">
                <div className = "font-bold mb-2 mt-10">
                    Ikuti Kami
                </div>
                {
                        listFollowUsData.map((item, index) => {
                            return (
                                <FollowUsFooterSectionHome 
                                    key={"listFollowUsData" + index}
                                    {...item}
                                />
                            )
                        })
                    }
            </div>
        </div>
        <div className = "flex px-10 pt-16 pb-5">
        © Kerjaholic, 2017 - 2022. Semua Hak Dilindungi
        </div>
        </>
    )
}