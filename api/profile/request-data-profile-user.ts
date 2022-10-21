import { DataProfileUser_EndPoints } from "../../endpoints/endpoints";

export const requestDataProfileUser = async (token?: string, deviceToken?: string) => {

    let body = JSON.stringify({
        deviceToken: deviceToken,
        platform: 'web'
    })

    let tokenUser = (token) ? token : localStorage.getItem("token");

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenUser
    }

    let request = await fetch(DataProfileUser_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};