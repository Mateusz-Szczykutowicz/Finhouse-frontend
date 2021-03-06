import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FormEvent, useCallback, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/register.module.scss";
import { userI } from "../interfaces/user.interface";
import { useRouter } from "next/router";
import { responseI } from "../interfaces/general.interface";
import config from "../utils/config";

const Register: NextPage = () => {
    //? Variables
    const router = useRouter();

    //? Use state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [investmentAmount, setInvestmentAmount] = useState("");
    const [adress, setAdress] = useState("");

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            const registerData: userI = {
                adress,
                email: email.toLowerCase(),
                investmentAmount,
                name,
                password,
                tel,
            };
            const registerResult = await fetch(
                `${config.host}/users/register`,
                {
                    method: "POST",
                    body: JSON.stringify(registerData),
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const response: responseI = await registerResult.json();
            if (response.status === 201) {
                router.push("/check");
            }
            console.log("response :>> ", response);
        },
        [name, password, router, adress, email, investmentAmount, tel]
    );

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
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Has??o"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="retypePassword"
                            id="retypePassword"
                            placeholder="Powt??rz has??o"
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Imi?? i nazwisko"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder="Numer telefonu w formacie 000000000"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            required
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
                            required
                        />
                        <input
                            type="text"
                            name="adress"
                            id="adress"
                            placeholder="Pe??en adres korespondencyjny "
                            value={adress}
                            onChange={(e) => setAdress(e.target.value)}
                            required
                        />
                        <button type="submit">Zarejestruj si??</button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
