export interface userI {
    email: string;
    password: string;
    name: string;
    tel: string;
    investmentAmount: string;
    adress: string;
}

export interface userResponseI {
    id: string;
    email: string;
    name: string;
    tel: string;
    investmentAmount: number;
    adress: string;
    admin: boolean;
    createdAt: Date;
}
