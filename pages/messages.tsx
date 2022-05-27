import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PermissionGate from "../components/PermissionGate";
import { PermissionE } from "../interfaces/permission.interface";

import styles from "../styles/messages.module.scss";
import useSession from "../utils/lib/useSession";
import useUser from "../utils/lib/useUser";

const Messages: NextPage = () => {
    //? Variables
    const router = useRouter();
    const { userPermission } = useUser();

    //? Use state
    const [investment, setInvestment] = useState("");

    //? Use effect
    useSession();

    //? Methods
    const handleChange = (e: FormEvent<HTMLSelectElement>) => {
        console.log("Value :>> ", e.currentTarget.value);
        setInvestment(e.currentTarget.value);
    };

    // const messageList = messages.map(({ id, content, title, subtitle }) => (
    //     <Message
    //         key={id}
    //         id={id}
    //         title={title}
    //         subtitle={subtitle}
    //         message={content}
    //     />
    // ));
    // const investemntList = investments.map(({ name, id }) => (
    //     <option value={id} key={id}>
    //         {name}
    //     </option>
    // ));
    const messageList = null;

    const investemntList = null;

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Wiadomości | FinHouse</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.nav}>
                    <button
                        className={styles.category}
                        onClick={() => router.push("/dashboard")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/dashboard.svg"
                                layout="fill"
                                alt="kategoria"
                            />
                        </div>
                    </button>
                    <button
                        className={`${styles.category} ${styles.active}`}
                        onClick={() => router.push("/messages")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/messages-active.svg"
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
                <div className={styles.messagesContainer}>
                    <h2>Wiadomości</h2>
                    <PermissionGate
                        permission={PermissionE.ADMIN}
                        userPermission={userPermission}
                    >
                        <button
                            className={styles.sendMessage}
                            onClick={() => router.push("/messages/send")}
                        >
                            Napisz wiadomość
                        </button>
                    </PermissionGate>
                    <label
                        htmlFor="investmentOptions"
                        className={styles.selectWrapper}
                    >
                        <select
                            name="investmentOptions"
                            id="investmentOptions"
                            value={investment}
                            onChange={handleChange}
                        >
                            <option disabled>
                                Segreguj wiadomości wg. inwestycji
                            </option>
                            <option selected value="*All*">
                                Wszystkie wiadomości
                            </option>
                            {investemntList}
                        </select>
                    </label>
                    {messageList}
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Message: NextPage<{
    id: number;
    title: string;
    subtitle: string;
    message: string;
}> = ({ id, title, subtitle, message }) => {
    const router = useRouter();

    return (
        <div
            className={styles.message}
            key={id.toString()}
            onClick={() => router.push(`/messages/id/${id}`)}
        >
            <h3>{title}</h3>
            <h4>{subtitle}</h4>
            <p>{message}</p>
        </div>
    );
};

// export const getServerSideProps: GetServerSideProps<{
//     messages: messagesI[];
//     investments: investmentsI[];
// }> = async (context) => {
//     console.log("Cookies :>> ", context.req.cookies);
//     const { token } = context.req.cookies;
// };

export default Messages;
