import { useRouter } from "next/router"
import React from "react"
import LoginModalProps from "../../types/auth/login-modal-props"
import AppAuthContext from "../../utils/context/auth-context"

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

export default function LoginModal({ showed }: LoginModalProps): JSX.Element {
    const {isAuth, setAuth} = React.useContext(AppAuthContext)
    const router = useRouter()
    const ref = React.useRef();

    useOnClickOutside(ref, () => setAuth(false));
    return (
        <>

        {/* <div className = {`${!isAuth ? 'scale-0' : 'scale-100'} bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/> */}
        {isAuth && (
            <div className = {`bg-gray-600 bg-opacity-60 transition transform  duration-50 w-full fixed top-0 flex justify-center h-screen items-center z-40`}/>
        )}
        <div className = {`${!isAuth ? '-translate-y-full' : 'translate-y-0'} bg-opacity-60 transition transform ease-in-out duration-1000 w-full fixed top-0 flex justify-center h-screen items-center z-40`}>
            <div ref={ref} className =  "flex flex-col px-5 py-3 bg-white w-full mx-2 sm:mx-0 sm:w-2/3 lg:w-1/3 z-50">

                {/* title */}
                <div className = "text-3xl mb-4 flex items-center justify-center"> Masuk</div>
                {/* username / email */}
                <input type="text" onChange = {() => {}} id="disabled-input" aria-label="disabled input" className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 " value="Email"/>
                {/* password  */}
                <input type="text" onChange = {() => {}} id="disabled-input-2" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 " value="Password"/>
                {/* lupa kata sandi  */}
                <div className = "flex my-3 px-1">Lupa Kata Sandi ? <p className = "text-red-600 mx-1">Ya</p></div>
                {/* tombol login manual */}
                <div className = "bg-red-600 p-3 rounded-lg flex justify-center text-white">Masuk</div>
                {/* tombol login google  */}
                <div className  = "bg-white border border-gray-400 p-3 rounded-lg flex justify-center mt-3">Lanjutkan dengan Google</div>
                {/* belum memiliki akun  */}
                <div className = "flex my-5">Belum Memiliki AKun <p className = "text-red-600 mx-1">Daftar</p></div>
            </div>
        </div>
        </>
    )
}
  