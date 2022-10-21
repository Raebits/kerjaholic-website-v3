export const responseErrorHandler = (response, callback: (message: string) => void) => {       
    if (response.error) {
        if (response.error.message) {
            callback(response.error.message)
        } else {
            callback(response.message)
        }
    } else {
        callback(response.message)
    }
}