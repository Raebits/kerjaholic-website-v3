import { GetDetailArticle_EndPoints } from "../../endpoints/endpoints";

export async function getDetailArticle_json(slug: string, userId?: string) {

    let body = JSON.stringify({
        slug: slug,
        userId: (userId == null) ? "-" : userId
    })
    
    let request = await fetch(GetDetailArticle_EndPoints, {
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