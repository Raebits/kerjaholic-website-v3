import { UpdateLanguage_EndPoints } from "../../endpoints/endpoints";

export const requestUpdateLanguage = async (userLang: string) => {

    let token =localStorage.getItem("token");

    let body = JSON.stringify({
        userLang: userLang
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(UpdateLanguage_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};