import { responseI } from "../../interfaces/general.interface";
import { userResponseI } from "../../interfaces/user.interface";
import { getCookie, setCookie } from "./cookie.script";

export const checkToken = async (token: string): Promise<boolean> => {
    const checkTokenResponse = await fetch(
        `http://localhost:8000/users/check`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
        }
    );
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
    const registerResult = await fetch(`http://localhost:8000/users/login`, {
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
    URL: URL,
    {
        token,
        contentType = "application/json",
        method = "GET",
        data,
    }: { token: string; contentType?: string; method?: string; data?: any }
): Promise<{ response: responseI }> => {
    if (method === "GET") {
        const responseData = await fetch(URL, {
            method: "GET",
            headers: {
                token: token,
                "Content-Type": contentType,
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
        const responseData = await fetch(URL, {
            method: method,
            headers: {
                token: token,
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
};
