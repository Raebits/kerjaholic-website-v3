import Cookies from "universal-cookie";
import { GetListTask_EndPoints } from "../../../endpoints/endpoints";

export const requestListtask = async (token, projectId,status,keyword,sorting) => {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }

    let body = JSON.stringify({
        'projectId' : projectId,
        'taskStatus' : status,
        'taskSearch' : keyword,
        'taskSorting' : sorting
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(GetListTask_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};