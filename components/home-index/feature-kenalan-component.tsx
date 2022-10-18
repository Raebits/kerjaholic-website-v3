import React from "react";
import FeatureKenalanComponentProps from "../../types/home/feature-kenalan-component-props";

export default function FeatureKenalanComponent({ children, img, imgDesktop, reverse }: FeatureKenalanComponentProps): JSX.Element {
    
    return (
        <div className="col-lg-12 col-12 mt-4-5 mt-0 m-0 p-0">
            <div className={(reverse == true) ? "col m-0 p-0 row d-flex flex-row-reverse" : "col m-0 p-0 row"}>
                <div className="m-0 p-0 col-lg-7 col-12 p-lg-3 pr-lg-5 pl-lg-5">
                    <img className="img img-fluid col m-0 p-0 d-lg-none d-block" 
                        width="100%" src={img} />
                    <img className="img img-fluid col m-0 p-0 d-lg-block d-none" 
                        width="100%" src={imgDesktop} />
                </div>
                <div className="col-lg-5 col m-0 p-0 text-feature pr-feature-kenalan 
                    pl-feature-kenalan d-flex align-items-center">
                    <div className={(reverse == true) ? "m-0 p-0 text-left" : "m-0 p-0"}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}