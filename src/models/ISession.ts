
import type {ISeat} from "../db.ts";

export interface ISession {
    id: string;
    date: string;
    filmId: string;
    filmName: string;
    hall:number;
    time: string;
    seats:  ISeat[];
}