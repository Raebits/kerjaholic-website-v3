
export class ActionSosmedCommentModel {

    public id: string;   
    public like: number;
    public dislike: number;

    constructor(data: object) {
        this.id = data["id"]
        this.like = data["like"]
        this.dislike = data["dislike"]
    }
}