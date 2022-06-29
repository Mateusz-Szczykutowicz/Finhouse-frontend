import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import styles from "../../../styles/investors.id.module.scss";
import {
    getCurrentDateString,
    getCurrentMonth,
} from "../../../utils/scripts/getDate.scripr";
import useSession from "../../../utils/lib/useSession";
import useUser from "../../../utils/lib/useUser";
import PermissionGate from "../../../components/PermissionGate";
import { PermissionE } from "../../../interfaces/permission.interface";
//* Main component
const Dashboard: NextPage = () => {
    //? Variables
    const router = useRouter();

    //? Use state
    const [dateInput, setDateInput] = useState(getCurrentMonth());

    //? Use effect
    useSession();
    const { userPermission } = useUser();

    //? Methods
    const handleDateInputChange = useCallback(
        (e: FormEvent<HTMLInputElement>) => {
            console.log("e.value :>> ", e.currentTarget.value);
            setDateInput(e.currentTarget.value);

            //! Dodać wysyłanie do bazy danych o zmianę danych
        },
        []
    );

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Panel Aneta Nowak | FinHouse</title>
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
                        <h2>Panel Aneta Nowak</h2>
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
                                        <span>240</span>
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
                                        <span>1000</span>
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
                            <div className={styles.chart}>chart</div>
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
                                        <span>200</span>
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
                                        <span>12</span>
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
                                    <span>1200</span>
                                    <span>PLN</span>
                                </h3>
                                <p>
                                    Łączna wartość inwestycji, które mają
                                    wpłynąć w tym miesiącu łącznie z
                                    niezapłaconymi ratami z poprzednich miesięcy
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
                        <AccountStatements
                            id="52164266224976524 46851"
                            name="Jonatan"
                            surname="XYZ"
                            date="25.06.2022r."
                            isNew={true}
                        />
                        <AccountStatements
                            id="52164266224976524 46851"
                            name="Jonatan"
                            surname="XYZ"
                            date="12.01.2022r."
                            isNew={false}
                        />
                        <button className={styles.statementButton}>
                            Prześlij wyciąg
                        </button>
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
                                <span>25000</span>
                                <span>PLN</span>
                            </h4>
                            <p>Wszystkie inwestycje</p>
                        </div>
                        <div className={styles.allInvestmentsContainer}>
                            <h4>
                                <span>7000</span>
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
    surname: string;
    date: string;
    isNew: boolean;
}> = ({ id, name, surname, date, isNew }) => {
    const [isActive, setIsActive] = useState(false);
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
                    <span>{surname}</span>
                    <span>{date}</span>
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

export default Dashboard;
