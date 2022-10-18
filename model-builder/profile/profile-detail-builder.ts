import { ProfileDetailModel } from "../../models/profile/profile-detail-model";

export class ProfileDetailBuilder {
    public static toProfileDetailModel(json: string): ProfileDetailModel {
        return JSON.parse(json);
    }

    public static profileDetailModelToJson(value: ProfileDetailModel): string {
        return JSON.stringify(value);
    }
}
