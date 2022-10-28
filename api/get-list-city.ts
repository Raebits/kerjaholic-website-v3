import { GetListCity_EndPoints } from "../endpoints/endpoints";

export async function getCity_json(keyword: string) {

    let body = JSON.stringify({
        keyword: keyword
    })
    let request = await fetch(GetListCity_EndPoints, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    });
    
    var response = await request.json()

    return response
}