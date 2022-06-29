import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/dashboard.module.scss";
import {
    getCurrentDateString,
    getCurrentMonth,
    getDate,
} from "../utils/scripts/getDate.scripr";
import useSession from "../utils/lib/useSession";
import { responseI } from "../interfaces/general.interface";
import { fetchData, MethodE } from "../utils/scripts/fetchData.script";
import useUser from "../utils/lib/useUser";
import PermissionGate from "../components/PermissionGate";
import { PermissionE } from "../interfaces/permission.interface";
import config from "../utils/config";
import { statementI } from "../interfaces/statement.interface";
import lang from "../utils/locales/pl.lang.json";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";

//* Functions

//* Main component
const Dashboard: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const allInvestments = useMemo(() => response.data.all || null, [response]);
    const activeInvestments = useMemo(
        () => response.data.active || null,
        [response]
    );
    const finishedInvestments = useMemo(
        () => response.data.finished || null,
        [response]
    );
    const delayedInvestments = useMemo(
        () => response.data.delayed || null,
        [response]
    );
    const incomeInvestments = useMemo(
        () => response.data.income || null,
        [response]
    );
    const statements: statementI[] = useMemo(
        () => response.data.statements || [],
        [response]
    );
    const firstStatement: statementI | null = useMemo(
        () => (statements.length > 0 ? statements[0] : null),
        [statements]
    );
    const secondStatement: statementI | null = useMemo(
        () => (statements.length > 0 ? statements[1] : null),
        [statements]
    );

    //? Use state
    const [dateInput, setDateInput] = useState(getCurrentMonth());
    const [chartData, setChartData] = useState<
        { wpływy: number; przewidywane: number }[]
    >([]);

    //? Use effect
    useSession();
    const { userPermission, token } = useUser();
    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const chartURL: RequestInfo = `${config.host}/users/chart/${year}/${month}`;
        fetchData(chartURL, { token })
            .then(({ response }) => {
                if (response.data) {
                    console.log("response :>> ", response.data);
                    const chart = [];
                    for (const data of response.data.chartData) {
                        chart.push({
                            name: lang.months[data.month],
                            wpływy: data.paidValue,
                            przewidywane: data.initialValue,
                        });
                    }
                    setChartData(chart);
                }
            })
            .catch((err) => console.log("err :>> ", err));
    }, [token]);

    //? Methods
    const handleDateInputChange = useCallback(
        async (e: FormEvent<HTMLInputElement>) => {
            console.log("e.value :>> ", e.currentTarget.value);
            setDateInput(e.currentTarget.value);
            const year = e.currentTarget.value.split("-")[0];
            const month = e.currentTarget.value.split("-")[1];
            console.log("year :>> ", year);
            console.log("month :>> ", month);
            const chartURL: RequestInfo = `${config.host}/users/chart/${year}/${month}`;
            const { response } = await fetchData(chartURL, { token });
            console.log("response :>> ", response.data);
            const chart = [];
            for (const data of response.data.chartData) {
                chart.push({
                    name: lang.months[data.month],
                    wpływy: data.paidValue,
                    przewidywane: data.initialValue,
                });
            }
            setChartData(chart);
            //! Dodać wysyłanie do bazy danych o zmianę danych
        },
        [token]
    );

    const handleSendStatementFile = useCallback(
        async (e: FormEvent<HTMLInputElement>) => {
            e.preventDefault();
            const url: RequestInfo = `${config.host}/users/excel`;
            const data = new FormData();
            if (e.currentTarget.files)
                data.append("file", e.currentTarget.files[0]);
            const { response } = await fetchData(url, {
                token,
                data,
                method: MethodE.POST,
            });
            console.log("response :>> ", response);
            if (response.status === 404) {
                alert("Plik nie został poprawnie wybrany");
            } else if (response.status === 200) {
                alert("Pomyślnie przesłano plik");
                router.push("/dashboard");
            }
        },
        [router, token]
    );

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Dashboard | FinHouse</title>
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
                <div className={styles.dashboard}>
                    <div className={styles.leftWrapper}>
                        <h2>Panel admina</h2>
                        <div className={styles.profileWrapper}>
                            <div className={styles.avatarWrapper}>
                                <Image
                                    src="/images/dashboard/avatar-placeholder.png"
                                    layout="fill"
                                    alt="Avatar"
                                />
                            </div>
                            <Link href="#">Zobacz inwestycje</Link>
                        </div>
                        <div className={styles.currentInvestmentsWrapper}>
                            <div className={styles.textWrapper}>
                                <h3>Inwestycje aktualne</h3>
                                <p>Wartość wszystkich inwestycji aktualnych</p>
                            </div>
                            <div className={styles.dashMenuWrapper}>
                                <Image
                                    src="/images/dashboard/dashMenu.svg"
                                    layout="fill"
                                    alt="więcej opcji"
                                />
                                <button
                                    className={`${
                                        styles.currentInvestmentMenu
                                    } ${false ? styles.active : null}`}
                                >
                                    Zobacz
                                </button>
                            </div>
                        </div>
                        <div className={styles.activeInvestmentWrapper}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/dashboard/activeInvestment.svg"
                                    layout="fill"
                                    alt="Aktywne inwestycje"
                                />
                            </div>
                            <div className={styles.activeInvestmentContainer}>
                                <div className={styles.textContainer}>
                                    <h3>Aktywne</h3>
                                    <p>
                                        <span>
                                            {activeInvestments
                                                ? activeInvestments.value
                                                : 0}
                                        </span>
                                        <span>PLN</span>
                                    </p>
                                </div>
                                <h4>Łączna wartość aktywnych inwestycji</h4>
                            </div>
                        </div>
                        <div className={styles.delayedInvestmentWrapper}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/dashboard/delayedInvestment.svg"
                                    layout="fill"
                                    alt="Opóźnione inwestycje"
                                />
                            </div>
                            <div className={styles.delayedInvestmentContainer}>
                                <div className={styles.textContainer}>
                                    <h3>Opóźnione</h3>
                                    <p>
                                        <span>
                                            {delayedInvestments
                                                ? delayedInvestments.value
                                                : 0}
                                        </span>
                                        <span>PLN</span>
                                    </p>
                                </div>
                                <h4>
                                    Łączna wartość rat z opóźnieniem 30 dni lub
                                    więcej
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rigthWrapper}>
                        <input
                            type="month"
                            name="month"
                            id="month"
                            value={dateInput}
                            onChange={handleDateInputChange}
                            className={styles.month}
                        />
                        <div className={styles.chartWrapper}>
                            <h2>Wykres wielkości portfela</h2>
                            <div className={styles.chart}>
                                {" "}
                                <LineChart
                                    width={330}
                                    height={200}
                                    data={chartData}
                                    // margin={{ top: 10, bottom: 10, left: 20, right: 20 }}
                                >
                                    <Line
                                        type="monotone"
                                        dataKey="przewidywane"
                                        stroke="#4F4282"
                                        strokeWidth={3}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="wpływy"
                                        stroke="#1b8301"
                                        strokeWidth={3}
                                    />
                                    <CartesianGrid
                                        stroke="#ccc"
                                        strokeDasharray="5 5"
                                    />
                                    <XAxis dataKey="name" />
                                    {/* <YAxis /> */}
                                    <Tooltip />
                                </LineChart>
                            </div>
                            <div className={styles.chartStats}>
                                <div className={styles.chartActiveInvestment}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src="/images/dashboard/chartActiveInvestment.svg"
                                            layout="fill"
                                            alt="Aktywne inwestycje"
                                        />
                                    </div>
                                    <h3>Aktywnych</h3>
                                    <p>
                                        <span>
                                            {activeInvestments
                                                ? activeInvestments.length
                                                : 0}
                                        </span>
                                        <span>inwestycji</span>
                                    </p>
                                </div>
                                <div className={styles.chartFinishedInvestment}>
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            src="/images/dashboard/chartFinishedInvestment.svg"
                                            layout="fill"
                                            alt="Aktywne inwestycje"
                                        />
                                    </div>
                                    <h3>Zakończonych</h3>
                                    <p>
                                        <span>
                                            {finishedInvestments
                                                ? finishedInvestments.length
                                                : 0}
                                        </span>
                                        <span>inwestycji</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.expectedInvestmentWrapper}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/dashboard/expectedInvestment.svg"
                                    layout="fill"
                                    alt="Spodziewane inwestycje"
                                />
                            </div>
                            <div className={styles.expectedInvestmentContainer}>
                                <h3>
                                    <span>Spodziewane</span>
                                    <span>
                                        {incomeInvestments
                                            ? incomeInvestments.value
                                            : 0}
                                    </span>
                                    <span>PLN</span>
                                </h3>
                                <p>
                                    Łączna wartość inwestycji, które mają
                                    wpłynąć w tym miesiącu
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.operations}>
                    <div className={styles.freeAmountWrapper}>
                        <div className={styles.textWrapper}>
                            <h3>
                                <span>1000</span>
                                <span>PLN</span>
                            </h3>
                            <p>{getCurrentDateString()}</p>
                        </div>
                        <button className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/freeAmount.svg"
                                layout="fill"
                                alt="Przycisk pokaż"
                            />
                        </button>
                    </div>
                    <div className={styles.accountStatementsWrapper}>
                        <h3>Wyciągi z konta</h3>
                        {firstStatement ? (
                            <AccountStatements
                                id={firstStatement.id}
                                name={firstStatement.name}
                                date={firstStatement.createdAt}
                                isNew={true}
                            />
                        ) : null}
                        {secondStatement ? (
                            <AccountStatements
                                id={secondStatement.id}
                                name={secondStatement.name}
                                date={secondStatement.createdAt}
                                isNew={false}
                            />
                        ) : null}

                        <label
                            htmlFor="statement"
                            className={styles.statementButton}
                        >
                            <span>Prześlij wyciąg</span>
                            <input
                                type="file"
                                name="statement"
                                id="statement"
                                onChange={handleSendStatementFile}
                            />
                        </label>
                        <button
                            className={styles.statementButton}
                            onClick={() => router.push("/dashboard/operation")}
                        >
                            Pokaż listę operacji
                        </button>
                    </div>
                    <div className={styles.allInvestmentsWrapper}>
                        <h3>Wszystkie inwestycje inwestorów</h3>
                        <p>Wartość wszystkich inwestycji historycznie</p>
                        <div className={styles.allInvestmentsContainer}>
                            <h4>
                                <span>
                                    {allInvestments ? allInvestments.value : 0}
                                </span>
                                <span>PLN</span>
                            </h4>
                            <p>Wszystkie inwestycje</p>
                        </div>
                        <div className={styles.allInvestmentsContainer}>
                            <h4>
                                <span>
                                    {allInvestments
                                        ? allInvestments.commission
                                        : 0}
                                </span>
                                <span>PLN</span>
                            </h4>
                            <p>Twoja łączna prowizja</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

//? Components

const AccountStatements: NextPage<{
    id: string;
    name: string;
    date: Date;
    isNew: boolean;
}> = ({ id, name, date, isNew }) => {
    const [isActive, setIsActive] = useState(false);
    const dateInput = new Date(date);
    return (
        <div className={styles.accountStatements}>
            <div className={styles.imageWrapper}>
                <Image
                    src="/images/dashboard/activeInvestment.svg"
                    layout="fill"
                    alt="Aktywne inwestycje"
                />
            </div>
            <div className={styles.statementContent}>
                <h4>
                    <span>{name}</span>
                    <span>{getDate(dateInput)}</span>
                </h4>
                <p>{id}</p>
            </div>
            {isNew ? <div className={styles.newWrapper}>Nowy</div> : null}
            <div
                className={styles.moreOptions}
                onMouseEnter={() => setIsActive(true)}
                onMouseLeave={() => setIsActive(false)}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/dashboard/rightArrow.svg"
                        layout="fill"
                        alt="Więcej opcji"
                    />
                </div>
                <div
                    className={`${styles.options} ${
                        isActive ? styles.active : ""
                    }`}
                >
                    <button>Zobacz</button>
                    <button className={styles.button}>Usuń</button>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const response: responseI = { message: "OK", status: 200, data: {} };
    const urlActiveInvestments: RequestInfo = `${config.host}/users/investments/active`;
    const activeInvestments = await fetchData(urlActiveInvestments, { token });
    const urlAllInvestments: RequestInfo = `${config.host}/users/investments/all`;
    const allInvestments = await fetchData(urlAllInvestments, { token });
    const urlFinishedInvestments: RequestInfo = `${config.host}/users/investments/finished`;
    const finishedInvestments = await fetchData(urlFinishedInvestments, {
        token,
    });
    const urlDelayedInvestments: RequestInfo = `${config.host}/users/investments/delayed`;
    const delayedInvestments = await fetchData(urlDelayedInvestments, {
        token,
    });
    const urlIncomeInvestments: RequestInfo = `${config.host}/users/investments/income`;
    const incomeInvestments = await fetchData(urlIncomeInvestments, {
        token,
    });

    const urlStatements: RequestInfo = `${config.host}/users/statements`;
    const statementsResponse = await fetchData(urlStatements, {
        token,
    });
    if (allInvestments.response.data)
        response.data.all = allInvestments.response.data;
    if (activeInvestments.response.data)
        response.data.active = activeInvestments.response.data;
    if (finishedInvestments.response.data)
        response.data.finished = finishedInvestments.response.data;
    if (delayedInvestments.response.data)
        response.data.delayed = delayedInvestments.response.data;
    if (incomeInvestments.response.data)
        response.data.income = incomeInvestments.response.data;
    if (statementsResponse.response.data)
        response.data.statements = statementsResponse.response.data;
    return { props: { response } };
};

export default Dashboard;
