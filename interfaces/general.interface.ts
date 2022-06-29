export interface responseI {
    message: string;
    status: number;
    data?: any;
}

export enum sortFilterE {
    NAME_UP = "nameUp",
    NAME_DOWN = "nameDown",
    AMOUNT_DOWN = "amountDown",
    AMOUNT_UP = "amountUp",
    COMMISSION_DOWN = "commissionDown",
    COMMISSION_UP = "comissionUp",
    INSTALLMENT_UP = "installmentUp",
    INSTALLMENT_DOWN = "installmentDown",
}

export interface configI {
    host: RequestInfo;
}
