import { ColaboratorModel } from "./colaborator-model";
import {TaskModel} from "./task-model";
import {FilterModel} from "./filter-model";
import { SortingModel } from "./sorting-model";

export class DetailProjectModel {

    projectId: string;
    projectCreator: string;
    projectLogo: string;
    title: string;
    projectThumbnail: string;
    totalAll: number;
    totalNew: number;
    totalProgress: number;
    totalPostponed: number;
    totalDone: number;
    colaborator:     ColaboratorModel[];
    task: TaskModel[];
    filter : FilterModel[];
    sorting: SortingModel[];
    deeplink: string;
}