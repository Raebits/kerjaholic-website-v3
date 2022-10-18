import React from "react";
import { GetServerSideProps } from "next";

function Profil(): JSX.Element {

    return (
        <div></div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { id, ref } = context.query

    if (id != null) {
        return {
            redirect: {
                destination: "/profil/" + id + ((ref != null) ? ("?ref=" + ref) : ""),
                permanent: false,
            }
        }
    } 

    return {
        props: {

        }
    }  
}

export default Profil;