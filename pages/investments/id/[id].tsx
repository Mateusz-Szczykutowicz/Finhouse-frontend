import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import {
    installmentResponseI,
    InstallmentStatusE,
} from "../../../interfaces/installment.interface";
import { investmentResponseI } from "../../../interfaces/investments.interface";
import { investorI } from "../../../interfaces/investor.interface";

import styles from "../../../styles/investments.id.module.scss";
import useSession from "../../../utils/lib/useSession";
import { fetchData } from "../../../utils/scripts/fetchData.script";
import {
    getDate,
    getDayDifference,
} from "../../../utils/scripts/getDate.scripr";

const Investments: NextPage<{
    investment: investmentResponseI;
    installments: installmentResponseI[];
}> = ({ investment, installments }) => {
    //? Variables
    const {
        id,
        name,
        firstInstallment,
        lastInstallment,
        investorCapital,
        installmentAmount,
        commissionAmount,
        numberOfInstallment,
        email,
        tel,
        contract,
        gracePeriod,
        investorId,
    } = investment;

    const router = useRouter();
    const startDate = new Date(firstInstallment);
    const endDate = new Date(lastInstallment);
    const smsSentDate = new Date();
    const emailSentDate = new Date();

    //? Use state

    //? Use effects
    useSession();

    //? Methods
    const installmentsList = installments.map((installment, index) => (
        <InstallmentElement
            installment={installment}
            key={installment.id}
            index={index}
        />
    ));

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
                    <h2>Inwestycja</h2>
                    <div className={styles.investmentsContainer}>
                        <div className={styles.headerContainer}>
                            <div className={styles.leftWrapper}>
                                <h3>{name}</h3>
                                <div className={styles.date}>
                                    <span>Pożyczka od</span>
                                    <span>{getDate(startDate)}</span>
                                    <span>do</span>
                                    <span>{getDate(endDate)}</span>
                                </div>
                                <div className={styles.paymentDelay}>
                                    <span>
                                        Łączne opóźnienie w całej pożyczce w
                                        dniach:
                                    </span>
                                    <span>{50}</span>
                                </div>
                            </div>
                            <div className={styles.rightWrapper}>
                                <div className={styles.email}>
                                    <span>E-mail:</span>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </div>
                                <div className={styles.tel}>
                                    <span>Nr. tel</span>
                                    <a href={`tel:+48${tel}`}>{tel}</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button>Wyślij SMS o zaległości</button>
                            <button>Wyślij E-mail o zaległości</button>
                        </div>
                        <div className={styles.contentContainer}>
                            <div className={styles.leftWrapper}>
                                <div className={styles.numberOfInstallment}>
                                    <span>Liczba rat:</span>
                                    <span>{numberOfInstallment}</span>
                                </div>
                                <div className={styles.gracePeriod}>
                                    <span>Karencja</span>
                                    <span>
                                        {gracePeriod > 0 ? "TAK" : "NIE"}
                                    </span>
                                    <span>{gracePeriod}</span>
                                    <span>msc.</span>
                                </div>
                                <div className={styles.smsSentWrapper}>
                                    <span>Ostatnio wysłany SMS:</span>
                                    <span>{getDate(smsSentDate)}</span>
                                </div>
                                <div className={styles.emailSentWrapper}>
                                    <span>Ostatnio wysłane e-mail:</span>
                                    <span>{getDate(emailSentDate)}</span>
                                </div>
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
                                    <span>
                                        Łącznie zaległe raty lub niedopłata
                                    </span>
                                    <span>{509}</span>
                                    <span>PLN</span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.documentsWrapper}>
                            <p>Dokument do pobrania</p>
                            <div className={styles.fileWrapper}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src="/images/file.svg"
                                        layout="fill"
                                        alt="File"
                                    />
                                </div>
                                <p>{"Nazwa pliku"}</p>
                                <button className={styles.imageWrapper}>
                                    <Image
                                        src="/images/download-file.svg"
                                        layout="fill"
                                        alt="File"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className={styles.installmentWrapper}>
                            <div className={styles.installmentHeaderWrapper}>
                                <p>Rata</p>
                                <p>Termin raty</p>
                                <p>Do zapłaty</p>
                                <p>Kwota zapłacona</p>
                                <p>Status</p>
                                <p>Data statusu</p>
                            </div>
                            {installmentsList}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const InstallmentElement: NextPage<{
    installment: installmentResponseI;
    index: number;
}> = ({ installment, index }) => {
    const { endDate, id, initialAmount, paidAmount, startDate, paymentDelay } =
        installment;
    const installmentDate = new Date(endDate);
    const now = new Date();
    const dayDiff = getDayDifference(now, installmentDate);
    let installmentStatus = InstallmentStatusE.TOPAY;
    console.log("REST :>> ", initialAmount - paidAmount);
    if (initialAmount - paidAmount > 0) {
        if (dayDiff > 0) {
            installmentStatus = InstallmentStatusE.LATE;
        }
    } else {
        installmentStatus = InstallmentStatusE.PAID;
    }

    return (
        <div
            className={`${styles.installmentContainer}
            ${
                installmentStatus === InstallmentStatusE.TOPAY
                    ? styles.toPay
                    : ""
            }
            ${installmentStatus === InstallmentStatusE.LATE ? styles.late : ""}
            ${
                installmentStatus === InstallmentStatusE.LATE && dayDiff > 30
                    ? styles.bigLate
                    : ""
            }
            ${installmentStatus === InstallmentStatusE.PAID ? styles.paid : ""}
            `}
        >
            <p>
                <span>Rata</span>
                <span>{index + 1}</span>
            </p>
            <p>{getDate(installmentDate)}</p>
            <p>
                <span>{initialAmount}</span>
                <span>zł</span>
            </p>
            <p>
                <span>{paidAmount}</span>
                <span>zł</span>
            </p>
            <p>{installmentStatus}</p>
            <p>
                {dayDiff > 0 && installmentStatus !== InstallmentStatusE.PAID
                    ? `${Math.floor(dayDiff).toString()} dni`
                    : getDate(
                          new Date(
                              installmentDate.setDate(
                                  installmentDate.getDate() + 1
                              )
                          )
                      )}
            </p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    investment: investmentResponseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const { id } = context.params || { id: "" };

    const investmentURL = new URL(
        `http://localhost:8000/investments/id/${id}/`
    );
    const installmentURL = new URL(
        `http://localhost:8000/investments/id/${id}/installments`
    );
    const investmentResult = await fetchData(investmentURL, { token });
    const installmentsResult = await fetchData(installmentURL, { token });
    const response = await investmentResult.response;
    const response2 = await installmentsResult.response;
    const investment: investmentResponseI = response.data;
    const installments: installmentResponseI[] = response2.data;
    console.log("investment :>> ", investment);
    console.log("installments :>> ", installments);
    return { props: { investment, installments } };
};

export default Investments;
