import { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";

import styles from "../styles/check.module.scss";

const Check: NextPage = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/dashboard/check.svg"
                        layout="fill"
                        alt="Check your email"
                    />
                    <h2>Sprawdź swoją skrzynkę e-mailową</h2>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Check;
