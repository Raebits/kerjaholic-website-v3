import Cookies from "universal-cookie";
import { GetDetailProject_EndPoints } from "../../../endpoints/endpoints";

export async function requestDetailProject( token:string, slug: string, taskStatus?: string, colaboratorLimit?: number) {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }
    
    let body = JSON.stringify({
        projectId: slug,
        colaboratorLimit : colaboratorLimit,
        taskStatus: taskStatus,
    })
    
    let request = await fetch(GetDetailProject_EndPoints, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: body
    });
    
    var response = await request.json()
    
    return response
}