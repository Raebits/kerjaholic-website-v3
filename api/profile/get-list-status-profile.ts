import { GetListStatusProfile_EndPoints } from "../../endpoints/endpoints";
import { ProfileDetailBuilder } from "../../model-builder/profile/profile-detail-builder";
import { StatusSosmedBuilder } from "../../model-builder/sosmed/status-sosmed-builder";
import { ProfileDetailModel } from "../../models/profile/profile-detail-model";
import { StatusSosmedModel } from "../../models/sosmed/status-sosmed-model";
import { ProfileRoleType } from "../../types/profile/profile-role-enum";

export async function getListStatusProfile(ID: string, completion: (data: StatusSosmedModel[]) => void) {

    let body = JSON.stringify({
        userId: ID
    })

    let request = await fetch(GetListStatusProfile_EndPoints, {
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
            let data = StatusSosmedBuilder.toStatusSosmedModel(JSON.stringify(response))
            completion(data)
        }
    }
}