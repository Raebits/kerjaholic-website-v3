

import { GetServerSidePropsContext } from 'next'

export const withAuth = (gssp: any) => {
    return async (context: GetServerSidePropsContext) => {
        const { req, resolvedUrl } = context
        const auth = req.cookies.auth;
        
        if (auth !== 'true') {
            return {
                redirect: {
                    destination: "/?redirect=true&pn=" + resolvedUrl,
                    permanent: false,
                }
            }
        }

        return await gssp(context)
    }
}

export const authGuard = (handler: any) => (withAuth(handler))
