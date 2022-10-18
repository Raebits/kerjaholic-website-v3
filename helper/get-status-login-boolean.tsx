import Cookies from "universal-cookie";

export const getStatusLogin = (cookies?: Cookies)=> {
    var isLogin = "false"
    
    if (cookies == null) {
        isLogin = localStorage.getItem("isLogin")
    } else {
        isLogin = cookies.get("isLogin");
    }

    if (isLogin == "true") {
        return true
    } else {
        return false
    }
}