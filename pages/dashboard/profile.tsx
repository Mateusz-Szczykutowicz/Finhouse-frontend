import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchData, MethodE } from "../../utils/scripts/fetchData.script";
import styles from "../../styles/profile.module.scss";
import useSession from "../../utils/lib/useSession";
import PermissionGate from "../../components/PermissionGate";
import { PermissionE } from "../../interfaces/permission.interface";
import useUser from "../../utils/lib/useUser";
import config from "../../utils/config";

const Profile: NextPage = () => {
    //? Variables
    const router = useRouter();

    //? Use state
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [adress, setAdress] = useState("");

    //? Use effect
    useSession();
    const { user, userPermission, token } = useUser();
    //? Methods
    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            const data = {
                email: email || user.email,
                name: name || user.name,
                tel: tel || user.tel,
                adress: adress || user.adress,
            };
            console.log("data :>> ", data);
            const url: RequestInfo = `${config.host}/users`;
            console.log("url :>> ", url);
            const { response } = await fetchData(url, {
                token,
                data: JSON.stringify(data),
                method: MethodE.PUT,
            });
            console.log("response :>> ", response);
            if (response.status === 400) {
                alert("Coś poszło nie tak");
            }
            if (response.status === 200) {
                alert("Pomyślnie zaktualizowano dane");
                router.push("/dashboard");
            }
        },
        [adress, email, name, router, tel, token, user]
    );

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
                    <PermissionGate
                        permission={PermissionE.ADMIN}
                        userPermission={userPermission}
                    >
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
                    </PermissionGate>
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
                            placeholder={user ? user.email : "Email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={user ? user.name : "Nazwa"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder={user ? user.tel : "Telefon"}
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            placeholder={user ? user.adress : "Adres"}
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
