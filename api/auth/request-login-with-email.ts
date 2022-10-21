import { LoginEmail_EndPoints } from "../../endpoints/endpoints";

export const requestLoginWithEmail = async (email: string, password: string) => {

    let body = JSON.stringify({
        email: (email == "") ? "-" : email,
        password: (password == "") ? "-" : password
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    let request = await fetch(LoginEmail_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};