import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { responseI } from "../../interfaces/general.interface";
import {
    PermissionE,
    PermissionT,
} from "../../interfaces/permission.interface";
import { userResponseI } from "../../interfaces/user.interface";
import { deleteCookie, getCookie } from "../scripts/cookie.script";
import { checkToken, fetchData } from "../scripts/fetchData.script";

const useUser = (): { user: userResponseI; userPermission: PermissionT } => {
    const userPlaceholder: userResponseI = {
        admin: false,
        adress: "",
        createdAt: new Date(),
        email: "",
        id: "",
        investmentAmount: 0,
        name: "",
        tel: "",
    };

    const [user, setUser] = useState(userPlaceholder);
    const [userPermission, setUserPermission] = useState(PermissionE.GUEST);
    useEffect(() => {
        const token = getCookie("token");
        const url: URL = new URL("http://localhost:8000/users/");

        fetchData(url, { token }).then(({ response }) => {
            const user: userResponseI = response.data;
            if (user)
                user.admin
                    ? setUserPermission(PermissionE.ADMIN)
                    : setUserPermission(PermissionE.INVESTOR);

            setUser(user);
        });
    }, []);

    return { user, userPermission };
};

export default useUser;
