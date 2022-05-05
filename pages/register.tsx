import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import styles from "../styles/register.module.scss";

const Register: NextPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [adress, setAdress] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Register | FinHouse</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/register.png"
                        layout="fill"
                        alt="Register"
                    />
                    <form
                        action="#"
                        method="post"
                        className={styles.formWrapper}
                        onSubmit={handleSubmit}
                    >
                        <h2>Rejestracja</h2>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Hasło"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            name="retypePassword"
                            id="retypePassword"
                            placeholder="Powtórz hasło"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Imię i nazwisko"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder="Numer telefonu w formacie 000000000"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                        <input
                            type="text"
                            name="investmentAmount"
                            id="investmentAmount"
                            placeholder="Deklarowana kwota inwestycji"
                            value={investmentAmount}
                            onChange={(e) =>
                                setInvestmentAmount(e.target.value)
                            }
                        />
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            placeholder="Pełen adres korespondencyjny "
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                        />
                        <button type="submit">Zarejestruj się</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
