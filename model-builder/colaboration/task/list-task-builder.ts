import { ListTaskModel } from "../../../models/colaboration/task/list-task-model";

export class ListTaskBuilder {
    public static jsonParse(json: string): ListTaskModel[] {
        return JSON.parse(json);
    }

    public static jsonStringify(value: ListTaskModel[]): string {
        return JSON.stringify(value);
    }
}
