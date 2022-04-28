import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const isUserLogin = false;

const Home: NextPage = () => {
    const router = useRouter();
    useEffect(() => {
        if (isUserLogin) {
            router.push("/dashboard");
        } else {
            router.push("/login");
        }
    });
    return (
        <>
            <h1>Something went wrong...</h1>
            <Link href="/dashboard">Back to dashboard</Link>
        </>
    );
};

export default Home;
