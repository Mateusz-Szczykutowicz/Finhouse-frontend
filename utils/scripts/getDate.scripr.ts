import pl from "../locales/pl.lang.json";

export const getCurrentDateString = () => {
    const now = new Date();

    return `${pl.days[now.getDay()]}, ${now.getDate()} ${
        pl.months[now.getMonth()]
    } ${now.getFullYear()}`;
};

export const getCurrentMonth = (): string => {
    const now = new Date();
    return `${now.getFullYear()}-${
        now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1
    }`;
};

export const getDate = (date: Date): string => {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
        date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}r`;
};

export const getDayDifference = (x: Date, y: Date) => {
    const firstDate = new Date(x);
    const secondDate = new Date(y);
    const result =
        (firstDate.getTime() - secondDate.getTime()) / (1000 * 60 * 60 * 24);
    if (result < 0) {
        return 0;
    }
    return result;
};
