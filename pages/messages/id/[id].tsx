import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import PermissionGate from "../../../components/PermissionGate";
import { investmentResponseI } from "../../../interfaces/investments.interface";
import { messagesI } from "../../../interfaces/messages.interface";
import { PermissionE } from "../../../interfaces/permission.interface";

import styles from "../../../styles/message.id.module.scss";
import useSession from "../../../utils/lib/useSession";

const Message: NextPage<{
    message: messagesI;
    investments: investmentResponseI[];
}> = ({ message, investments }) => {
    //? Variables
    const router = useRouter();
    const user = PermissionE.INVESTOR;
    const { id, author, content, subtitle, title } = message;

    //? use states
    const [investment, setInvestment] = useState("");

    //? Use effect
    useSession();

    //? Methods
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        console.log("Value :>> ", e.currentTarget.value);
        setInvestment(e.currentTarget.value);
    };

    const investemntList = investments.map(({ name }) => (
        <option value={name} key={name} />
    ));
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
                <div className={styles.messageWrapper}>
                    <h2>Wiadomość</h2>
                    <div
                        className={styles.messageContainer}
                        key={id.toString()}
                    >
                        <PermissionGate
                            permission={PermissionE.INVESTOR}
                            userPermission={user}
                        >
                            <form
                                method="GET"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    type="list"
                                    list="investmentOptions"
                                    placeholder="Dołącz wiadomość do inwestycji"
                                    value={investment}
                                    onChange={handleChange}
                                />
                                <datalist id="investmentOptions">
                                    {investemntList}
                                </datalist>
                            </form>
                        </PermissionGate>
                        <div className={styles.headerContainer}>
                            <h3>{title}</h3>
                            <h3>
                                <span>Autor:</span>
                                <span>{author}</span>
                            </h3>
                        </div>
                        <h4>{subtitle}</h4>
                        <p>{content}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    message: messagesI;
    investments: investmentResponseI[];
}> = async (context) => {
    if (!context.params) {
        return {
            props: {
                message: {
                    id: 0,
                    title: "",
                    author: "",
                    subtitle: "",
                    content: "",
                },
                investments: [],
            },
        };
    }
    const { token } = context.req.cookies;
    const id: number = Number(context.params.id) || 0;

    const messageResult = await fetch(
        "http:/localhost:3000/data/messages.json",
        {
            method: "GET",
            headers: { token },
        }
    );

    const { messages }: { messages: messagesI[] } = await messageResult.json();

    const message: messagesI = messages.find(
        (message) => message.id === id
    ) || { id: 0, author: "", title: "", subtitle: "", content: "" };

    const investmentsResult = await fetch(
        "http:/localhost:3000/data/investments.json",
        {
            method: "GET",
            headers: { token },
        }
    );
    const { investments }: { investments: investmentResponseI[] } =
        await investmentsResult.json();
    return { props: { message, investments } };
};

export default Message;
