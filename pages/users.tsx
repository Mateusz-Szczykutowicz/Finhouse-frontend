import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import styles from "../styles/investors.accept.module.scss";
import useSession from "../utils/lib/useSession";

const InvestorComponent: NextPage = () => {
    //? Variable
    const router = useRouter();

    //? Use state

    //? Use effect
    useSession();

    //? Methods
    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log("value :>> ", e.currentTarget.value);
    };

    // const investorsList = investors.map(
    //     ({ commission, contract, date, email, id, name, status, tel }) => (
    //         <InvestorElement
    //             commission={commission}
    //             contract={contract}
    //             date={new Date()}
    //             email={email}
    //             id={id}
    //             key={id}
    //             name={name}
    //             tel={tel}
    //         />
    //     )
    // );
    const usersList = null; //! Do zmiany

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
                        <h2>Akceptacja inwestora</h2>

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
                            <option value="amountDown">
                                Od największej kwoty zainwestowanej
                            </option>
                            <option value="amountUp">
                                Od najmniejszej kwoty zainwestowanej
                            </option>
                            <option value="commissionDown">
                                Od największej prowizji miesięcznej
                            </option>
                            <option value="commissionUp">
                                Od najmniejszej prowizji miesięcznej
                            </option>
                            <option value="installmentUp">
                                Od największej raty miesięcznej
                            </option>
                            <option value="installmentDown">
                                Od najmniejszej raty miesięcznej
                            </option>
                        </select>
                    </div>

                    <div className={styles.investorContainer}>
                        <div className={styles.listHeader}>
                            <h3 className={styles.name}>Inwestor</h3>
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

// const InvestorElement: NextPage= () => {
//     const [currentStatus, setCurrentStatus] = useState(status);
//     const changeStatus = (status: string) => {
//         if (status === "accept") {
//             if (currentStatus === investorStatus.INPROGRESS) {
//                 setCurrentStatus(investorStatus.ACCEPTED);
//             }
//         } else {
//             if (currentStatus === investorStatus.INPROGRESS) {
//                 setCurrentStatus(investorStatus.REJECTED);
//             }
//         }
//     };
//     return (
//         <div className={styles.investorElementWrapper}>
//             <p className={styles.name}>{name}</p>
//             <p className={styles.email}>{email}</p>
//             <p className={styles.tel}>{tel}</p>
//             <p className={styles.date}>24.05.2022r</p>
//             <p className={styles.status}>{currentStatus}</p>
//             <div className={styles.buttonWrapper}>
//                 <button
//                     className={styles.imageWrapper}
//                     onClick={() => changeStatus("accept")}
//                 >
//                     {currentStatus === "W trakcie" ? (
//                         <Image
//                             src="/images/in-progress.svg"
//                             alt="Zaakceptuj"
//                             layout="fill"
//                         />
//                     ) : null}
//                     {currentStatus === "Zaakceptowany" ? (
//                         <Image
//                             src="/images/accepted.svg"
//                             alt="Zaakceptuj"
//                             layout="fill"
//                         />
//                     ) : null}
//                     {currentStatus === "Odrzucony" ? (
//                         <Image
//                             src="/images/checkbox-reject.svg"
//                             alt="Zaakceptuj"
//                             layout="fill"
//                         />
//                     ) : null}
//                 </button>
//                 <button
//                     className={styles.imageWrapper}
//                     onClick={() => changeStatus("reject")}
//                 >
//                     {currentStatus === investorStatus.INPROGRESS ? (
//                         <Image
//                             src="/images/not-reject.svg"
//                             alt="Odrzuć"
//                             layout="fill"
//                         />
//                     ) : null}
//                     {currentStatus === investorStatus.ACCEPTED ? (
//                         <Image
//                             src="/images/not-reject.svg"
//                             alt="Odrzuć"
//                             layout="fill"
//                         />
//                     ) : null}
//                     {currentStatus === investorStatus.REJECTED ? (
//                         <Image
//                             src="/images/reject.svg"
//                             alt="Odrzuć"
//                             layout="fill"
//                         />
//                     ) : null}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export const getServerSideProps: GetServerSideProps<{
//     investors: investorResponseI[];
// }> = async (context) => {
//     const { token } = context.req.cookies;

//     const investorsResult = await fetch(
//         "http://localhost:3000/data/investors.json",
//         {
//             method: "GET",
//             headers: { token },
//         }
//     );
//     const { investors }: { investors: investorResponseI[] } =
//         await investorsResult.json();
//     return { props: { investors } };
// };

export default InvestorComponent;
