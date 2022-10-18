import { StatusSosmedModel } from "../../models/sosmed/status-sosmed-model";

export class StatusSosmedBuilder {
    public static toStatusSosmedModel(json: string): StatusSosmedModel[] {
        return JSON.parse(json);
    }

    public static statusSosmedModelToJson(value: StatusSosmedModel[]): string {
        return JSON.stringify(value);
    }
}
