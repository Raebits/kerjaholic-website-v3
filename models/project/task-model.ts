
import {TaskAssignmentModel} from "./task-assignment-model";

export interface TaskModel {
    id?:          string;
    title?:      string;
    status?:      string;
    isReminder?: number;
    isAlarm?: number;
    reminder?: string;
    reminderKey?: string;
    grTaskTotalMessage?: number
    grTaskLastMessage?: number
    grTaskLastActivity?: number
    statusStr?: string;
    progress?:       string;
    priority?: string;
    created_at?:        string;
    taskAssignment?:     TaskAssignmentModel[];
    reminderDate?: string;
    picture?: string;
    reminderPart?: number
    isAssigned?: number
    
}