
import { TaskAssignmentModel } from "./task-assignment-model";

export class DetailTaskModel {
    projectId?:          string;
    progress?:       string;
    priority?: string;
    creator?: string;
    title?:      string;
    description?: string;
    isReminder?: number;
    isAlarm?: number;
    reminder?: string;
    reminderKey?: string;
    reminderType?: number;
    progress_changed_at?: string;
    progress_changed_by?: string;
    reminderDate?: string;
    accessRole?: string;
    isAssign?: number
    reminderTypeName?: string;
    progress_changed_by_name?: string;
    projectName?: string;
    taskAssignment?:     TaskAssignmentModel[];
    
}
