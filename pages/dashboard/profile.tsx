import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { checkToken } from "../../utils/scripts/fetchData.script";
import { deleteCookie, getCookie } from "../../utils/scripts/cookie.script";

import styles from "../../styles/profile.module.scss";
import useSession from "../../utils/lib/useSession";

const Profile: NextPage = () => {
    //? Variables
    const router = useRouter();
    const user = {
        //! do poprawy!!!
        email: "andrzej.nowak@example.com",
        name: "Andrzej Nowak",
        tel: "508 903 004",
        adress: "Adres korespondencyjny",
    };

    //? Use state
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [adress, setAdress] = useState("");

    //? Use effect
    useSession();

    //? Methods
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Profil | FinHouse</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.nav}>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className={`${styles.category} ${styles.active}`}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/dashboard-active.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button
                        className={styles.category}
                        onClick={() => router.push("/messages")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/messages.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button
                        className={styles.category}
                        onClick={() => router.push("/investors")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/investor.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button
                        className={styles.category}
                        onClick={() => router.push("/investments/create")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/investment.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button
                        className={styles.category}
                        onClick={() => router.push("/users")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/users.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button
                        className={styles.category}
                        onClick={() => router.push("/investments")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/finance.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button className={styles.category}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/focus.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                </div>
                <div className={styles.content}>
                    <h2>Profil</h2>
                    <form action="#" method="post" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder={user.email}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={user.name}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder={user.tel}
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            placeholder={user.adress}
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />
                        <button type="submit">Zapisz</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
