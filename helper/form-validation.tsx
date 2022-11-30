export const validate = (model: object, validation?: string[], logger?:boolean): boolean => {
    var isEmpty: boolean = false
    var emptyField = []
    var arrayKey: string[] = Object.keys(model);
    if(!validation){
        validation =   Object.keys(model) // all
    }
    validation.forEach(key => {
        if ((model[key] == "" || model[key] == null) && !(typeof(model[key]) == "boolean") && !(typeof(model[key]) == "number")) {
            isEmpty = true
            emptyField.push(key)
        }
    })
    if(logger){
        console.log(model,'state data')
        console.log(emptyField,'empty field detected')
    }
    return !isEmpty
}