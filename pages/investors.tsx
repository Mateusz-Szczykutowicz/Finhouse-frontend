import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { responseI } from "../interfaces/general.interface";
import { investI, investorResponseI } from "../interfaces/investor.interface";

import styles from "../styles/investors.module.scss";
import useSession from "../utils/lib/useSession";
import { fetchData } from "../utils/scripts/fetchData.script";
import { getDate } from "../utils/scripts/getDate.scripr";

const Investors: NextPage<{ response: responseI }> = ({ response }) => {
    const data: [{ investor: investorResponseI; invest: investI }] =
        response.data || [];
    //? Variables
    const router = useRouter();

    //? Use states

    //? Use effects
    useSession();

    //? Methods
    const investorsList = data.map((e) => (
        <InvestorElement
            investor={e.investor}
            key={e.investor.id}
            invest={e.invest}
        />
    ));

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Lista inwestorów | FinHouse</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.nav}>
                    <button
                        onClick={() => router.push("/dashboard")}
                        className={styles.category}
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
                        className={`${styles.category} ${styles.active}`}
                        onClick={() => router.push("/investors")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/investor-active.svg"
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
                <div className={styles.investorsListWrapper}>
                    <h2>Lista Inwestorów</h2>
                    <button
                        className={styles.newInvestor}
                        onClick={() => router.push("/investors/create")}
                    >
                        Wprowadź nowego inwestora
                    </button>
                    <select
                        name="filters"
                        id="filters"
                        className={styles.filters}
                    >
                        <option disabled>Filtry</option>
                        <option value="nameUp">Inwestorzy od A do Z</option>
                    </select>
                    <div className={styles.investorsListContainer}>
                        {investorsList}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const InvestorElement: NextPage<{
    investor: investorResponseI;
    invest: investI;
}> = ({ investor, invest }) => {
    //? Variables
    const router = useRouter();
    const { id, name, createdAt } = investor;
    const date = new Date(createdAt);

    //? Use state

    //? Methods

    return (
        <div
            className={styles.investorElementWrapper}
            key={id}
            onClick={() => router.push(`/investments/investor/${id}`)}
        >
            <div className={styles.leftWrapper}>
                <h3>{name}</h3>
                <h4>
                    <span>Inwestor od</span>
                    <span>{getDate(date)}</span>
                </h4>
            </div>
            <div className={styles.rightWrapper}>
                <p>
                    <span>Łącznie zainwestowane</span>
                    <span>{invest.investedAmount}</span>
                    <span>PLN</span>
                </p>
                <p>
                    <span>Łącznie raty miesięcznie</span>
                    <span>{invest.installmentsAmount}</span>
                    <span>PLN</span>
                </p>
                <p>
                    <span>Łączna prowizja</span>
                    <span>{invest.commissionsAmount}</span>
                    <span>PLN</span>
                </p>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    // const investorsResponse = await fetch("http://localhost:8000/investors", {
    //     headers: {
    //         "Content-Type": "application/json",
    //         token: token,
    //     },
    // });
    // const response = await investorsResponse.json();
    // const data: [{ investor: investorResponseI; invest: investI }] =
    //     response.data;

    const token = context.req.cookies.token;
    const url = new URL("http://localhost:8000/investors");
    const { response } = await fetchData(url, { token });
    return { props: { response } };
};

export default Investors;
