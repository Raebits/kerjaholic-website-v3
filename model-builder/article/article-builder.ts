import { AnotherArticle } from "../../models/article/another-article-model";

export class ArticleBuilder {
    public static toArticleModel(json: string): AnotherArticle[] {
        return JSON.parse(json);
    }

    public static articleModelToJson(value: AnotherArticle[]): string {
        return JSON.stringify(value);
    }
}
