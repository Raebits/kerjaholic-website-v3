import { ConvertImageToBase64_EndPoints } from "../../endpoints/endpoints";

export async function ConvertImageToBase64(url: string, width: number = 100, height: number = 100) {

    let body = JSON.stringify({
        contentUrl: url,
        width: width,
        height: height
    })

    let request = await fetch(ConvertImageToBase64_EndPoints, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    });
    
    return request
}