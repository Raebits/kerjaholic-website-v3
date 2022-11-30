
export class AddTaskModel {
    projectId :string = ""
    taskId :string = "-"
    title :string = ""
    description :string = ""
    assignment :any = []
    reminder :string = ""
    reminderDate :string = ""
    reminderTime :string = ""
    progress :string = "new"
    isReminder :number = 0
    isAlarm :number = 0
    reminderType :number = 1
    priority :string = '1'

}