import Cookies from "universal-cookie";
import { AddTask_EndPoints } from "../../../endpoints/endpoints";
import { AddTaskModel } from "../../../models/colaboration/task/add-task-model";

export async function requestAddTask(token:string, data: AddTaskModel) {

    if(token === '-'){
        //client request
        token = new Cookies().get("token")
    }
    
    let body = JSON.stringify({
        projectId: data.projectId,
        taskId : data.taskId,
        title : data.title,
        description : data.description,
        assignment : data.assignment,
        reminder : data.reminderDate+" "+data.reminderTime,
        progress : data.progress,
        isReminder : data.isReminder,
        isAlarm : data.isAlarm,
        reminderType : data.reminderType
    })
    
    let request = await fetch(AddTask_EndPoints, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: body
    });
    
    var response = await request.json()
    
    return response
}