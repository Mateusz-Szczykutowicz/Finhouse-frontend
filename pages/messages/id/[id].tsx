import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useMemo, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import PermissionGate from "../../../components/PermissionGate";
import { responseI } from "../../../interfaces/general.interface";
import { PermissionE } from "../../../interfaces/permission.interface";
import styles from "../../../styles/message.id.module.scss";
import config from "../../../utils/config";
import useSession from "../../../utils/lib/useSession";
import useUser from "../../../utils/lib/useUser";
import { fetchData } from "../../../utils/scripts/fetchData.script";

const Message: NextPage<{
    response: responseI;
}> = ({ response }) => {
    //? Variables
    const router = useRouter();
    // const user = useMemo(() => PermissionE.INVESTOR, []);
    const message = useMemo(() => response.data, [response]);
    // const investments: investmentResponseI[] = useMemo(() => response.data.investments || [], [response]);

    //? use states
    const [investment, setInvestment] = useState("");

    //? Use effect
    useSession();
    const { userPermission } = useUser();

    //? Methods
    // const handleChange = (e: FormEvent<HTMLInputElement>) => {
    //     console.log("Value :>> ", e.currentTarget.value);
    //     setInvestment(e.currentTarget.value);
    // };

    // const investemntList = investments.map(({ name }) => (
    //     <option value={name} key={name} />
    // ));
    // const investmentList = null;
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
                <div className={styles.messageWrapper}>
                    <h2>Wiadomość</h2>
                    <div
                        className={styles.messageContainer}
                        key={message ? message.id : "0"}
                    >
                        {/* <PermissionGate
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
                                    {investmentList}
                                </datalist>
                            </form>
                        </PermissionGate> */}
                        <div className={styles.headerContainer}>
                            <h3>{message ? message.title : "Tytuł"}</h3>
                            <h3>
                                <span>Autor:</span>
                                <span>
                                    {message ? message.author : "Autor"}
                                </span>
                            </h3>
                        </div>
                        <h4>{message ? message.subtitle : "Podtytuł"}</h4>
                        <p>{message ? message.content : "Wiadomość"}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    if (!context.params) {
        return {
            props: {
                response: { message: "Parametry nie istnieją", status: 400 },
            },
        };
    }
    const { token } = context.req.cookies;
    const id = context.params.id;
    const url: RequestInfo = `${config.host}/users/messages/id/${id}`;
    const { response } = await fetchData(url, { token });
    console.log("response :>> ", response);
    return { props: { response } };
};

export default Message;
