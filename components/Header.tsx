import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteCookie } from "../utils/scripts/cookie.script";
import styles from "../styles/Header.module.scss";
import PermissionGate from "./PermissionGate";
import useUser from "../utils/lib/useUser";
import { PermissionE } from "../interfaces/permission.interface";
import config from "../utils/config";
import { fetchData } from "../utils/scripts/fetchData.script";
import { messagesI } from "../interfaces/messages.interface";

const Header: NextPage = () => {
    //? Variables
    const router = Router;

    //? Use states
    const [messages, setMessages] = useState<messagesI[]>([]);
    const [countOfMessages, setCountOfMessages] = useState(0);

    //? Use effect
    const { user, userPermission, token } = useUser();
    useEffect(() => {
        if (token) {
            const messagesUrl: RequestInfo = `${config.host}/users/messages/new`;
            fetchData(messagesUrl, {
                token,
            }).then(({ response }) => {
                if (response.data) {
                    setMessages(response.data.messages);
                    setCountOfMessages(response.data.length);
                }
            });
        }
    }, [token]);

    return (
        <div className={styles.wrapper}>
            <button
                className={styles.imageWrapper}
                onClick={() => {
                    router.push("/");
                }}
            >
                <Image
                    src="/images/logo.svg"
                    // width="100"
                    // height={100}
                    layout="fill"
                    alt="FinHouse"
                ></Image>
            </button>
            {/* <PermissionGate
                permission={Permission.ADMIN}
                userPermission={userPermission}
            >
                <UserHeader
                    userName={user.name || ""}
                    messageCount={0}
                    isAdmin={user.admin}
                />
            </PermissionGate> */}
            {userPermission !== PermissionE.GUEST ? (
                <UserHeader
                    userName={user ? user.name : ""}
                    messageCount={countOfMessages}
                    isAdmin={user ? user.admin : false}
                    userPermission={userPermission}
                />
            ) : null}
        </div>
    );
};

const UserHeader: NextPage<{
    userName?: string;
    isAdmin?: boolean;
    messageCount?: number;
    userPermission: PermissionE;
}> = ({ userName, isAdmin, messageCount, userPermission }) => {
    const router = useRouter();
    return (
        <div className={styles.userWrapper}>
            <PermissionGate
                permission={PermissionE.INVESTOR}
                userPermission={userPermission}
            >
                <button
                    className={styles.messages}
                    onClick={() => router.push("/messages")}
                >
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/message.svg"
                            layout="fill"
                            alt="Wiadomość"
                        />
                    </div>
                    <div className={styles.messageCount}>{messageCount}</div>
                </button>
            </PermissionGate>
            <div
                className={styles.imageWrapper}
                onClick={() => {
                    router.push("/dashboard/profile");
                }}
            >
                <Image
                    src="/images/dashboard/avatar-placeholder.png"
                    layout="fill"
                    alt="Avatar"
                />
            </div>
            <div className={styles.dataWrapper}>
                <h3>{userName}</h3>
                <p>{isAdmin ? "Admin" : "Investor"}</p>
            </div>
            <button
                className={styles.logout}
                onClick={() => {
                    deleteCookie("token", { path: "/" });
                    router.push("/login");
                }}
            >
                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/logout.svg"
                        layout="fill"
                        alt="Avatar"
                    />
                </div>
            </button>
        </div>
    );
};

export default Header;
