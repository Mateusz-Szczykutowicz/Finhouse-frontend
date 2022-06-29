import { responseI } from "../../interfaces/general.interface";
import { userResponseI } from "../../interfaces/user.interface";
import config from "../config";
import { getCookie, setCookie } from "./cookie.script";

export enum MethodE {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export const checkToken = async (token: string): Promise<boolean> => {
    const checkTokenResponse = await fetch(`${config.host}/users/check`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            token: token,
        },
    });
    const response = await checkTokenResponse.json();
    console.log("response :>> ", response);
    if (response.status === 200) {
        return true;
    }
    return false;
};

export const loginFetch = async (data: {
    email: string;
    password: string;
}): Promise<responseI> => {
    const registerResult = await fetch(`${config.host}/users/login`, {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const response: responseI = await registerResult.json();
    return response;
};

export const fetchData = async (
    URL: RequestInfo,
    {
        token,
        contentType,
        method = MethodE.GET,
        data,
    }: { token: string; contentType?: string; method?: MethodE; data?: any }
): Promise<{ response: responseI }> => {
    if (method === MethodE.GET) {
        const responseData = await fetch(URL, {
            method: MethodE.GET,
            headers: {
                token: token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).catch((err) => {
            console.log("err :>> ", err);
        });
        if (responseData) {
            const response: responseI = await responseData.json();
            return { response };
        } else {
            return {
                response: { message: "Internal server error", status: 500 },
            };
        }
    } else {
        if (contentType) {
            const responseData = await fetch(URL, {
                method: method,
                headers: {
                    token: token,
                    "Content-Type": contentType,
                    "Access-Control-Allow-Origin": "*",
                },
                body: data,
            }).catch((err) => {
                console.log("err :>> ", err);
            });
            if (responseData) {
                const response: responseI = await responseData.json();
                return { response };
            } else {
                return {
                    response: {
                        message: "Internal server error",
                        status: 500,
                    },
                };
            }
        } else {
            const responseData = await fetch(URL, {
                method: method,
                headers: {
                    token: token,
                    "Access-Control-Allow-Origin": "*",
                },
                body: data,
            }).catch((err) => {
                console.log("err :>> ", err);
            });
            if (responseData) {
                const response: responseI = await responseData.json();
                return { response };
            } else {
                return {
                    response: {
                        message: "Internal server error",
                        status: 500,
                    },
                };
            }
        }
    }
};
