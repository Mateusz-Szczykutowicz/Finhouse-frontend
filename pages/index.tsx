import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
    //? Variables
    const router = useRouter();
    //? Use effect
    useEffect(() => {
        router.push("/login");
    });
    return (
        <>
            <h1>Something went wrong...</h1>
            <Link href="/login">Back to login</Link>
        </>
    );
};

export default Home;
