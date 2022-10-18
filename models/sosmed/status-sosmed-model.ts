import { StatusInterface } from "../../interface/status-interface";

export class StatusSosmedModel implements StatusInterface {
    feedId:      string;

    userName:    string;
    pic:         string;
    userId:      string;
    postDate:    Date;
    feedContent: string;
    feedMedia:   string;
    likes:       number;
    comments:    number;
    inPostDate:  string;
    enPostDate:  string;
    isLoved:     boolean;
}