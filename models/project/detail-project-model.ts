import { ColaboratorModel } from "./colaborator-model";
import {TaskModel} from "./task-model";
import { FilterTypes, SortingTypes} from "./detail-project-model-child";

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
    filter : FilterTypes[];
    sorting: SortingTypes[];
    deeplink: string;
}