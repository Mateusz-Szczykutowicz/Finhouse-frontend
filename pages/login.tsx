import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { deleteCookie, getCookie, setCookie } from "../scripts/cookie.script";

import styles from "../styles/login.module.scss";

const Login: NextPage = () => {
    const [token, setToken] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    useEffect(() => {
        setToken(getCookie("token"));
        if (token) {
            router.push("/dashboard");
        }
    }, [token, router]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("login :>> ", login);
        console.log("password :>> ", password);
        if (login === "Psikut" && password === "Psikut") {
            setCookie("token", password, { path: "/", maxAge: 15 });
            router.push("/dashboard");
        }
    };

    return (
        <>
            <Head>
                <title>Login | FinHouse</title>
            </Head>

            <div className={styles.wrapper}>
                <Header />
                <main className={styles.container}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/login.svg"
                            layout="fill"
                            alt="Login"
                        />
                    </div>
                    <form
                        action="#"
                        method="post"
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="login"
                            id="login"
                            placeholder="Login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className={styles.loginButton}>
                            Zaloguj
                        </button>
                        <button
                            onClick={() => {
                                router.push("/register");
                            }}
                            className={styles.registerButton}
                        >
                            Zarejestruj się
                        </button>
                    </form>
                    <Link href="/recover">Odzyskaj hasło</Link>
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </>
    );
};

export default Login;
