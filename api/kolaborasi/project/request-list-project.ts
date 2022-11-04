import Cookies from "universal-cookie";
import { GetListProject_EndPoints } from "../../../endpoints/endpoints";

export const requestListProject = async (token, lastPage,take,keyword,sorting) => {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }

    let body = JSON.stringify({
        'lastPage' : lastPage,
        'take' : take,
        'keyword' : keyword,
        'sorting' : sorting
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(GetListProject_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};