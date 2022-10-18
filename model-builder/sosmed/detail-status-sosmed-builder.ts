import { DetailStatusSosmedModel } from "../../models/sosmed/detail-status-sosmed-model";

export class DetailStatusSosmedBuilder {

    public static toDetailStatusSosmedModel(json: string): DetailStatusSosmedModel {
        return JSON.parse(json);
    }

    public static detailStatusSosmedModelToJson(value: DetailStatusSosmedModel): string {
        return JSON.stringify(value);
    }
}
