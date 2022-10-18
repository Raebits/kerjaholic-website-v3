import { JobDetailModel } from "../../models/job/job-detail-model";

// Converts JSON strings to/from your types
export class JobDetailBuilder {
    public static toJobDetailModel(json: string): JobDetailModel {
        return JSON.parse(json);
    }

    public static JobDetailModelToJson(value: JobDetailModel): string {
        return JSON.stringify(value);
    }
}
