import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PermissionGate from "../components/PermissionGate";
import { responseI } from "../interfaces/general.interface";
import { PermissionE } from "../interfaces/permission.interface";
import { userResponseI, userStatusE } from "../interfaces/user.interface";

import styles from "../styles/users.module.scss";
import config from "../utils/config";
import useSession from "../utils/lib/useSession";
import useUser from "../utils/lib/useUser";
import { fetchData, MethodE } from "../utils/scripts/fetchData.script";
import { getDate } from "../utils/scripts/getDate.scripr";

const InvestorComponent: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variable
    const router = useRouter();
    const users: userResponseI[] = useMemo(
        () => response.data || [],
        [response]
    );

    //? Use state

    //? Use effect
    useSession();
    const { userPermission } = useUser();

    //? Methods
    const handleSort = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log("value :>> ", e.currentTarget.value);
    }, []);

    const usersList = useMemo(
        () => users.map((user) => <UserElement user={user} key={user.id} />),
        [users]
    );

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Użytkownicy | FinHouse</title>
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
                            className={`${styles.category} ${styles.active}`}
                            onClick={() => router.push("/users")}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src="/images/dashboard/users-active.svg"
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
                <div className={styles.investorWrapper}>
                    <div className={styles.headerWrapper}>
                        <h2>Zarządzanie użytkownikami</h2>

                        <select
                            name="sortList"
                            id="sortList"
                            className={styles.sortList}
                            onChange={handleSort}
                        >
                            <option value="alphabetUp">
                                Sortowanie po inwestorze od A do Z
                            </option>
                            <option value="alphabetDown">
                                Sortowanie po inwestorze od Z do A
                            </option>
                        </select>
                    </div>

                    <div className={styles.investorContainer}>
                        <div className={styles.listHeader}>
                            <h3 className={styles.name}>Użytkownik</h3>
                            <h3 className={styles.email}>E-mail</h3>
                            <h3 className={styles.tel}>Nr. tel</h3>
                            <h3 className={styles.date}>Data rejestracji</h3>
                            <h3 className={styles.status}>Status</h3>
                            <h3 className={styles.listButtons}>Przyciski</h3>
                        </div>
                        <div className={styles.listContent}>{usersList}</div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

//!! Do poprawy

const UserElement: NextPage<{ user: userResponseI }> = ({ user }) => {
    const {
        adress,
        email,
        investmentAmount,
        name,
        tel,
        admin,
        createdAt,
        id,
        status,
    } = user;
    const [currentStatus, setCurrentStatus] = useState(status);
    const { token } = useUser();
    const changeStatus = async (status: string, id: string) => {
        if (status === "accept") {
            if (currentStatus === userStatusE.INPROGRESS) {
                const url: RequestInfo = `${config.host}/admin/users/accept`;
                const { response } = await fetchData(url, {
                    token,
                    method: MethodE.PATCH,
                    data: JSON.stringify({ user: id }),
                    contentType: "application/json",
                });
                if (response.status === 200)
                    setCurrentStatus(userStatusE.ACCEPTED);
            }
        } else {
            if (currentStatus === userStatusE.INPROGRESS) {
                const url: RequestInfo = `${config.host}/admin/users/reject`;
                const { response } = await fetchData(url, {
                    token,
                    method: MethodE.PATCH,
                    data: JSON.stringify({ user: id }),
                    contentType: "application/json",
                });
                if (response.status === 200)
                    setCurrentStatus(userStatusE.REJECTED);
            }
        }
    };
    return (
        <div className={styles.investorElementWrapper}>
            <p className={styles.name}>{name}</p>
            <p className={styles.email}>{email}</p>
            <p className={styles.tel}>{tel}</p>
            <p className={styles.date}>{getDate(new Date(createdAt))}</p>
            <p className={styles.status}>{currentStatus}</p>
            <div className={styles.buttonWrapper}>
                <button
                    className={styles.imageWrapper}
                    onClick={() => changeStatus("accept", id)}
                >
                    {currentStatus === "W trakcie" ? (
                        <Image
                            src="/images/in-progress.svg"
                            alt="Zaakceptuj"
                            layout="fill"
                        />
                    ) : null}
                    {currentStatus === "Zaakceptowany" ? (
                        <Image
                            src="/images/accepted.svg"
                            alt="Zaakceptuj"
                            layout="fill"
                        />
                    ) : null}
                    {currentStatus === "Odrzucony" ? (
                        <Image
                            src="/images/checkbox-reject.svg"
                            alt="Zaakceptuj"
                            layout="fill"
                        />
                    ) : null}
                </button>
                <button
                    className={styles.imageWrapper}
                    onClick={() => changeStatus("reject", id)}
                >
                    {currentStatus === userStatusE.INPROGRESS ? (
                        <Image
                            src="/images/not-reject.svg"
                            alt="Odrzuć"
                            layout="fill"
                        />
                    ) : null}
                    {currentStatus === userStatusE.ACCEPTED ? (
                        <Image
                            src="/images/not-reject.svg"
                            alt="Odrzuć"
                            layout="fill"
                        />
                    ) : null}
                    {currentStatus === userStatusE.REJECTED ? (
                        <Image
                            src="/images/reject.svg"
                            alt="Odrzuć"
                            layout="fill"
                        />
                    ) : null}
                </button>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const { token } = context.req.cookies;
    const url: RequestInfo = `${config.host}/admin/users`;
    const { response } = await fetchData(url, {
        method: MethodE.GET,
        token: token,
        contentType: "application/json",
    });
    console.log("response :>> ", response);
    return { props: { response } };
};

export default InvestorComponent;
