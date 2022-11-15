import { PictureProfileModel } from "./picture-profile-model";

export class ProfileBiodataModel {
    freelanceName: string  = "";
    pic:           PictureProfileModel[] = [];
    height:        number  = 0;
    weight:        number  = 0;
    gender:        string  = "";
    birthPlace:    string  = "";
    birthDate:     string  = "";
    dbBirthDate:   string  = "";
    maritalStatus: string  = "";
    medsos:        string  = "";
    aboutMe:       string  = "";
    language:      string  = "";
}