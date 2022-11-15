import { ProfileFreelance_EndPoints } from "../../endpoints/endpoints";

export const requestProfileFreelance = async () => {

    let userId = localStorage.getItem('userId');
    let token =localStorage.getItem("token");

    let body = JSON.stringify({
        userId: userId
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }

    let request = await fetch(ProfileFreelance_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};