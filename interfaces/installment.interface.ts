export enum InstallmentStatusE {
    TOPAY = "Do zapłaty",
    PAID = "Zapłacony",
    LATE = "Spóźniony",
}

export type InstallmentStatusT = InstallmentStatusE;

export interface installmentResponseI {
    id: string;
    installmentStatus: InstallmentStatusE;
    startDate: Date;
    endDate: Date;
    initialAmount: number;
    paidAmount: number;
    paymentDelay: number;
}
