import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import PermissionGate from "../components/PermissionGate";
import { responseI, sortFilterE } from "../interfaces/general.interface";
import { investI, investorResponseI } from "../interfaces/investor.interface";
import { PermissionE } from "../interfaces/permission.interface";

import styles from "../styles/investors.module.scss";
import config from "../utils/config";
import useSession from "../utils/lib/useSession";
import useUser from "../utils/lib/useUser";
import { fetchData, MethodE } from "../utils/scripts/fetchData.script";
import { getDate } from "../utils/scripts/getDate.scripr";

const Investors: NextPage<{ response: responseI }> = ({ response }) => {
    const data: { investor: investorResponseI; invest: investI }[] = useMemo(
        () => response.data || [],
        [response]
    );

    //? Variables
    const router = useRouter();

    //? Use states
    const [sortFilter, setSortFilter] = useState("nameUp");
    const [investorsList, setInvestorsList] = useState([<></>]);
    const [, setRefresh] = useState(0);

    //? Use effects
    useSession();
    const { userPermission } = useUser();
    useEffect(() => {
        if (sortFilter === sortFilterE.NAME_UP) {
            console.log("Wykonuję sortowanie od A do Z");
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.investor.name.toLowerCase() >
                    dataElement2.investor.name.toLowerCase()
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.NAME_DOWN) {
            console.log("Wykonuję sortowanie od Z do A");
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.investor.name.toLowerCase() <
                    dataElement2.investor.name.toLowerCase()
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.AMOUNT_DOWN) {
            console.log(
                "Wykonuję sortowanie od największej kwoty zainwestowanej"
            );
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.invest.investedAmount <
                    dataElement2.invest.investedAmount
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.AMOUNT_UP) {
            console.log(
                "Wykonuję sortowanie od najmniejszej kwoty zainwestowanej"
            );
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.invest.investedAmount >
                    dataElement2.invest.investedAmount
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.INSTALLMENT_DOWN) {
            console.log("Wykonuję sortowanie od największej raty miesięcznie");
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.invest.installmentsAmount <
                    dataElement2.invest.installmentsAmount
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.INSTALLMENT_UP) {
            console.log("Wykonuję sortowanie od najmniejszej raty miesięcznie");
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.invest.installmentsAmount >
                    dataElement2.invest.installmentsAmount
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.COMMISSION_DOWN) {
            console.log("Wykonuję sortowanie od największej prowizji");
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.invest.commissionsAmount <
                    dataElement2.invest.commissionsAmount
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        } else if (sortFilter === sortFilterE.COMMISSION_UP) {
            console.log("Wykonuję sortowanie od najmniejszej prowizji");
            const investorsList = data
                .sort((dataElement, dataElement2) =>
                    dataElement.invest.commissionsAmount >
                    dataElement2.invest.commissionsAmount
                        ? 1
                        : -1
                )
                .map((e) => (
                    <InvestorElement
                        investor={e.investor}
                        key={e.investor.id}
                        invest={e.invest}
                    />
                ));
            setInvestorsList(investorsList);
            setRefresh(Math.random());
        }
    }, [sortFilter, data]);

    //? Methods

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
                        onChange={(e) => setSortFilter(e.target.value)}
                        className={styles.filters}
                    >
                        <option disabled>Filtry</option>
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
                    <div className={styles.investorsListContainer}>
                        {investorsList.length > 0 ? (
                            investorsList
                        ) : (
                            <p>Nie ma żadnych inwestorów</p>
                        )}
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
    const { id, createdAt } = useMemo(() => investor, [investor]);
    const date = useMemo(() => new Date(createdAt), [createdAt]);
    const { token } = useUser();
    //? Use state
    const [showModal, setShowModal] = useState(false);
    const [isEditInvestor, setIsEditInvestor] = useState(false);
    const [name, setName] = useState(investor.name);
    const [email, setEmail] = useState(investor.email);
    const [tel, setTel] = useState(investor.tel);

    //? Methods
    const handleEditInvestor = useCallback(
        async (e: FormEvent<HTMLElement>) => {
            e.preventDefault();
            const data = {
                name: name === "" ? investor.name : name,
                email: email === "" ? investor.email : email,
                tel: tel === "" ? investor.tel : tel,
                id,
            };
            setName(data.name);
            setEmail(data.email);
            setTel(data.tel);
            console.log("data :>> ", data);
            const changeInvestorDataURL: RequestInfo = `${config.host}/investors`;
            const { response } = await fetchData(changeInvestorDataURL, {
                token,
                method: MethodE.PUT,
                data: JSON.stringify(data),
                contentType: "application/json",
            });
            console.log("response :>> ", response);
            if (response.status === 200) {
                alert("Pomyślnie zaktualizowano");
            }
            setIsEditInvestor(false);
        },
        [email, investor, name, tel, token, id]
    );

    return (
        <div
            className={styles.investorElementWrapper}
            // key={id}
            onClick={() => router.push(`/investments/investor/${id}`)}
        >
            <Modal
                title="Inwestor"
                onClose={() => setShowModal(false)}
                show={showModal}
                // key={`modal-${id}`}
            >
                {isEditInvestor ? (
                    <>
                        <form
                            action="#"
                            method="post"
                            onSubmit={handleEditInvestor}
                        >
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder={investor.name}
                                className={styles.investorDataField}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder={investor.email}
                                className={styles.investorDataField}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                placeholder={investor.tel}
                                className={styles.investorDataField}
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                            <button
                                type="submit"
                                className={styles.confirmButton}
                            >
                                <Image
                                    src="/images/check.svg"
                                    layout="fill"
                                    alt="Zatwierdź"
                                />
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <button
                            className={styles.editInvestor}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEditInvestor(true);
                            }}
                        >
                            <Image
                                src="/images/editInvestor.svg"
                                layout="fill"
                                alt="Edytuj inwestora"
                            />
                        </button>
                        <h4>{investor.name}</h4>
                        <h4>{investor.email}</h4>
                        <h4>{investor.tel}</h4>
                    </>
                )}
            </Modal>
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
            <button
                className={styles.showModal}
                onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                }}
            >
                <Image
                    src="/images/showInvestor.svg"
                    layout="fill"
                    alt="Więcej informacji"
                />
            </button>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const url: RequestInfo = `${config.host}/investors`;
    const { response } = await fetchData(url, { token });
    return { props: { response } };
};

export default Investors;
