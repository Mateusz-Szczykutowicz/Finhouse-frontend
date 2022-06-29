import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useMemo, useState } from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Modal from "../../../components/Modal";
import PermissionGate from "../../../components/PermissionGate";
import { responseI } from "../../../interfaces/general.interface";
import {
    installmentResponseI,
    InstallmentStatusE,
} from "../../../interfaces/installment.interface";
import { investmentResponseI } from "../../../interfaces/investments.interface";
import { PermissionE } from "../../../interfaces/permission.interface";
import styles from "../../../styles/investments.id.module.scss";
import config from "../../../utils/config";
import useSession from "../../../utils/lib/useSession";
import useUser from "../../../utils/lib/useUser";
import { fetchData, MethodE } from "../../../utils/scripts/fetchData.script";
import {
    getDate,
    getDayDifference,
} from "../../../utils/scripts/getDate.scripr";

const Investments: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const investment: investmentResponseI = useMemo(
        () => response.data.investment,
        [response]
    );
    const installments: installmentResponseI[] = useMemo(
        () => response.data.installments || [],
        [response]
    );
    const value: number = useMemo(() => response.data.value, [response]);
    const delay: number = useMemo(() => response.data.delay, [response]);
    const investmentPlaceholder: investmentResponseI = useMemo(() => {
        return {
            commissionAmount: 0,
            contract: "",
            email: "",
            firstInstallment: new Date(),
            gracePeriod: 0,
            id: "",
            installmentAmount: 0,
            investorCapital: 0,
            investorId: "",
            lastInstallment: new Date(),
            name: "",
            numberOfInstallment: 0,
            tel: "",
        };
    }, []);
    const {
        id,
        firstInstallment,
        lastInstallment,
        investorCapital,
        installmentAmount,
        commissionAmount,
        numberOfInstallment,
        contract,
        gracePeriod,
        investorId,
    } = useMemo(
        () => investment || investmentPlaceholder,
        [investment, investmentPlaceholder]
    );
    const router = useRouter();
    const startDate = useMemo(
        () => new Date(firstInstallment),
        [firstInstallment]
    );
    const endDate = useMemo(() => new Date(lastInstallment), [lastInstallment]);
    const smsSentDate = useMemo(() => new Date(), []);
    const emailSentDate = useMemo(() => new Date(), []);

    //? Use state
    const [showModal, setShowModal] = useState(false);

    //? Use effects
    useSession();
    const { token, userPermission } = useUser();
    const [name, setName] = useState(investment ? investment.name : "");
    const [email, setEmail] = useState(investment ? investment.email : "");
    const [tel, setTel] = useState(investment ? investment.tel : "");

    //? Methods
    const installmentsList = useMemo(
        () =>
            installments.map((installment, index) => (
                <InstallmentElement
                    installment={installment}
                    key={installment.id}
                    index={index}
                />
            )),
        [installments]
    );
    const files = useMemo(() => contract.split(", "), [contract]);
    const fileList = useMemo(
        () =>
            files.map((fileName) => (
                <FileElement
                    key={fileName}
                    id={id}
                    token={token}
                    fileName={fileName}
                />
            )),
        [files, id, token]
    );

    const handleEditInvestment = useCallback(
        async (e: FormEvent<HTMLElement>) => {
            e.preventDefault();
            const data = {
                name: name === "" ? investment.name : name,
                email: email === "" ? investment.email : email,
                tel: tel === "" ? investment.tel : tel,
                id,
            };
            const editInvestmentURL: RequestInfo = `${config.host}/investments`;
            const { response } = await fetchData(editInvestmentURL, {
                token,
                contentType: "application/json",
                data: JSON.stringify(data),
                method: MethodE.PUT,
            });
            console.log("response :>> ", response);
            if (response.status === 200) {
                alert("Pomyślnie zaktualizowano");
                setShowModal(false);
                router.push(`/investments/id/${id}`);
            } else {
                alert("Coś poszło nie tak");
            }
        },
        [email, id, name, tel, investment, token, router]
    );

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
                    <h2>Inwestycja</h2>
                    <div className={styles.investmentsContainer}>
                        <button
                            className={styles.showModal}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowModal(true);
                            }}
                        >
                            <Image
                                src="/images/editInvestor.svg"
                                layout="fill"
                                alt="Edytuj"
                            />
                        </button>
                        <Modal
                            title="Edytuj Inwestycje"
                            onClose={() => setShowModal(false)}
                            show={showModal}
                            // key={`modal-${id}`}
                        >
                            <form
                                action="#"
                                method="post"
                                onSubmit={handleEditInvestment}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder={
                                        investment ? investment.name : ""
                                    }
                                    className={styles.investorDataField}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder={
                                        investment ? investment.email : ""
                                    }
                                    className={styles.investorDataField}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    type="tel"
                                    name="tel"
                                    id="tel"
                                    placeholder={
                                        investment ? investment.tel : ""
                                    }
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
                        </Modal>
                        <div className={styles.headerContainer}>
                            <div className={styles.leftWrapper}>
                                <h3>{investment.name}</h3>
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
                                    <span>{delay}</span>
                                </div>
                            </div>
                            <div className={styles.rightWrapper}>
                                <div className={styles.email}>
                                    <span>E-mail:</span>
                                    <a href={`mailto:${email}`}>
                                        {investment.email}
                                    </a>
                                </div>
                                <div className={styles.tel}>
                                    <span>Nr. tel</span>
                                    <a href={`tel:+48${tel}`}>
                                        {investment.tel}
                                    </a>
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
                                    <span>Karencja:</span>
                                    <span>
                                        {gracePeriod > 0 ? "TAK" : "NIE"}
                                    </span>
                                    <span>
                                        {gracePeriod > 0 ? gracePeriod : null}
                                    </span>
                                    <span>
                                        {gracePeriod > 0 ? "msc." : null}
                                    </span>
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
                                    <span>
                                        {(
                                            commissionAmount /
                                            numberOfInstallment
                                        ).toFixed(2)}
                                    </span>
                                    <span>PLN</span>
                                </p>
                                <p>
                                    <span>
                                        Łącznie zaległe raty lub niedopłata
                                    </span>
                                    <span>{value}</span>
                                    <span>PLN</span>
                                </p>
                            </div>
                        </div>
                        <div className={styles.documentsWrapper}>
                            <p>Dokumenty do pobrania</p>
                            <div className={styles.filesWrapper}>
                                {fileList}
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

const FileElement: NextPage<{
    id: string;
    fileName: string;
    token: string;
}> = ({ token, fileName, id }) => {
    const router = useRouter();
    const handleFileDownload = async () => {
        router.push(`${config.host}/investments/id/${id}/contract/${fileName}`);
    };
    return (
        <div className={styles.fileWrapper}>
            <div className={styles.imageWrapper}>
                <Image src="/images/file.svg" layout="fill" alt="File" />
            </div>
            <div className={styles.fileNameWrapper}>
                <span>{fileName}</span>
                <div className={styles.tooltip}>{fileName}</div>
            </div>
            <button
                className={styles.imageWrapper}
                onClick={handleFileDownload}
            >
                <Image
                    src="/images/download-file.svg"
                    layout="fill"
                    alt="File"
                />
            </button>
        </div>
    );
};

const InstallmentElement: NextPage<{
    installment: installmentResponseI;
    index: number;
}> = ({ installment, index }) => {
    const { initialAmount, paidAmount, startDate } = useMemo(
        () => installment,
        [installment]
    );
    const installmentDate = useMemo(() => new Date(startDate), [startDate]);
    const now = useMemo(() => new Date(), []);
    const dayDiff = useMemo(
        () => getDayDifference(now, installmentDate),
        [now, installmentDate]
    );
    let installmentStatus = useMemo(() => InstallmentStatusE.TOPAY, []);
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
    response: responseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const { id } = context.params || { id: "" };

    const investmentURL: RequestInfo = `${config.host}/investments/id/${id}/`;
    const installmentURL: RequestInfo = `${config.host}/investments/id/${id}/installments`;
    const delayURL: RequestInfo = `${config.host}/investments/${id}/delay`;
    const investmentResult = await fetchData(investmentURL, { token });
    const installmentsResult = await fetchData(installmentURL, { token });
    const delayResult = await fetchData(delayURL, { token });
    const investment: investmentResponseI = investmentResult.response.data
        ? investmentResult.response.data
        : null;
    const installments: installmentResponseI[] = investmentResult.response.data
        ? installmentsResult.response.data.installments
        : [];
    const value: number = installmentsResult.response.data
        ? installmentsResult.response.data.value
        : 0;
    const delay: number = delayResult.response.data
        ? delayResult.response.data
        : 0;
    const response = {
        status: 200,
        message: "OK",
        data: { installments, investment, value, delay },
    };
    return { props: { response } };
};

export default Investments;
