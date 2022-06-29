import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
// import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.scss";

const Modal: NextPage<{
    show: boolean;
    onClose: () => void;
    title: string;
}> = ({ show, onClose, children, title }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = useCallback(
        (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        },
        [onClose]
    );

    const modalContent = show ? (
        <div className={styles.wrapper} onClick={handleCloseClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <a href="#" onClick={handleCloseClick}>
                        x
                    </a>
                </div>
                {title && <h3>{title}</h3>}
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    ) : null;
    if (isBrowser) {
        return modalContent;
    } else {
        return null;
    }

    // if (isBrowser) {
    //     return ReactDOM.createPortal(
    //         modalContent
    //         document.getElementById("modal-root")
    //     );
    // } else {
    //     return null;
    // }
};

export default Modal;
