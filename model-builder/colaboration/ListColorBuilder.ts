import { ListColorModel } from "../../models/colaboration/ListColorModel";

export class ListColorBuilder {
    public static jsonParse(json: string): ListColorModel[] {
        return JSON.parse(json);
    }

    public static jsonStringify(value: ListColorModel[]): string {
        return JSON.stringify(value);
    }
}
