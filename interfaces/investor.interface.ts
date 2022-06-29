export interface investorResponseI {
    id: string;
    name: string;
    email: string;
    tel: string;
    commission: number;
    createdAt: Date;
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
