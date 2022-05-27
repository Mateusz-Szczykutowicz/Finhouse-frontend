export interface investmentI {
    investorId: string;
    name: string;
    email: string;
    tel: string;
    firstInstallment: Date;
    lastInstallment: Date;
    investorCapital: number;
    commissionAmount: number;
    installmentAmount: number;
    numberOfInstallment: number;
    gracePeriod: number;
    otherCommission: number;
    contract: File;
}

export interface investmentResponseI {
    id: string;
    investorId: string;
    name: string;
    email: string;
    tel: string;
    firstInstallment: Date;
    lastInstallment: Date;
    investorCapital: number;
    commissionAmount: number;
    installmentAmount: number;
    numberOfInstallment: number;
    gracePeriod: number;
    contract: File;
}
