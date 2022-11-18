import firebase from "firebase";
import React from "react";
import { requestLoginWithProvider } from "../../api/auth/request-login-with-provider";
import { ProviderAuthType } from "../../enum/auth/provider-auth-type";
import { responseErrorHandler } from "../../helper/common/response-request-handler";
import { UserRegisterProvider } from "../../models/auth/user-register-provider";

import { BtnLoginGoogleComponentProps } from "../../types/auth/btn-login-google-component-props";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { hasGrantedAllScopesGoogle } from '@react-oauth/google';

export function BtnLoginGoogleComponent( { success, notFound, className, onLoading } : BtnLoginGoogleComponentProps) {


    const [ userProvider, setUserProvider ] = React.useState<UserRegisterProvider>(new UserRegisterProvider());

    function initOnAuthStateChanged() {
        firebase.auth().signOut();
        // - Listened from state change
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                user.getIdToken().then(function (idToken) {
                    requestLogin(idToken, user);
                });
            }
        });
    }

    async function handleSuccess(data){
        onLoading(true)
        // init Auth State Changed
        initOnAuthStateChanged()
        
        var credential = firebase.auth.GoogleAuthProvider.credential(data.credential);
        var requestSignIn = await firebase.auth().signInWithCredential(credential)
        setUserProvider({ ...userProvider, firebaseUser: requestSignIn.user});
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
            } else {
                responseErrorHandler(requestSignIn, (message) => {
                    onLoading(false)
                    alert(message)
                })
            }
        }
    }


    const login = useGoogleLogin({
        onSuccess: (response) => {
            const userInfo = fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` },
            })
            .then(res => console.log(res));

        },
        onError(errorResponse) {
            console.log(errorResponse)
        },
        
      });

    return (
        <>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    handleSuccess(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                size = {"large"}
                theme = {"outline"}
                shape = {"rectangular"}
                auto_select= {false}
                type = {"icon"}
                
            />

            {/* <div onClick = {() => login()} className = "bg-red-600">Test</div> */}
            </>
    );
};
