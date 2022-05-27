export enum investorStatusE {
    INPROGRESS = "W trakcie",
    ACCEPTED = "Zaakceptowany",
    REJECTED = "Odrzucony",
}

export interface investorResponseI {
    id: string;
    name: string;
    email: string;
    tel: string;
    commission: number;
    createdAt: Date;
    status: investorStatusE;
}

export interface investorI {
    name: string;
    email: string;
    tel: string;
    commission: number;
    file: { name: string };
}

export interface investI {
    investedAmount: number;
    installmentsAmount: number;
    commissionsAmount: number;
}
