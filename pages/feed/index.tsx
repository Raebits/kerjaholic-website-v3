import React from "react";
import { GetServerSideProps } from "next";

function Status(): JSX.Element {
  
    return (
        <div><div></div></div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id, ref } = context.query

    if (id != null) {
        return {
            redirect: {
                destination: "/feed/" + id + ((ref != null) ? ("?ref=" + ref) : ""),
                permanent: false
            }
        }
    } 

    return {
        props: {

        }
    }  
}


export default Status;