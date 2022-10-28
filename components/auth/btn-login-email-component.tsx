import React from "react";

import { requestLoginWithEmail } from "../../api/auth/request-login-with-email";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { BtnLoginEmailComponentProps } from "../../types/auth/btn-login-email-component-props";

export function BtnLoginEmailComponent({ email, password, success, onLoading }: BtnLoginEmailComponentProps) {


    async function onLoginWithEmail() {
        onLoading(true)
        const response = await requestLoginWithEmail(email, password);

        if (response.status == 'success') {
            success(response.token)

        } else {
            
            responseErrorHandler(response, (message) => {
                alert(message)
                onLoading(false)
            })
        }
    };


    return (
        <div className = "bg-[#ff0000] p-3 my-1 rounded-lg flex justify-center text-white"
                onClick={() => onLoginWithEmail()}>
                MASUK
        </div>
    );
};
