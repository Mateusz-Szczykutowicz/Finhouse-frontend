import { useRouter } from "next/router";
import { useEffect } from "react";
import config from "../config";
import { deleteCookie, getCookie } from "../scripts/cookie.script";
import { fetchData } from "../scripts/fetchData.script";

const useSession = (): void => {
    const router = useRouter();
    useEffect(() => {
        const token = getCookie("token");
        const url: RequestInfo = `${config.host}/users/check`;
        fetchData(url, { token })
            .then(({ response }) => {
                if (response.status === 403) {
                    alert(
                        "Twoje konto nie jest jeszcze aktywne lub zostało zablokowane!"
                    );
                    deleteCookie("token", { path: "/" });
                    router.push("/login");
                }
                if (response.status !== 200) {
                    deleteCookie("token", { path: "/" });
                    router.push("/login");
                }
            })
            .catch((err) => {
                console.log("err :>> ", err);
                deleteCookie("token", { path: "/" });
                router.push("/login");
            });
    }, [router]);
    return;
};

export default useSession;
