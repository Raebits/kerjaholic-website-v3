import React from "react";

import { requestLoginWithEmail } from "../../api/auth/request-login-with-email";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { BtnLoginEmailComponentProps } from "../../types/auth/btn-login-email-component-props";

export function BtnLoginEmailComponent({ email, password, success }: BtnLoginEmailComponentProps) {


    async function onLoginWithEmail() {

        const response = await requestLoginWithEmail(email, password);

        if (response.status == 'success') {
            success(response.token)

        } else {
            
            responseErrorHandler(response, (message) => {
                console.log("message", message)
            })
        }
    };


    return (
        <div className = "bg-[#ff0000] p-3 rounded-lg flex justify-center text-white"
                onClick={() => onLoginWithEmail()}>
                MASUK
        </div>
    );
};
