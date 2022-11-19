import Cookies from "universal-cookie";
import { GetDetailTask_EndPoints } from "../../../endpoints/endpoints";

export async function requestDetailTask( token:string, projectSlug: string, taskSlug: string) {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }
    
    let body = JSON.stringify({
        projectId: projectSlug,
        taskId : taskSlug
    })
    
    let request = await fetch(GetDetailTask_EndPoints, {
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