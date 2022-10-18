import { GetDetailProject_EndPoints } from "../../endpoints/endpoints";

export async function getDetailProject_json(slug: string, userId?: string, taskStatus?: string, taskSorting?: string) {

    let body = JSON.stringify({
        slug: slug,
        userId: (userId == null) ? "-" : userId,
        colaboratorLimit : 10,
        taskStatus: taskStatus,
        taskSorting: taskSorting
    })
    
    let request = await fetch(GetDetailProject_EndPoints, {
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