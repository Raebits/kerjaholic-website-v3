import { useRouter } from "next/router"
import React from "react"
import MiniProfileProps from "../../types/profile/mini-profile-props";
import AppAuthContext from "../../utils/context/auth-context";
import Cookies from 'universal-cookie';
import { requestUserLogout } from "../../api/profile/request-user-logout";
import { useGoogleLogout, GoogleLogout } from 'react-google-login'
import { useOnClickOutside } from "../../helper/click-outside";

export default function MiniProfile({ showed, setShowed, loading }: MiniProfileProps): JSX.Element {
    const router = useRouter()
    const ref = React.useRef();
    const [logoutLoading, setLogoutLoading] = React.useState<boolean>(false)
    const [avatar, setAvatar] = React.useState<string>('-')
    const [username, setUsername] = React.useState<string>('-')
    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const cookies = new Cookies();

    React.useEffect(() => {
        setAvatar(localStorage.getItem("avatar"))
        setUsername(localStorage.getItem("username"))
    })
    async function logout() {

        // await firebase.auth().signOut();
        await setLogoutLoading(true)
        await requestUserLogout()

        setAuth(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("avatar");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");

        cookies.remove("auth", { path: '/' });
        cookies.remove("token", { path: '/' });
        cookies.remove("userId", { path: '/' });
        await setShowed(false)
        await setLogoutLoading(false)
        
        await router.push('/');
    };

    useOnClickOutside(ref, () => setShowed(false));


    return (
        <>

        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {/* {showed && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )} */}
        <div className = {`${!showed ? '-translate-y-full' : 'translate-y-1/4'} w-96 transition transform ease-in-out duration-500 fixed top-0 right-6 flex justify-center z-50`}>
            <div ref={ref} className =  {`flex flex-col px-5 py-3 bg-white dark:bg-[#0F172A] border border-gray-300 ${showed && 'shadow-xl'} w-full z-50 rounded-lg`}>

                <div className = "flex space-x-3 items-center px-3">
                    <div className = "flex-none flex justify-center">
                        <div className="w-14 ">
                            <img src={avatar !== '-' ? avatar : "./images/loading-people.svg"} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                        </div>
                    </div>
                    <div className = "flex flex-col">
                        <div className = "text-md text-black dark:text-white">Profil Anda</div>
                        <div className = "text-sm md:text-md text-black dark:text-white">{username}</div>
                    </div>
                </div>
                <hr className = "mt-3"/>
                <div className="flex my-1 py-3 hover:bg-[#FF0000] hover:text-white rounded-lg">
                    <img className = "px-3" src="../icons/ic_bell.svg"/>
                    <div className = "block text-black dark:text-white">Indonesia | English</div>
                </div>
                <div className="flex my-1 py-3 hover:bg-[#FF0000] hover:text-white rounded-lg">
                    <img className = "px-3" src="../icons/ic_bell.svg"/>
                    <div className = "block text-black dark:text-white ">Pengaturan</div>
                </div>
                <GoogleLogout
                    clientId="17773254584-tv67vbs94kln4jvsj86q4setb5ee0uc5.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    render={renderProps => (
                        <div onClick={renderProps.onClick} className="flex my-1 py-3 bg-[#FF0000] text-white rounded-lg">
                             <img className = "px-3 h-6 w-auto" src="../icons/ic_logout.svg"/>
                            <div className = "block ">{!logoutLoading ? 'Keluar' : 'Loading . . .'}</div>
                         </div>
                     )} 
                    >
                </GoogleLogout>
                {/* <div onClick = {() => logout()} className="flex my-1 py-3 bg-[#FF0000] text-white rounded-lg">
                    <img className = "px-3 h-6 w-auto" src="./images/logout.svg"/>
                    <div className = "block ">{!logoutLoading ? 'Keluar' : 'Loading . . .'}</div>
                </div> */}
            </div>
        </div>
        </>
    )
}
  