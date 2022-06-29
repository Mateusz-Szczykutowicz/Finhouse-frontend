import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useMemo, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PermissionGate from "../../components/PermissionGate";
import { responseI } from "../../interfaces/general.interface";
import { PermissionE } from "../../interfaces/permission.interface";
import { userResponseI } from "../../interfaces/user.interface";
import styles from "../../styles/message.send.module.scss";
import config from "../../utils/config";
import useSession from "../../utils/lib/useSession";
import useUser from "../../utils/lib/useUser";
import { fetchData, MethodE } from "../../utils/scripts/fetchData.script";

const SendMessage: NextPage<{ response: responseI }> = ({ response }) => {
    //? Variables
    const router = useRouter();
    const users: userResponseI[] = useMemo(
        () => response.data || [],
        [response]
    );
    //? Use state
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<Map<string, string>>(
        new Map()
    );

    //? Use effect
    useSession();
    const { token, userPermission } = useUser();

    //? Methods
    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLElement>) => {
            e.preventDefault();
            let sendTo: string[] = [];
            selectedUsers.forEach((value) => sendTo.push(value));
            const data = {
                sendTo: sendTo.join(", "),
                title,
                subtitle,
                content,
            };
            console.log("data :>> ", data);
            const url: RequestInfo = `${config.host}/admin/messages/send`;
            const { response } = await fetchData(url, {
                token,
                method: MethodE.POST,
                data: JSON.stringify(data),
                contentType: "application/json",
            });
            console.log("response :>> ", response);
            if (response.status === 201) {
                router.push("/messages");
            }
        },
        [content, router, selectedUsers, subtitle, title, token]
    );

    const handleSelectUser = useCallback(
        (id: string, isChecked: boolean) => {
            if (!isChecked) {
                console.log("wykonuję teraz select user :>> ");
                selectedUsers.set(id, id);
                console.log("selectedUsers :>> ", selectedUsers);
                setSelectedUsers(selectedUsers);
            } else {
                selectedUsers.delete(id);
                setSelectedUsers(selectedUsers);
            }
        },
        [selectedUsers]
    );

    const usersList = useMemo(
        () =>
            users.map((user) => (
                <UserElement
                    key={user.id}
                    user={user}
                    handleSelectedUser={handleSelectUser}
                />
            )),
        [users, handleSelectUser]
    );
    // const usersList = null; //!! do wymiany
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
                        {usersList}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const UserElement: NextPage<{
    user: userResponseI;
    handleSelectedUser: (id: string, isChecked: boolean) => void;
}> = ({ user, handleSelectedUser }) => {
    const { name, id } = user;
    const [isChecked, setIseChecked] = useState(false);
    return (
        <div
            className={styles.investorContainer}
            onClick={() => handleSelectedUser(id, isChecked)}
        >
            <label>
                <h3>{name}</h3>
                <input
                    type="checkbox"
                    name="investorCheckbox"
                    id={`checkbox${id}`}
                    checked={isChecked}
                    onChange={(e) => {
                        setIseChecked(e.target.checked);
                    }}
                    className={styles.investorCheckbox}
                />
            </label>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<{
    response: responseI;
}> = async (context) => {
    const { token } = context.req.cookies;
    const url: RequestInfo = `${config.host}/admin/users`;
    const { response } = await fetchData(url, { token });
    return { props: { response } };
};

export default SendMessage;
