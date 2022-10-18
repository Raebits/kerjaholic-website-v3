export const selectionPropsResponse = (statusLogin: boolean, idProfile?: string): boolean => {

    if (statusLogin == false && idProfile != null) { // login FALSE, /profil?id=----
        return true
    } else if (statusLogin == true && idProfile == null) { // login TRUE, /profil
        return true
    } else if (statusLogin == true && idProfile != null) { // login TRUE, /profil?id=----
        return true
    } else {
        return false
    }
}