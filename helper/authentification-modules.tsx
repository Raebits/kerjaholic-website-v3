

import { GetServerSidePropsContext } from 'next'
import { requestCheckToken } from '../api/auth/request-check-token';

export const withAuth = (gssp: any) => {
    return async (context: GetServerSidePropsContext) => {
        const { req, res, resolvedUrl } = context
        const auth = req.cookies.auth;
        const token = req.cookies.token;
        if (auth !== 'true') {
            return {
                redirect: {
                    destination: "/?redirect=true&pn=" + resolvedUrl,
                    permanent: false,
                }
            }
        }else{
            // check jwt token valid or not 
            const response = await requestCheckToken(token)
            console.log(response)
            if (response.error) {
                if(response.error.status_code === 401){
            
                    // if false
                    res.setHeader(
                        "Set-Cookie", [
                        `token=deleted; Max-Age=0; path=/`,
                        `userId=deleted; Max-Age=0; path=/`,
                        `auth=deleted; Max-Age=0; path=/`]
                        ); 
                    return {
                        redirect: {
                            destination: "/",
                            permanent: false,
                        }
                    }
                }
            }
        }

        return await gssp(context)
    }
}

export const authGuard = (handler: any) => (withAuth(handler))
