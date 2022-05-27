import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { checkToken } from "../utils/scripts/fetchData.script";
import { deleteCookie, getCookie } from "../utils/scripts/cookie.script";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
