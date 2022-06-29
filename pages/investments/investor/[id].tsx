import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import PermissionGate from "../../../components/PermissionGate";
import { responseI, sortFilterE } from "../../../interfaces/general.interface";
import { investmentResponseI } from "../../../interfaces/investments.interface";
import { PermissionE } from "../../../interfaces/permission.interface";
import styles from "../../../styles/investments.module.scss";
import config from "../../../utils/config";
import useSession from "../../../utils/lib/useSession";
import useUser from "../../../utils/lib/useUser";
import { fetchData, MethodE } from "../../../utils/scripts/fetchData.script";
import { getDate } from "../../../utils/scripts/getDate.scripr";

const Investments: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const investments: investmentResponseI[] = useMemo(
        () => response.data || [],
        [response]
    );

    //? Use state
    const [sortFilter, setSortFilter] = useState("nameUp");
    const [investmentList, setInvestmentList] = useState([<></>]);
    const [, setRefresh] = useState(0);

    //? Use effect
    useSession();
    const { userPermission } = useUser();

    useEffect(() => {
        if (sortFilter === sortFilterE.NAME_UP) {
            console.log("Wykonuję sortowanie od A do Z");
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.name.toLowerCase() >
                    investmentElement2.name.toLowerCase()
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.NAME_DOWN) {
            console.log("Wykonuję sortowanie od Z do A");
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.name.toLowerCase() <
                    investmentElement2.name.toLowerCase()
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.AMOUNT_DOWN) {
            console.log(
                "Wykonuję sortowanie od największej kwoty zainwestowanej"
            );
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.investorCapital <
                    investmentElement2.investorCapital
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.AMOUNT_UP) {
            console.log(
                "Wykonuję sortowanie od najmniejszej kwoty zainwestowanej"
            );
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.investorCapital >
                    investmentElement2.investorCapital
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.COMMISSION_DOWN) {
            console.log(
                "Wykonuję sortowanie od największej prowizji miesięcznej"
            );
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.commissionAmount /
                        investmentElement.numberOfInstallment <
                    investmentElement2.commissionAmount /
                        investmentElement2.numberOfInstallment
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.COMMISSION_UP) {
            console.log(
                "Wykonuję sortowanie od najmniejszej prowizji miesięcznej"
            );
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.commissionAmount /
                        investmentElement.numberOfInstallment >
                    investmentElement2.commissionAmount /
                        investmentElement2.numberOfInstallment
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.INSTALLMENT_DOWN) {
            console.log("Wykonuję sortowanie od największej raty miesięcznej");
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.installmentAmount <
                    investmentElement2.installmentAmount
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.INSTALLMENT_UP) {
            console.log("Wykonuję sortowanie od najmniejszej raty miesięcznej");
            const investmentList = investments
                .sort((investmentElement, investmentElement2) =>
                    investmentElement.installmentAmount >
                    investmentElement2.installmentAmount
                        ? 1
                        : -1
                )
                .map((investment) => (
                    <InvestmentElement
                        investment={investment}
                        key={investment.id}
                    />
                ));
            setInvestmentList(investmentList);
            setRefresh(Math.random());
        }
    }, [sortFilter, investments]);

    //? Methods

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
                                onChange={(e) => setSortFilter(e.target.value)}
                            >
                                <option value="" disabled>
                                    Filtry
                                </option>
                                <option value={sortFilterE.NAME_UP}>
                                    Inwestorzy od A do Z
                                </option>
                                <option value={sortFilterE.NAME_DOWN}>
                                    Inwestorzy od Z do A
                                </option>
                                <option value={sortFilterE.AMOUNT_DOWN}>
                                    Od największej kwoty zainwestowanej
                                </option>
                                <option value={sortFilterE.AMOUNT_UP}>
                                    Od najmniejszej kwoty zainwestowanej
                                </option>
                                <option value={sortFilterE.COMMISSION_DOWN}>
                                    Od największej prowizji miesięcznej
                                </option>
                                <option value={sortFilterE.COMMISSION_UP}>
                                    Od najmniejszej prowizji miesięcznej
                                </option>
                                <option value={sortFilterE.INSTALLMENT_DOWN}>
                                    Od największej raty miesięcznej
                                </option>
                                <option value={sortFilterE.INSTALLMENT_UP}>
                                    Od najmniejszej raty miesięcznej
                                </option>
                            </select>
                        </label>
                    </div>
                    <div className={styles.investmentsContainer}>
                        {investmentList}
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
        numberOfInstallment,
    } = investment;
    const router = useRouter();
    const startDate = new Date(firstInstallment);
    const endDate = new Date(lastInstallment);

    const { token } = useUser();

    const handleDeleteInvestment = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const deleteURL: RequestInfo = `${config.host}/investments/id/${id}`;
        const { response } = await fetchData(deleteURL, {
            token,
            method: MethodE.DELETE,
        });
        console.log("response :>> ", response);
        if (response.status === 200) {
            alert(`Pomyślnie usunięto inwestycję ${name}`);
            router.push(`/investments/investor/${router.query.id}`);
        }
    };

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
                {/* <div className={styles.paymentDelay}>
                    <span>Łączne opóźnienie w całej pożyczce w dniach:</span>
                    <span>{50}</span>
                </div> */}
                <button className={`${styles.send} ${styles.active}`}>
                    Wyślij SMS o zalgłości
                </button>
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
                    <span>
                        {(commissionAmount / numberOfInstallment).toFixed(2)}
                    </span>
                    <span>PLN</span>
                </p>
            </div>
            <button
                className={styles.deleteInvestment}
                onClick={handleDeleteInvestment}
            >
                <Image
                    src="/images/deleteInvestments.svg"
                    layout="fill"
                    alt="Kosz"
                />
            </button>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    // const investorsResult = await fetch(
    //     `http://localhost:8000/investments/investor/${id}`,
    //     {
    //         headers: {
    //             token: token,
    //             "Content-Type": "application/json",
    //         },
    //     }
    // );
    // const result = await investorsResult.json();
    // const investments: investmentResponseI[] = result.data;
    const { id } = context.params || { id: "" };
    const token = context.req.cookies.token;
    const url: RequestInfo = `${config.host}/investments/investor/${id}`;
    const { response } = await fetchData(url, { token });
    return { props: { response } };
};

export default Investments;
