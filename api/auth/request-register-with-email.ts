import { UserRegisterEmail } from "../../models/auth/user-register-email";
import { RegisterEmail_EndPoints } from "../../endpoints/endpoints";

export const requestRegisterWithEmail = async (user: UserRegisterEmail) => {

    let body = JSON.stringify({
        email: user.email,
        password: user.password,
        deviceToken: '-',
        phoneNumber: user.phoneNumber,
        displayName: user.displayName,
        gender: user.gender,
        birthday: user.dateBirth,
        referalSender: '-',
        status: '1',
        category: '-',
        preferAddress: '',
        preferLat: '0',
        preferLng: '0',
        deviceId: '0',
        profileType: user.role,
        companyName: '-',
        phoneActivated: '0',
        deviceType: 'web',
        username: user.username,
        userName: user.userName,
        domisile: user.domisile
    })

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    let request = await fetch(RegisterEmail_EndPoints, {
        method: 'POST',
        headers: headers,
        body: body
    });

    var response = await request.json()

    return response
}