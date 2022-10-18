export function capitalizeFirstWords(value: string): string {
    if (value == undefined) {
        return
    }
    let lowCase = value.toLowerCase();
    var array: string[] = lowCase.split(" ")
    var newArray: string[] = []
    array.forEach(element => {
        newArray.push(element.charAt(0).toUpperCase() + element.slice(1))
    });
    return newArray.join(" ")
}