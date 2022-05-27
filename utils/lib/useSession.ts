import { useRouter } from "next/router";
import { useEffect } from "react";
import { deleteCookie, getCookie } from "../scripts/cookie.script";
import { checkToken } from "../scripts/fetchData.script";

const useSession = (): void => {
    console.log("UseSession !!");
    const router = useRouter();
    useEffect(() => {
        const token = getCookie("token");
        console.log("checktoken!!! :>> ");
        checkToken(token)
            .then((response) => {
                if (!response) {
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
