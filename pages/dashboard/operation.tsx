import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PermissionGate from "../../components/PermissionGate";
import { responseI } from "../../interfaces/general.interface";
import { OperationI } from "../../interfaces/operation.interface";
import { PermissionE } from "../../interfaces/permission.interface";

import styles from "../../styles/operation.module.scss";
import config from "../../utils/config";
import useSession from "../../utils/lib/useSession";
import useUser from "../../utils/lib/useUser";
import { fetchData } from "../../utils/scripts/fetchData.script";
import { getDate } from "../../utils/scripts/getDate.scripr";

const Operation: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const operations: OperationI[] = useMemo(
        () => response.data || [],
        [response]
    );

    //? Use state

    //? Use effect
    useSession();
    const { userPermission } = useUser();

    //? Methods
    const operationsList = useMemo(
        () =>
            operations.map((operation) => (
                <OperationElement operation={operation} key={operation.id} />
            )),
        [operations]
    );
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
                <div className={styles.operationWrapper}>
                    <h2>Lista operacji</h2>
                    <div className={styles.operationContainer}>
                        <div className={styles.operationHeader}>
                            <p className={styles.first}>Płatnik</p>
                            <p className={styles.second}>Tytuł</p>
                            <p className={styles.third}>Kwota</p>
                            <p className={styles.fourth}>Data</p>
                        </div>
                        {operationsList}
                    </div>
                    {/* <div className={styles.navWrapper}>
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
                    </div> */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

const OperationElement: NextPage<{
    operation: OperationI;
}> = ({ operation }) => {
    const { amount, createdAt, name, title } = operation;
    const date = new Date(createdAt);
    return (
        <div className={styles.operationElementWrapper}>
            <p className={styles.first}>{name}</p>
            <p className={styles.second}>{title}</p>
            <p className={styles.third}>
                <span>{amount}</span>
                <span>PLN</span>
            </p>
            <p className={styles.fourth}>{getDate(date)}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const url: RequestInfo = `${config.host}/users/operations`;
    const { response } = await fetchData(url, { token });
    return { props: { response } };
};

export default Operation;
