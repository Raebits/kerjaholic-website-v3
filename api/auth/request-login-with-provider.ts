import { ProviderAuthType } from "../../enum/auth/provider-auth-type";
import { UserRegisterProvider } from "../../models/auth/user-register-provider";
import { AuthWithProvider_EndPoints } from "../../endpoints/endpoints";

export const requestLoginWithProvider = async (type: ProviderAuthType, idTokenProvider: string, user: UserRegisterProvider) => {

    let body = JSON.stringify({
        userName: user.firebaseUser.displayName,
        userEmail: user.firebaseUser.email,
        userPhoto: user.firebaseUser.photoURL,
        userProvider: type,
        userUid: user.firebaseUser.uid,
        userPhone: user.phoneNumber,
        userToken: idTokenProvider,
        userDevice: '',
        userDate: user.dateBirth,
        userGender: user.gender,
        userStatus: user.status,
        referalSender: '-',
        status: '1',
        category: '-',
        preferAddress: '-',
        preferLat: '0',
        preferLng: '0',
        deviceId: '-',
        profileType: user.role,
        companyName: '-',
        phoneActivated: '0',
        deviceType: 'web',
        domisile: user.domisile,
        username: user.username
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    let request = await fetch(AuthWithProvider_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });

    var response = await request.json()

    return response
}