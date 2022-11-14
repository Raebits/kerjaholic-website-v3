import { DetailProjectModel } from "../../../models/colaboration/project/detail-project-model";

export class DetailProjectBuilder {
    public static jsonParse(json: string): DetailProjectModel {
        return JSON.parse(json);
    }

    public static jsonStringify(value: DetailProjectModel): string {
        return JSON.stringify(value);
    }
}
