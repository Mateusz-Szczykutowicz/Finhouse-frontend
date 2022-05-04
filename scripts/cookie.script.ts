interface optionI {
    path?: string;
    domain?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
}

type setCookieFunction = (
    name: string,
    value: string,
    option?: optionI
) => void;
type getCookieFunction = (name: string) => string;
type deleteCookieFunction = (name: string, option?: { path?: string }) => void;

export const setCookie: setCookieFunction = (name, value, option) => {
    const cookieName = encodeURIComponent(name);
    const cookieVal = encodeURIComponent(value);
    let cookieText = cookieName + "=" + cookieVal;
    if (!option) {
        document.cookie = cookieText;
        return;
    }
    if (option.expires) {
        cookieText += "; expires=" + option.expires.toUTCString();
    }

    if (option.maxAge) {
        cookieText += "; max-age=" + (option.maxAge * 60).toString();
    }

    if (option.path) {
        cookieText += "; path=" + option.path;
    }
    if (option.domain) {
        cookieText += "; domain=" + option.domain;
    }
    if (option.secure) {
        cookieText += "; secure";
    }

    document.cookie = cookieText;
    return;
};

export const getCookie: getCookieFunction = (name) => {
    if (document.cookie === "") {
        return "";
    } else {
        const cookies = document.cookie.split(/; */);

        for (let cookie of cookies) {
            const [cookieName, cookieVal] = cookie.split("=");
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }

        return "";
    }
};

export const deleteCookie: deleteCookieFunction = (name, options) => {
    const cookieName = encodeURIComponent(name);
    let cookieText = cookieName + "=";
    if (!options) {
        document.cookie =
            cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        return;
    } else {
        if (options.path) {
            cookieText += "; path=" + options.path;
        }
        cookieText += "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = cookieText;
        return;
    }
};
