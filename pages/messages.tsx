import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PermissionGate from "../components/PermissionGate";
import { responseI } from "../interfaces/general.interface";
import { messagesI } from "../interfaces/messages.interface";
import { PermissionE } from "../interfaces/permission.interface";

import styles from "../styles/messages.module.scss";
import config from "../utils/config";
import useSession from "../utils/lib/useSession";
import useUser from "../utils/lib/useUser";
import { fetchData, MethodE } from "../utils/scripts/fetchData.script";

const Messages: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const { userPermission } = useUser();
    const messages: messagesI[] = useMemo(
        () => response.data || [],
        [response]
    );

    //? Use state
    const [investment, setInvestment] = useState("*All*");

    //? Use effect
    useSession();

    //? Methods
    const handleChange = useCallback((e: FormEvent<HTMLSelectElement>) => {
        console.log("Value :>> ", e.currentTarget.value);
        setInvestment(e.currentTarget.value);
    }, []);

    const messageList = useMemo(
        () =>
            messages.map((message) => (
                <Message key={message.id} message={message} />
            )),
        [messages]
    );

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
                            <option disabled value={"none"}>
                                Segreguj wiadomości wg. inwestycji
                            </option>
                            <option selected value="*All*">
                                Wszystkie wiadomości
                            </option>
                        </select>
                    </label>
                    {messageList}
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Message: NextPage<{ message: messagesI }> = ({ message }) => {
    const router = useRouter();
    const { author, content, id, subtitle, title, isNewStatus } = message;
    const { userPermission } = useUser();
    return (
        <div
            className={styles.message}
            key={id.toString()}
            onClick={() => router.push(`/messages/id/${id}`)}
        >
            <div className={styles.titleWrapper}>
                <h3>{title}</h3>
                {isNewStatus ? (
                    <div className={styles.newMessage}>
                        {userPermission === PermissionE.ADMIN
                            ? "Nie odczytano"
                            : "Nowa"}
                    </div>
                ) : null}
            </div>

            <h3 className={styles.author}>
                <span>Autor:</span>
                <span>{author}</span>
            </h3>
            <h4>{subtitle}</h4>
            <p>{content}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const { token } = context.req.cookies;
    const urlAdminMessages: RequestInfo = `${config.host}/admin/messages`;
    const urlUserMessages: RequestInfo = `${config.host}/users/messages`;
    const adminResponse = await fetchData(urlAdminMessages, {
        token,
        method: MethodE.GET,
    });
    const { response } = await fetchData(urlUserMessages, {
        token,
        method: MethodE.GET,
    });
    if (!response.data) {
        return { props: { response: adminResponse.response } };
    }
    if (response.data.length > 0) {
        return { props: { response } };
    } else {
        return { props: { response: adminResponse.response } };
    }
};

export default Messages;
