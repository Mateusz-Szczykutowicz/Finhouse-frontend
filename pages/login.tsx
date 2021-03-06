import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getCookie, setCookie } from "../utils/scripts/cookie.script";

import styles from "../styles/login.module.scss";
import { loginFetch } from "../utils/scripts/fetchData.script";
import { userStatusE } from "../interfaces/user.interface";

const Login: NextPage = () => {
    const [, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    useEffect(() => {
        if (getCookie("token")) {
            router.push("/dashboard");
        }
    }, [router]);

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();

            const loginData: { email: string; password: string } = {
                email: email.toLowerCase(),
                password,
            };

            loginFetch(loginData)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status === userStatusE.ACCEPTED) {
                            router.push("/dashboard");
                            setCookie("token", response.data.token, {
                                path: "/",
                                maxAge: 60 * 24,
                            });
                            setToken(getCookie("token"));
                        } else {
                            return alert(
                                "Twoje konto jest nieaktywne lub zablokowane"
                            );
                        }
                    } else {
                        alert("Zły login lub hasło");
                    }
                    console.log("response :>> ", response);
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    alert(
                        "Coś poszło nie tak! Skontaktuj się z administratorem."
                    );
                });
        },
        [email, password, router]
    );

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
                            src="/images/login/login.svg"
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
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            onClick={(e) => {
                                e.preventDefault();
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
