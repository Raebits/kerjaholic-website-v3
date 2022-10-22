import { UserCheckAuth_EndPoints } from "../../endpoints/endpoints";
import Cookies from "universal-cookie";
export const requestCheckToken = async (token:string) => {

    const cookies = new Cookies();

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(UserCheckAuth_EndPoints, {
        method: 'GET',
        headers: headers
    });
    
    var response = await request.json()

    return response
};