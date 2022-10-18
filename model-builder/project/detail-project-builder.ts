import { DetailProjectModel } from "../../models/project/detail-project-model";

export class DetailProjectBuilder {

    public static toDetailProjectModel(json: string): DetailProjectModel {
        return JSON.parse(json);
    }

    public static detailProjectModelToJson(value: DetailProjectModel): string {
        return JSON.stringify(value);
    }
}
