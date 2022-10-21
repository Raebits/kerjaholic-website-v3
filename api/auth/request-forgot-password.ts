import { ForgotPassword_EndPoints } from "../endpoints";

export const requestForgotPassword = async (email: string) => {

    let body = JSON.stringify({
        email: (email == "") ? "-" : email,
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    let request = await fetch(ForgotPassword_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });
    
    var response = await request.json()

    return response
};