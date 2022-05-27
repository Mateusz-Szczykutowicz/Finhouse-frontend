import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { responseI } from "../interfaces/general.interface";
import { investmentResponseI } from "../interfaces/investments.interface";

import styles from "../styles/investments.module.scss";
import useSession from "../utils/lib/useSession";
import { fetchData } from "../utils/scripts/fetchData.script";
import { getDate } from "../utils/scripts/getDate.scripr";

//? Function
const getList = (list: investmentResponseI[]) => {
    return list.map((investment) => (
        <InvestmentElement investment={investment} key={investment.id} />
    ));
};

const Investments: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const investments: investmentResponseI[] = response.data || [];

    //? Use state

    //? Use effect
    useSession();

    //? Methods
    const investorsList = investments.map((investment) => (
        <InvestmentElement investment={investment} key={investment.id} />
    ));
    // const handleSort = (e: FormEvent<HTMLSelectElement>) => {
    //     if (e.currentTarget.value === "nameUp") {
    //         console.log("wykonuję :>> ");
    //         investments.sort((a, b) => {
    //             return a.name > b.name ? 1 : -1;
    //         });
    //         investorsList = investments.map((investment) => (
    //             <InvestmentElement
    //                 investment={investment}
    //                 key={investment.id}
    //             />
    //         ));
    //     } else {
    //         console.log("inne wykonanie");
    //         investments.sort((a, b) => {
    //             return a.name < b.name ? 1 : -1;
    //         });
    //         investorsList = investments.map((investment) => (
    //             <InvestmentElement
    //                 investment={investment}
    //                 key={investment.id}
    //             />
    //         ));
    //     }
    // };

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Inwestycje | FinHouse</title>
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
                        className={`${styles.category} ${styles.active}`}
                        onClick={() => router.push("/investments")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/finance-active.svg"
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
                <div className={styles.investmentsWrapper}>
                    <div className={styles.flexWrapper}>
                        <h2>Lista inwestycji</h2>
                        <label
                            htmlFor="filters"
                            className={styles.filtersWrapper}
                        >
                            <select
                                name="filters"
                                id="filters"
                                className={styles.filters}
                                // onChange={handleSort}
                            >
                                <option value="" disabled>
                                    Filtry
                                </option>
                                <option value="nameUp">Od A do Z</option>
                                <option value="nameDown">Od Z do A</option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.investmentsContainer}>
                        {investorsList}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const InvestmentElement: NextPage<{ investment: investmentResponseI }> = ({
    investment,
}) => {
    const {
        id,
        name,
        firstInstallment,
        lastInstallment,
        investorCapital,
        installmentAmount,
        commissionAmount,
    } = investment;
    const router = useRouter();
    const startDate = new Date(firstInstallment);
    const endDate = new Date(lastInstallment);
    return (
        <div
            className={styles.investmentWrapper}
            onClick={() => router.push(`/investments/id/${id}`)}
        >
            <div className={styles.leftWrapper}>
                <h3>{name}</h3>
                <div className={styles.date}>
                    <span>Pożyczka od</span> <span>{getDate(startDate)}</span>{" "}
                    <span>do</span> <span>{getDate(endDate)}</span>
                </div>
                <div className={styles.paymentDelay}>
                    <span>Łączne opóźnienie w całej pożyczce w dniach:</span>
                    <span>{50}</span>
                </div>
                <button className={styles.send}>Wyślij SMS o zalgłości</button>
                <button className={styles.send}>
                    Wyślij E-mail o zalgłości
                </button>
            </div>
            <div className={styles.rightWrapper}>
                <p>
                    <span>Łącznie zainwestowane</span>
                    <span>{investorCapital}</span>
                    <span>PLN</span>
                </p>
                <p>
                    <span>Łącznie raty miesięcznie</span>
                    <span>{installmentAmount}</span>
                    <span>PLN</span>
                </p>
                <p>
                    <span>Łącznie prowizje miesięcznie</span>
                    <span>{commissionAmount}</span>
                    <span>PLN</span>
                </p>
                <p>
                    <span>Łącznie zaległe raty lub niedopłata</span>
                    <span>{509}</span>
                    <span>PLN</span>
                </p>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const url = new URL("http://localhost:8000/investments/");
    const { response } = await fetchData(url, { token });
    return { props: { response } };
};

export default Investments;
