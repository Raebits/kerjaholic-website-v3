import { ColaboratorModel } from "../colaborator/colaborator-model";
import {ListTaskModel} from "../task/list-task-model";

export class DetailProjectModel {

    projectCreator: string
    projectId?: string
    totalMessage : number
    projectLogo: string
    title: string
    colorId : number
    color : number
    status: string
    messageUnread: number
    totalAll: number
    totalNew: number
    totalProgress: number
    totalPostponed: number
    totalDone: number
    totalInit: number
    myRole: string
    colaborator: ColaboratorModel[]
    task: ListTaskModel[]
    
}