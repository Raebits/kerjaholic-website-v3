import firebase from "firebase";
import React from "react";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { requestLoginWithProvider } from "../../api/auth/request-login-with-provider";
import { ProviderAuthType } from "../../enum/auth/provider-auth-type";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { UserRegisterProvider } from "../../models/auth/user-register-provider";

import { BtnLoginGoogleComponentProps } from "../../types/auth/btn-login-google-component-props";

export function BtnLoginGoogleComponent( { success, notFound, className, onLoading } : BtnLoginGoogleComponentProps) {


    const [ userProvider, setUserProvider ] = React.useState<UserRegisterProvider>(new UserRegisterProvider());

    function initOnAuthStateChanged() {
        firebase.auth().signOut();
        // - Listened from state change
        firebase.auth().onAuthStateChanged(function (user) {
            onLoading(true)
            if (user) {
                user.getIdToken().then(function (idToken) {
                    requestLogin(idToken, user);
                });
            }else{
                onLoading(false)
            }
        });
    }

    async function requestLogin(idToken: string, user: firebase.User) {
        const requestSignIn =  await requestLoginWithProvider(ProviderAuthType.google, idToken, { ...userProvider, firebaseUser: user})

        if (requestSignIn.status == 'success') {

            // Next -> get data profile user 
            success(requestSignIn.token)

        } else {
            if (requestSignIn.status === 'notFound') {
                onLoading(false)
                notFound(user, idToken);
                console.log('redirect to register page')
            } else {
                responseErrorHandler(requestSignIn, (message) => {
                    onLoading(false)
                    alert(message)
                })
            }
        }
    }

    async function handleSuccess(data: GoogleLoginResponse | GoogleLoginResponseOffline) {

        // init Auth State Changed
        initOnAuthStateChanged()
        let googleUser = data as GoogleLoginResponse
        if (googleUser) {
            var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);

            var requestSignIn = await firebase.auth().signInWithCredential(credential)

            setUserProvider({ ...userProvider, firebaseUser: requestSignIn.user});
        }
    };

    function handleFailure(error: any) {

    };

    return (
        <div onClick = {() => onLoading(true)}>
            <GoogleLogin
                clientId="17773254584-tv67vbs94kln4jvsj86q4setb5ee0uc5.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={(data) => handleSuccess(data)}
                onFailure={(error) => handleFailure(error)}
                render={renderProps => (
                   <div onClick={renderProps.onClick} className = "bg-white border border-gray-500 p-3 my-1 rounded-lg flex justify-center text-white">
                        <img src="/icons/ic_google.png" width="26px" height="25px"/>
                        <div className="text-black ml-3">Lanjutkan dengan Google</div>
                    </div>
                )} 
            />
        </div>
    );
};
