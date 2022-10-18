import { StatusInterface } from "../../interface/status-interface";
import { CommentSosmedModel } from "./comment-sosmed-model";

export class DetailStatusSosmedModel implements StatusInterface {
    userName:    string;
    pic:         string;
    metaImage:   string;
    userId:      string;
    postDate:    Date;
    feedContent: string;
    feedMedia:   string;
    likes:       number;
    comments:    number;
    inPostDate:  string;
    enPostDate:  string;

    isLoved:    boolean;
    
    comment:     CommentSosmedModel[];
}