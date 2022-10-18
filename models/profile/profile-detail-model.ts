import { ExperienceProfileModel } from "./profile-experience-model";
import { StudyProfileModel } from "./profile-study-model";

export class ProfileDetailModel {
    pic:          string;
    metaImage:    string;
    name:         string;
    friend:       number;
    cityId:       number;
    city:         string;
    aboutMe:      string;
    study:        StudyProfileModel[];
    experience:   ExperienceProfileModel[];
    status:       string;
    friendshipId: string;
    cert:         any[];
    postFeed:     number;
    postLike:     number;
    postComment:  number;

    constructor() {
        
    }
}