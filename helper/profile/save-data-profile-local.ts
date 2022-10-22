import Cookies from "universal-cookie";

export function saveDataProfileLocal(data: any, token: string) {
    const cookies = new Cookies();

    localStorage.setItem('auth', "true");
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', data.userName);
    localStorage.setItem('avatar', data.userPhoto);

    cookies.set("auth", "true", { path: '/', secure: true });
    cookies.set("token", token, { path: '/', secure: true });
    cookies.set("userId", data.userId, { path: '/', secure: true });
}