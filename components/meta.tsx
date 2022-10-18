import Head from 'next/head'
import { siteUrl } from '../constant/base-url'
import MetaProps from '../types/meta-props'

function Meta({ title, desc, thumbnail } : MetaProps) {

    return (
        <Head>
            <title>{(title == null || title == undefined) ? "Kerjaholic" : title}</title>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="shortcut icon" href="/favicon/favicon.png"></link>

            <meta property="og:site_name" content="Kerjaholic"></meta>
            <meta property="og:title" content={(title == null || title == undefined) ? "Kerjaholic" : title} />
            <meta property="og:description" content={(desc == null || desc == undefined) ? "" : desc} />
            <meta property="og:image" itemProp="image" content={(thumbnail == null || thumbnail == undefined) ? (siteUrl + "images/thumbnail-new.png") : thumbnail} />
            <meta property="og:type" content="website" />

            <meta name="twitter:site" content="Kerjaholic"></meta>
            <meta name="twitter:title" content={(title == null || title == undefined) ? "Kerjaholic" : title}></meta>
            <meta name="twitter:description" content={(desc == null || desc == undefined) ? "" : desc}></meta>
            <meta name="twitter:card" content="summary"></meta>
            <meta name="twitter:image" content={(thumbnail == null || thumbnail == undefined) ? (siteUrl + "images/thumbnail-new.png") : thumbnail}></meta>

            {/* <!-- Latest compiled and minified CSS --> */}
            {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link> */}

            {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link> */}

            {/* <!-- jQuery library --> */}
            {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}

            {/* <!-- Popper JS --> */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

            {/* <!-- Latest compiled JavaScript --> */}
            {/* <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> */}

            {/* old css file -> will be deleted */}
            {/* <link rel="stylesheet" href="/css/home.css"/> */}
            
            {/* new css file */}
            {/* <link rel="stylesheet" href="/css/common.css"/> */}
            {/* <link rel="stylesheet" href="/css/index.css"/> */}
            {/* <link rel="stylesheet" href="/css/profile.css"/> */}
            {/* <link rel="stylesheet" href="/css/kerjaan/detil.css"/> */}
            {/* <link rel="stylesheet" href="/css/status/index.css"/> */}

            {/* <link rel="stylesheet" href="/css/article/index.css"/> */}


        </Head>
    )
}

export default Meta