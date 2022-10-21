import { FormDataProfileCVModel } from "../../models/profile/formdata-profile-cv-model";
import { UpdateProfileCV_EndPoints } from "../endpoints";

export const requestUpdateProfileCV = async (data: FormDataProfileCVModel) => {

    let token =localStorage.getItem("token");

    let body = JSON.stringify({
        profilePic: data.profilePic,
        statusVerify: data.statusVerify,
        aboutMe: data.aboutMe,
        email: data.email,
        phone: data.phone,
        skill: data.skill,
        expectedSalary: data.expectedSalary,
        lastEdu: data.lastEdu,
        pkPosition: (data.pkPosition.length == 0)? "-" : data.pkPosition.join(","),
        pkYear: (data.pkYear.length == 0)? "-" : data.pkYear.join(","),
        pkCompany: (data.pkCompany.length == 0)? "-" : data.pkCompany.join(",")
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(UpdateProfileCV_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};