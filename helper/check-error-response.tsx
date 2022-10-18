import { ErrorData } from "../models/common/error-data-model";

export const checkValidResponse = (data: string): boolean => {

    let response = JSON.parse(data)

    if (response) {
        if (response.error) {
            return false
        } else if (response.status == "failed") {
            return false
        } else {
            return true
        }
    }
}