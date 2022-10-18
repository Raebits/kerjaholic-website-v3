import { ProfileInterface } from "../../interface/profile-interface";

export class ProfileSosmedStatusModel implements ProfileInterface {
    id: string
    avatar: string
    name: string
    date: string

    myOwn: boolean

    constructor(data: object) {
        this.id = data["id"]
        this.avatar = data["avatar"]
        this.name = data["name"]
        this.date = data["date"]
        this.myOwn = (localStorage.getItem("userId") == data["userId"]) ? true : false
    }
}