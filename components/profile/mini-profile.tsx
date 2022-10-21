import { useRouter } from "next/router"
import React from "react"
import MiniProfileProps from "../../types/profile/mini-profile-props";
import AppAuthContext from "../../utils/context/auth-context";
import Cookies from 'universal-cookie';
import { requestUserLogout } from "../../api/profile/request-user-logout";

// Hook
function useOnClickOutside(ref, handler) {
    React.useEffect(
        () => {
            const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
    
            handler(event);
            };
    
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
    
            return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}



export default function MiniProfile({ showed, setShowed, loading }: MiniProfileProps): JSX.Element {
    const router = useRouter()
    const ref = React.useRef();
    const [logoutLoading, setLogoutLoading] = React.useState<boolean>(false)
    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const cookies = new Cookies();

    async function logout() {

        // await firebase.auth().signOut();
        await setLogoutLoading(true)
        await requestUserLogout()

        setAuth(false);
        localStorage.clear();

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
            <div ref={ref} className =  {`flex flex-col px-5 py-3 bg-white ${showed && 'shadow-xl'} w-full z-50 rounded-lg`}>

                <div className = "flex space-x-3 items-center px-3">
                    <div className = "flex-none flex justify-center">
                        <div className="w-14 ">
                            <img src={'https://kerjaholic.s3.ap-southeast-1.amazonaws.com/images/profile/pic/d1d58f73-870d-43da-be37-ffffa7712d3c-nLSPmOVXPM1GD.jpg'} alt="profile" className="shadow rounded-full max-w-full h-auto align-middle border-none" />
                        </div>
                    </div>
                    <div className = "flex flex-col">
                        <div className = "text-md">Profil Anda</div>
                        <div className = "text-sm md:text-md">Aranda San</div>
                    </div>
                </div>
                <hr className = "mt-3"/>
                <div className="flex my-1 py-3 hover:bg-[#FF0000] hover:text-white rounded-lg">
                    <img className = "px-3" src="./images/bell.svg"/>
                    <div className = "block ">Indonesia | English</div>
                </div>
                <div className="flex my-1 py-3 hover:bg-[#FF0000] hover:text-white rounded-lg">
                    <img className = "px-3" src="./images/bell.svg"/>
                    <div className = "block ">Pengaturan</div>
                </div>
                <div onClick = {() => logout()} className="flex my-1 py-3 bg-[#FF0000] text-white rounded-lg">
                    <img className = "px-3 h-6 w-auto" src="./images/logout.svg"/>
                    <div className = "block ">{!logoutLoading ? 'Keluar' : 'Loading . . .'}</div>
                </div>
            </div>
        </div>
        </>
    )
}
  