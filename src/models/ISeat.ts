import type {ICustomer} from "./ICustomer.ts";

export interface ISeat {
    seat: string;
    booked: false | ICustomer
}