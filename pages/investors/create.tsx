import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { investorI } from "../../interfaces/investor.interface";

import styles from "../../styles/investor.create.module.scss";
import useSession from "../../utils/lib/useSession";
import { getCookie } from "../../utils/scripts/cookie.script";

const CreateInvestorComponent: NextPage = () => {
    //? Variable
    const router = useRouter();

    //? Use state
    const [isChooseFile, setIsChooseFile] = useState(false);
    let filePlaceholder: any;
    const [file, setFile] = useState(filePlaceholder);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [commission, setCommission] = useState("");

    //? Use effect
    useSession();

    //? Methods
    const handleChangeFileInput = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.value) {
            setFile(e.currentTarget.files[0]);
            setIsChooseFile(true);
        } else {
            setFile({ name: "Prześlij podpisaną umowę z investorem" });
            setIsChooseFile(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const token = getCookie("token");
        console.log("token :>> ", token);

        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("tel", tel);
        data.append("commission", commission);
        data.append("file", file, "file");
        const investorResponse = await fetch(
            "http://localhost:8000/investors",
            {
                method: "POST",
                headers: {
                    token,
                },
                body: data,
            }
        );
        const response = await investorResponse.json();
        if (response.status === 201) {
            setFile({ name: "Prześlij podpisaną umowę z inwestorem" });
            setName("");
            setEmail("");
            setTel("");
            setCommission("");
            router.push("/investors");
        } else if (response.status === 400) {
            alert("Jedno z pól jest puste!");
        }
        console.log("response :>> ", response);
    };

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Nowy inwestor | FinHouse</title>
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
                <div className={styles.investorWrapper}>
                    <h2>Wprowadzanie inwestora</h2>
                    <div className={styles.investorContainer}>
                        <form action="#" method="post" onSubmit={handleSubmit}>
                            <div className={styles.textInputWrapper}>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={styles.textInput}
                                    placeholder="* Nazwa (imię i nazwisko)"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="tel"
                                    name="tel"
                                    id="tel"
                                    className={styles.textInput}
                                    placeholder="* Nr. telefonu"
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={styles.textInput}
                                    placeholder="* E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <input
                                    type="number"
                                    name="commission"
                                    id="commission"
                                    className={styles.textInput}
                                    placeholder="* Prowizja za obsługę w %"
                                    step={0.01}
                                    min={0}
                                    max={100}
                                    value={commission}
                                    onChange={(e) =>
                                        setCommission(e.target.value)
                                    }
                                />
                            </div>
                            <label htmlFor="contract">
                                <span>
                                    {isChooseFile
                                        ? file.name
                                        : "Prześlij podpisaną umowę z inwestorem"}
                                </span>
                                <input
                                    type="file"
                                    name="contract"
                                    id="contract"
                                    placeholder="Prześlij podpisaną umowę z inwestorem"
                                    className={styles.contractInput}
                                    onChange={handleChangeFileInput}
                                />
                                <input
                                    type="checkbox"
                                    name="isContract"
                                    id="isContract"
                                    className={styles.contractCheckbox}
                                    checked={isChooseFile}
                                    onChange={() => {}}
                                />
                                <div className={styles.checkboxComponent}>
                                    {isChooseFile ? (
                                        <Image
                                            src="/images/checkbox-active.svg"
                                            layout="fill"
                                            alt="checkbox"
                                        />
                                    ) : (
                                        <Image
                                            src="/images/checkbox.svg"
                                            layout="fill"
                                            alt="checkbox"
                                        />
                                    )}
                                </div>
                            </label>
                            <button type="submit" className={styles.send}>
                                Dodaj inwestora
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreateInvestorComponent;
