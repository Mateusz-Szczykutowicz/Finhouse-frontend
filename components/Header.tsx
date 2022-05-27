import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userI, userResponseI } from "../interfaces/user.interface";
import { deleteCookie, getCookie } from "../utils/scripts/cookie.script";
import styles from "../styles/Header.module.scss";
import PermissionGate from "./PermissionGate";
import useSession from "../utils/lib/useSession";
import useUser from "../utils/lib/useUser";
import { PermissionE } from "../interfaces/permission.interface";

const Header: NextPage = () => {
    //? Variables
    const router = Router;

    //? Use effect
    const { user, userPermission } = useUser();
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
                    userName={user.name || ""}
                    messageCount={0}
                    isAdmin={user.admin}
                />
            ) : null}
        </div>
    );
};

const UserHeader: NextPage<{
    userName?: string;
    isAdmin?: boolean;
    messageCount?: number;
}> = ({ userName, isAdmin, messageCount }) => {
    const router = useRouter();
    return (
        <div className={styles.userWrapper}>
            <button className={styles.messages}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/images/message.svg"
                        layout="fill"
                        alt="Wiadomość"
                    />
                </div>
                <div className={styles.messageCount}>{messageCount}</div>
            </button>
            <div className={styles.imageWrapper}>
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

export const getServerSideProps: GetServerSideProps<{
    user: userResponseI;
}> = async (context) => {
    console.log("wykonuję :>> ");
    const token = context.req.cookies.token;
    const userResponse = await fetch("http://localhost:8000/users/", {
        headers: { token: token },
    });
    const response = await userResponse.json();
    return { props: { user: response.data } };
};

export default Header;
