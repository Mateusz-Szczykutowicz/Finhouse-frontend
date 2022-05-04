import { NextPage } from "next";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/Header.module.scss";

const Header: NextPage = () => {
    const router = Router;
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
        </div>
    );
};

export default Header;
