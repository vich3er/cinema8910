import type {ICustomer} from "./ICustomer.ts";

export interface ISession {
    date: string;
    filmId: string;
    filmName: string;
    hall:2;
    time: string;
    seats: null [] & ICustomer[]
}