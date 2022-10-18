import { GetDetailJob_EndPoints } from "../../endpoints/endpoints";
import { JobDetailBuilder } from "../../model-builder/job/job-detail-builder";
import { JobDetailModel } from "../../models/job/job-detail-model";

export async function getDetailJob(ID: string, lang: string, completion: (data: JobDetailModel) => void) {

    let body = JSON.stringify({
        jobId: ID,
        lang: lang
    })

    let request = await fetch(GetDetailJob_EndPoints, {
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
            const JobDetailModel = JobDetailBuilder.toJobDetailModel(JSON.stringify(response));
            completion(JobDetailModel)
        }
    }
}

export async function getDetailJob_json(ID: string, lang: string) {

    let body = JSON.stringify({
        jobId: ID,
        lang: lang
    })

    let request = await fetch(GetDetailJob_EndPoints, {
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