import React from "react";
import { GetServerSideProps } from "next";

export default function Detail(): JSX.Element {
  
    return (
        <div></div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id, ref } = context.query

    if (id != null) {
        return {
            redirect: {
                destination: "/kerjaan/" + id + ((ref != null) ? ("?ref=" + ref) : ""),
                permanent: false,
            }
        }
    }

    return {
        props: {

        }
    }  
}
