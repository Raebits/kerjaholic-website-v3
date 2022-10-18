import { GetArticles_EndPoints } from "../../endpoints/endpoints";
import { ArticleBuilder } from "../../model-builder/article/article-builder";
import { ArticleModel } from "../../models/article/article-model";

export async function getArticles(completion: (list: ArticleModel[]) => void) {

    let request = await fetch(GetArticles_EndPoints, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    
    var response = await request.json()

    let Promotions_And_Updates = response["Promotions_And_Updates"]

    let list: ArticleModel[] = ArticleBuilder.toArticleModel(JSON.stringify(Promotions_And_Updates))

    completion(list)
}
  
  