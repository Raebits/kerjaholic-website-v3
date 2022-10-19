import { GetAllArticle_EndPoints } from "../../endpoints/endpoints";

export async function getAllArticle_json(lastPage: number, take: number, searchWord: string) {

    let body = JSON.stringify({
        // slug: slug,
        // userId: (userId == null) ? "-" : userId
        lastPage: lastPage,
        take: take,
        searchWord: searchWord
    })
    let request = await fetch(GetAllArticle_EndPoints, {
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