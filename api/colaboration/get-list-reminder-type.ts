import Cookies from "universal-cookie";
import { GetListReminderType_EndPoints } from "../../endpoints/endpoints";

export const getListReminderType = async (token) => {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }

    let body = JSON.stringify({})

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(GetListReminderType_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};