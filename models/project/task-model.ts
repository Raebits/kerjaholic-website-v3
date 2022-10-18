
import {TaskAssignmentModel} from "./task-assignment-model";

export interface TaskModel {
    id:          string;
    title:      string;
    status:      string;
    statusStr: string;
    progress:       string;
    priority: string;
    created_at:        string;
    taskAssignment:     TaskAssignmentModel[];
    reminderDate: string;
    picture: string;
}