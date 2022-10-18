import { GetDetailSosmed_EndPoints } from "../../endpoints/endpoints";

export async function getDetailSosmedStatus_json(ID: string) {

    let body = JSON.stringify({
        feedId: ID
    })
    
    let request = await fetch(GetDetailSosmed_EndPoints, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    });
    
    var response = await request.json()

    return response
}