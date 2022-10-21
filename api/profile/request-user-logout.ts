import Cookies from "universal-cookie";
import { UserLogout_EndPoints } from "../../endpoints/endpoints";

export const requestUserLogout = async () => {

    let token =new Cookies().get("token")

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(UserLogout_EndPoints, {
        method: 'POST',
        headers: headers
    });
    
    var response = await request.json()

    return response
};