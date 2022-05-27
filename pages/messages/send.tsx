import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { investorResponseI } from "../../interfaces/investor.interface";

import styles from "../../styles/message.send.module.scss";
import useSession from "../../utils/lib/useSession";

const SendMessage: NextPage = () => {
    //? Variables
    const router = useRouter();

    //? Use state
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");

    //? Use effect
    useSession();

    //? Methods
    const handleSubmit = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
    };

    // const investorsList = investors.map((investor) => (
    //     <Investor key={investor.id} investor={investor} />
    // ));
    const investorsList = null; //!! do wymiany
    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Wiadomości | FinHouse</title>
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
                        className={`${styles.category} ${styles.active}`}
                        onClick={() => router.push("/messages")}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/images/dashboard/messages-active.svg"
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
                <div className={styles.messageWrapper}>
                    <h2>Nowa wiadomość</h2>
                    <div className={styles.messageContainer}>
                        <form action="#" method="post" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Tytuł"
                                name="title"
                                id="title"
                                className={styles.title}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Podtytuł"
                                name="subtitle"
                                id="subtitle"
                                className={styles.subtitle}
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                            />
                            <textarea
                                name="content"
                                id="content"
                                className={styles.content}
                                placeholder="Wiadomość..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button
                                type="submit"
                                className={styles.sendMessage}
                            >
                                Prześlij wiadomość
                            </button>
                        </form>
                    </div>
                </div>
                <div className={styles.investorListWrapper}>
                    <h2>Lista inwestorów</h2>
                    <div className={styles.investorListContainer}>
                        <button className={styles.checkAll}>
                            Zaznacz wszystkich
                        </button>
                        {investorsList}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Investor: NextPage<{ investor: investorResponseI }> = ({ investor }) => {
    const { name } = investor;
    return (
        <div className={styles.investorContainer}>
            <label>
                <h3>{name}</h3>
                <input
                    type="checkbox"
                    name="investorCheckbox"
                    id={`checkbox${investor.id}`}
                    className={styles.investorCheckbox}
                />
            </label>
        </div>
    );
};

// export const getServerSideProps: GetServerSideProps<{
//     investors: investorI[];
// }> = async (context) => {
//     const { token } = context.req.cookies;
//     const investorResult = await fetch(
//         "http://localhost:3000/data/investors.json"
//     );
//     const { investors }: { investors: investorI[] } =
//         await investorResult.json();
//     return { props: { investors } };
// };

export default SendMessage;
