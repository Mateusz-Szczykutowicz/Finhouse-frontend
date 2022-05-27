import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import styles from "../../styles/operation.module.scss";
import useSession from "../../utils/lib/useSession";

const Operation: NextPage = () => {
    //? Variables
    const router = useRouter();

    //? Use state

    //? Use effect
    useSession();

    //? Methods

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Operations | FinHouse</title>
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
                <div className={styles.operationWrapper}>
                    <h2>Lista operacji</h2>
                    <div className={styles.operationContainer}>
                        <div className={styles.operationHeader}>
                            <p className={styles.first}>Płatnik</p>
                            <p className={styles.second}>Tytuł</p>
                            <p className={styles.third}>Kwota</p>
                            <p className={styles.fourth}>Data</p>
                        </div>
                        <OperationElement
                            payer="Teanscom Sp. z o.o."
                            title="przelew w ramach umowy pozyczki zawartej dnia bla bla bla"
                            amount={1000}
                            date={new Date()}
                        />
                        <OperationElement
                            payer="Teanscom Sp. z o.o."
                            title="przelew w ramach umowy pozyczki zawartej dnia bla bla bla"
                            amount={1000}
                            date={new Date()}
                        />
                        <OperationElement
                            payer="Teanscom Sp. z o.o."
                            title="przelew w ramach umowy pozyczki zawartej dnia bla bla bla"
                            amount={1000}
                            date={new Date()}
                        />
                    </div>
                    <div className={styles.navWrapper}>
                        <button>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={
                                        "/images/dashboard/operation/leftTriangle.svg"
                                    }
                                    layout="fill"
                                    alt="Poprzednia strona"
                                />
                            </div>
                        </button>
                        <div className={styles.counterContainer}>
                            <p>
                                <span>{1}</span>
                                <span>z</span>
                                <span>{3}</span>
                            </p>
                        </div>
                        <button>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={
                                        "/images/dashboard/operation/rightTriangle.svg"
                                    }
                                    layout="fill"
                                    alt="Poprzednia strona"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const OperationElement: NextPage<{
    payer: string;
    title: string;
    amount: number;
    date: Date;
}> = ({ amount, date, payer, title }) => {
    const getDate = (date: Date): string => {
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const month =
            date.getMonth() < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}.${month}.${year}r.`;
    };
    return (
        <div className={styles.operationElementWrapper}>
            <p className={styles.first}>{payer}</p>
            <p className={styles.second}>{title}</p>
            <p className={styles.third}>
                <span>{amount}</span>
                <span>PLN</span>
            </p>
            <p className={styles.fourth}>{getDate(date)}</p>
        </div>
    );
};

export default Operation;
