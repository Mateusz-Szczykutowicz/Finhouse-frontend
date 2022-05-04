import { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer: NextPage = () => {
    return (
        <div className={styles.footer}>
            <h3>
                <span>&copy; 2022 All Rights reserved | </span>
                <span>Created by </span>
                <a
                    href="https://deltastorm.pl/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Delta Storm
                </a>
            </h3>
        </div>
    );
};

export default Footer;
