import { GetListSosmed_EndPoints } from "../../endpoints/endpoints";
import { StatusSosmedBuilder } from "../../model-builder/sosmed/status-sosmed-builder";
import { StatusSosmedModel } from "../../models/sosmed/status-sosmed-model";

export async function getListSosmedStatus(completion: (list: StatusSosmedModel[]) => void) {

    var list: StatusSosmedModel[] = []

    let request = await fetch(GetListSosmed_EndPoints, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    
    var response = await request.json()

    var arrayDummy: object[] = []

    for (let index = 0; index < 10; index++) {
        arrayDummy.push({
            "id": "21003c2ef58755e0adaacee3fa75b06c",
            "avatar": "/images/status-sosmed/example-avatar.png",
            "date": "3 Februari 2021",
            "name": "Michael Jackson",
            "textPost": "Saat ini, green jobs merupakan suatu yang keharusan yang harus dijalankan setiap perusahaan maupun pekerja. Mengapa demikian? Saat ini, green jobs merupakan suatu yang keharusan yang harus dijalankan setiap perusahaan maupun pekerja. Mengapa demikian?",
            "imagePost": "/images/status-sosmed/example-image-post.png",
            "commented": 38,
            "loved": 218,
            "isLoved": true,
            "userId": "21003C2EF58755E0ADAACEE3FA75B06C"
        })
    }

    completion(list)
}