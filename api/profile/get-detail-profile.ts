import { GetDetailProfile_EndPoints } from "../../endpoints/endpoints";
import { ProfileDetailBuilder } from "../../model-builder/profile/profile-detail-builder";
import { ProfileDetailModel } from "../../models/profile/profile-detail-model";

export async function getDetailProfile_json(ID: string) {

    let body = JSON.stringify({
        userId: ID
    })

    let request = await fetch(GetDetailProfile_EndPoints, {
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

export async function getDetailProfile_with(ID: string, completion: (data: ProfileDetailModel) => void) {

    let body = JSON.stringify({
        userId: ID
    })

    let request = await fetch(GetDetailProfile_EndPoints, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    });
    
    var response = await request.json()
    
    if (response) {
        if (!response.error) {
            completion(ProfileDetailBuilder.toProfileDetailModel(JSON.stringify(response)))
        }
    }
}
