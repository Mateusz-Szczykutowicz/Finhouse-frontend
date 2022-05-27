import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
    investI,
    investorResponseI,
} from "../../interfaces/investor.interface";
import { getCookie } from "../../utils/scripts/cookie.script";

import styles from "../../styles/investments.create.module.scss";
import { responseI } from "../../interfaces/general.interface";
import useSession from "../../utils/lib/useSession";
import { fetchData } from "../../utils/scripts/fetchData.script";

const Investments: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const data: [{ investor: investorResponseI; invest: investI }] =
        response.data || [];
    const file: any = "";
    //? Use state
    const [isGraceActive, setIsGraceActive] = useState(false);
    const [isChooseFile, setIsChooseFile] = useState(false);
    const [isAnotherCommission, setIsAnotherCommission] = useState(false);
    const [investorId, setInvestorId] = useState(
        data.length > 0 ? data[0].investor.id : ""
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [firstInstallment, setFirstInstallment] = useState("");
    const [lastInstallment, setLastInstallment] = useState("");
    const [investorCapital, setInvestorCapital] = useState("");
    const [commissionAmount, setCommissionAmount] = useState("");
    const [installmentAmount, setInstallmentAmount] = useState("");
    const [numberOfInstallment, setNumberOfInstallment] = useState("");
    const [gracePeriod, setGracePeriod] = useState("");
    const [otherCommission, setOtherCommission] = useState("");
    const [contract, setContract] = useState(file);

    //? Use effect
    useSession();

    //? Methods
    const handleChangeFileInput = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.value) {
            setContract(e.currentTarget.files[0]);
            setIsChooseFile(true);
        } else {
            setContract({ name: "Prześlij podpisaną umowę" });
            setIsChooseFile(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = getCookie("token");
        const investmentData = new FormData();
        investmentData.append("commissionAmount", commissionAmount);
        investmentData.append("contract", contract);
        investmentData.append("email", email);
        investmentData.append("firstInstallment", firstInstallment);
        investmentData.append("gracePeriod", gracePeriod);
        investmentData.append("installmentAmount", installmentAmount);
        investmentData.append("investorCapital", investorCapital);
        investmentData.append("investorId", investorId);
        investmentData.append("lastInstallment", lastInstallment);
        investmentData.append("name", name);
        investmentData.append("numberOfInstallment", numberOfInstallment);
        investmentData.append("otherCommission", otherCommission);
        investmentData.append("tel", tel);
        const investmentURL = new URL("http://localhost:8000/investments");
        const investmentResponse = await fetchData(investmentURL, {
            token,
            method: "POST",
            data: investmentData,
        });
        if (investmentResponse.response.status === 400) {
            alert("Wypełnij wszystkie wymagane pola!");
        }
        console.log("response :>> ", response);
    };

    const investorsList = data.map((e) => (
        <option key={e.investor.id} value={e.investor.id}>
            {e.investor.name}
        </option>
    ));

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Nowa inwestycja | FinHouse</title>
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
                        className={`${styles.category} ${styles.active}`}
                        onClick={() => router.push("/investments/create")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/investment-active.svg"
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
                <div className={styles.investmentWrapper}>
                    <h2>Wprowadzanie inwestycji</h2>
                    <form
                        action="#"
                        method="post"
                        className={styles.newInvestment}
                        onSubmit={handleSubmit}
                    >
                        <label
                            htmlFor="investorsList"
                            className={styles.selectWrapper}
                        >
                            <select
                                name="investorsList"
                                id="investorsList"
                                className={styles.investorList}
                                value={investorId}
                                onChange={(e) => {
                                    setInvestorId(e.target.value);
                                }}
                            >
                                <option disabled>
                                    * Nazwa inwestora do jakiego przypisać
                                    inwestycję
                                </option>
                                {investorsList}
                            </select>
                        </label>

                        <input
                            type="text"
                            name="borrower"
                            id="borrower"
                            placeholder="* Nazwa Pożyczkobiorcy"
                            className={styles.bigInput}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="* Email pożyczkobiorcy"
                                className={styles.smallInput}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                placeholder="* Nr. telefonu Pożyczkobiorcy"
                                className={styles.smallInput}
                                value={tel}
                                onChange={(e) => {
                                    setTel(e.target.value);
                                }}
                            />
                            <label
                                htmlFor="startDate"
                                className={styles.smallInput}
                            >
                                <span>Data pierwszej raty:</span>
                                <input
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    placeholder="Data pierwszej raty"
                                    value={firstInstallment}
                                    onChange={(e) => {
                                        setFirstInstallment(e.target.value);
                                    }}
                                />
                            </label>
                            <label
                                htmlFor="finishDate"
                                className={styles.smallInput}
                            >
                                <span>Data ostatniej raty:</span>
                                <input
                                    type="date"
                                    name="finishDate"
                                    id="finishDate"
                                    value={lastInstallment}
                                    onChange={(e) => {
                                        setLastInstallment(e.target.value);
                                    }}
                                />
                            </label>
                            <input
                                type="number"
                                name="capital"
                                id="capital"
                                placeholder="* Kapitał inwestora"
                                className={styles.smallInput}
                                value={investorCapital}
                                onChange={(e) => {
                                    setInvestorCapital(e.target.value);
                                }}
                            />
                            <input
                                type="number"
                                name="commission"
                                id="commission"
                                placeholder="* Kwota prowizji"
                                className={styles.smallInput}
                                value={commissionAmount}
                                onChange={(e) => {
                                    setCommissionAmount(e.target.value);
                                }}
                            />
                            <input
                                type="number"
                                name="installment"
                                id="installment"
                                placeholder="* Kwota raty"
                                className={styles.smallInput}
                                value={installmentAmount}
                                onChange={(e) => {
                                    setInstallmentAmount(e.target.value);
                                }}
                            />
                            <input
                                type="number"
                                name="numberOfInstallment"
                                id="numberOfInstallment"
                                placeholder="* Ilość rat"
                                className={styles.smallInput}
                                value={numberOfInstallment}
                                onChange={(e) => {
                                    setNumberOfInstallment(e.target.value);
                                }}
                            />
                        </div>
                        <label
                            htmlFor="not-grace"
                            className={styles.radioButtonWrapper}
                        >
                            <span
                                className={isGraceActive ? "" : styles.active}
                                onClick={() => setIsGraceActive(false)}
                            >
                                Bez karencji
                            </span>
                            <input
                                type="radio"
                                name="grace"
                                id="not-grace"
                                className={styles.radioButton}
                            />

                            <span
                                className={isGraceActive ? styles.active : ""}
                                onClick={() => setIsGraceActive(true)}
                            >
                                Karencja
                            </span>
                            <input
                                type="radio"
                                name="grace"
                                id="grace"
                                className={styles.radioButton}
                            />
                        </label>
                        <input
                            type="number"
                            name="gracePeriod"
                            id="gracePeriod"
                            placeholder="Ilość miesięcy karencji"
                            className={styles.smallInput}
                            disabled={!isGraceActive}
                            value={gracePeriod}
                            onChange={(e) => {
                                setGracePeriod(e.target.value);
                            }}
                        />
                        <label htmlFor="file" className={styles.fileWrapper}>
                            <span
                                className={`${styles.fileButton} ${
                                    isChooseFile ? styles.active : ""
                                }`}
                            >
                                {isChooseFile
                                    ? contract.name
                                    : "Prześlij podpisaną umowę"}
                            </span>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                onChange={handleChangeFileInput}
                            />
                        </label>
                        <label
                            htmlFor="anotherCommission"
                            className={`${styles.anotherCommission} ${
                                isAnotherCommission ? styles.active : ""
                            }
                            `}
                        >
                            <input
                                type="checkbox"
                                name="anotherCommission"
                                id="anotherCommission"
                                onClick={() =>
                                    setIsAnotherCommission(!isAnotherCommission)
                                }
                            />
                            <span>Inna prowizja za obsługę</span>
                        </label>
                        <label
                            htmlFor="percentageCommission"
                            className={styles.percentageCommissionWrapper}
                        >
                            <input
                                type="number"
                                name="percentageCommission"
                                id="percentageCommission"
                                min={0}
                                max={100}
                                step={0.01}
                                placeholder="Prowizja"
                                className={styles.percentageCommission}
                                disabled={!isAnotherCommission}
                                value={otherCommission}
                                onChange={(e) => {
                                    setOtherCommission(e.target.value);
                                }}
                            />
                            <span>%</span>
                        </label>
                        <button type="submit" className={styles.sendData}>
                            Zapisz
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const token = context.req.cookies.token;
    const investorsResult = await fetch("http://localhost:8000/investors", {
        headers: { token: token, "Context-Type": "application/json" },
    });
    const response: responseI = await investorsResult.json();
    return { props: { response } };
};

export default Investments;
