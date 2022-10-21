export const checkDataModelEmpty = (model: object): boolean => {
    var isEmpty: boolean = false

    var arrayKey: string[] = Object.keys(model);
    
    arrayKey.forEach(key => {
        if ((model[key] == "" || model[key] == null) && !(typeof(model[key]) == "boolean") && !(typeof(model[key]) == "number")) {
            isEmpty = true
        }
    })

    return isEmpty
}