import { ListProjectModel } from "../../../models/colaboration/project/list-project-model";

export class ListProjectBuilder {
    public static jsonParse(json: string): ListProjectModel[] {
        return JSON.parse(json);
    }

    public static jsonStringify(value: ListProjectModel[]): string {
        return JSON.stringify(value);
    }
}
