import { ProfileTestimoniModel } from "../../models/profile/profile-testimoni-model";

export class ProfileTestimoniBuilder {
    public static toTestimoniProfileModel(json: string): ProfileTestimoniModel[] {
        return JSON.parse(json);
    }

    public static testimoniProfileModelToJson(value: ProfileTestimoniModel[]): string {
        return JSON.stringify(value);
    }
}