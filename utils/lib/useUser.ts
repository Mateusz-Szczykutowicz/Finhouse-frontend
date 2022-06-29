import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { responseI } from "../../interfaces/general.interface";
import {
    PermissionE,
    PermissionT,
} from "../../interfaces/permission.interface";
import { userResponseI, userStatusE } from "../../interfaces/user.interface";
import config from "../config";
import { deleteCookie, getCookie } from "../scripts/cookie.script";
import { checkToken, fetchData } from "../scripts/fetchData.script";

const useUser = (): {
    user: userResponseI;
    userPermission: PermissionT;
    token: string;
} => {
    const userPlaceholder: userResponseI = {
        admin: false,
        adress: "",
        createdAt: new Date(),
        email: "",
        id: "",
        investmentAmount: 0,
        name: "",
        tel: "",
        status: userStatusE.INPROGRESS,
    };

    const [user, setUser] = useState(userPlaceholder);
    const [userPermission, setUserPermission] = useState(PermissionE.GUEST);
    const [token, setToken] = useState("");
    useEffect(() => {
        // const token = getCookie("token");
        setToken(getCookie("token"));
        const url: RequestInfo = `${config.host}/users/`;

        fetchData(url, { token })
            .then(({ response }) => {
                const user: userResponseI = response.data;
                if (user)
                    user.admin
                        ? setUserPermission(PermissionE.ADMIN)
                        : setUserPermission(PermissionE.INVESTOR);

                setUser(user);
            })
            .catch((err) => console.log("err :>> ", err));
    }, [token]);

    return { user, userPermission, token };
};

export default useUser;
