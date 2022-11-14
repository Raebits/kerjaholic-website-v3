import { TaskAssignmentModel } from "./task-assignment-model";

export class ListTaskModel {

    id                  ?:string;
    title               ?:string;
    description         ?:string; 
    status              ?:string;
    isReminder          ?:number;
    isAlarm             ?:number;
    reminder            ?:string;
    reminderKey         ?:string;
    progress            ?:string;
    priority            ?:string;
    grTaskTotalMessage  ?:number;
    grTaskLastMessage   ?:string;
    grTaskLastActivity  ?:string;
    created_at          ?:string;
    reminderPart        ?:number;
    picture             ?:string;
    taskMessageUnread   ?:number;
    isAssigned          ?:number;
    taskAssignment      :TaskAssignmentModel[];
    reminderDate        ?:string;
    statusStr           ?:string;
    dotReminder         ?:number;
}