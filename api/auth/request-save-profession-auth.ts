import { SaveProfessionAuth_EndPoints } from "../../endpoints/endpoints";

export const requestSaveProfessionAuth = async (categoryID: number, profession: string) => {

    let body = JSON.stringify({
        category: categoryID,
        profession: profession,
    })

    let token = localStorage.getItem("token");

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(SaveProfessionAuth_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};