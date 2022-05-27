import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import styles from "../styles/recover.module.scss";

const Recover: NextPage = () => {
    const [email, setEmail] = useState("");

    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Login | FinHouse</title>
            </Head>
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
                        name="email"
                        id="email"
                        placeholder="Wpisz e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className={styles.recoverButton}>
                        Odzyskaj hasło
                    </button>
                    <button
                        onClick={() => {
                            router.push("/");
                        }}
                        className={styles.registerButton}
                    >
                        Wstecz
                    </button>
                </form>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Recover;
