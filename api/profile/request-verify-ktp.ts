import axios from "axios";
import { FormDataKTPModel } from "../../models/profile/formdata-profile-ktp";
import { VerifyKTP_EndPoints } from "../../endpoints/endpoints";

export const requestVerifyKTP = async (data: FormDataKTPModel, progress: (val: number) => void) => {

    let token =localStorage.getItem("token");

    let body = new FormData();
    body.append("idNumber", data.idNumber.toString());
    body.append("ktpName", data.ktpName);
    body.append("idPhoto", data.idPhoto);
    body.append("selfPhoto", data.selfPhoto);

    let options = {
        onUploadProgress: (progressEvent: any) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            progress(percent);
        },
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + token
        }
    }

    let response = await axios.post(VerifyKTP_EndPoints, body, options)

    return response
};