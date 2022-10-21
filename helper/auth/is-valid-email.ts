export function isValidEmail(value: string) 
{
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (value.match(mailformat)) {
        return true
    }
    
    return false
}