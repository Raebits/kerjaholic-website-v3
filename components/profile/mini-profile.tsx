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
                <div className="flex my-1 py-3 hover:bg-[#FF0000] dark:hover:bg-white text-black hover:text-white dark:text-white hover:dark:text-black rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>

                    <div className = "block">Notfikasi</div>
                </div>
                <div className="flex my-1 py-3 hover:bg-[#FF0000] dark:hover:bg-white text-black hover:text-white dark:text-white hover:dark:text-black rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <div className = "block ">Pengaturan</div>
                </div>
                <GoogleLogout
                    clientId="17773254584-tv67vbs94kln4jvsj86q4setb5ee0uc5.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={logout}
                    render={renderProps => (
                        <div onClick={renderProps.onClick} className="flex my-1 py-3 bg-[#FF0000] dark:bg-white text-white dark:text-black rounded-lg">                         
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
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
  