import { DetailTaskModel } from "../../../models/colaboration/task/detail-task-model";

export class DetailTaskBuilder {
    public static jsonParse(json: string): DetailTaskModel {
        return JSON.parse(json);
    }

    public static jsonStringify(value: DetailTaskModel): string {
        return JSON.stringify(value);
    }
}
