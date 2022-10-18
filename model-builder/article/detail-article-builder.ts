import { DetailArticleModel } from "../../models/article/detail-article-model";

export class DetailArticleBuilder {

    public static toDetailArticleModel(json: string): DetailArticleModel {
        return JSON.parse(json);
    }

    public static detailArticleModelToJson(value: DetailArticleModel): string {
        return JSON.stringify(value);
    }
}
