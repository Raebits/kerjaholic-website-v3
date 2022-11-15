
import { UpdateProfileBiodata_EndPoints } from "../../endpoints/endpoints";
import { FormDataProfileBiodataModel } from "../../models/profile/formdata-profile-biodata-model";

export const requestUpdateProfileBiodata = async (data: FormDataProfileBiodataModel) => {

    let token =localStorage.getItem("token");

    let body = JSON.stringify({
        freelanceName: data.freelanceName,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
        birthPlace: data.birthPlace,
        birthDate: data.birthDate,
        dbBirthDate: data.dbBirthDate,
        maritalStatus: data.maritalStatus,
        medsos: data.medsos,
        aboutMe: data.aboutMe,
        language: data.language,
        pic: data.pic,
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(UpdateProfileBiodata_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};