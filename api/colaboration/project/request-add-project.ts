import Cookies from "universal-cookie";
import { AddProject_EndPoints } from "../../../endpoints/endpoints";
import { AddProjectModel } from "../../../models/colaboration/project/add-project-model";

export const requestAddProject = async (token, data: AddProjectModel) => {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }


    let body = new FormData();
    body.append("title", data.title);
    body.append("color", data.color);
    body.append("useLogo", data.useLogo.toString());
    body.append("pic", data.pic);
    console.log(body)
    let headers = {
        // "Content-Type": "multipart/form-data",
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