import Cookies from "universal-cookie";
import { AddProject_EndPoints } from "../../../endpoints/endpoints";
import { AddProjectModel } from "../../../models/colaboration/project/AddProjectModel";

export const requestAddProject = async (token, data: AddProjectModel) => {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }

    let body = JSON.stringify({
        'title' : data.title,
        'color' : data.color,
        'useLogo' : data.useLogo,
        'pic' : data.pic
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(AddProject_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};