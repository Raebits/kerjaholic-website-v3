import { ReactionToArticle_EndPoints } from "../../endpoints/endpoints";

export async function requestReactionToArticle(slug: string, userId: string) {

    let body = JSON.stringify({
        slug: slug,
        userId: userId,
        reaction: "thumbUp"
    })
    
    let request = await fetch(ReactionToArticle_EndPoints, {
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