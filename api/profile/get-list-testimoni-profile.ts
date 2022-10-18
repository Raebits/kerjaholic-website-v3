import { GetListTestimoniProfile_EndPoints } from "../../endpoints/endpoints";
import { ProfileTestimoniBuilder } from "../../model-builder/profile/testimonial-builder";
import { ProfileTestimoniModel } from "../../models/profile/profile-testimoni-model";

export async function getListTestimoniProfile(ID: string, completion: (data: ProfileTestimoniModel[]) => void) {

    let body = JSON.stringify({
        testiTo: ID
    })

    let request = await fetch(GetListTestimoniProfile_EndPoints, {
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
            let data =  ProfileTestimoniBuilder.toTestimoniProfileModel(JSON.stringify(response))
            completion(data)
        }
    }
}