import type {FC} from "react";
import type {ISession} from "../models/ISession.ts";


export const SheduleComponent:FC<ISession> = ({date, filmName, filmId, time, seats, hall}) => {
    const handleClick = () => {

    };
    return (
        <div onClick={handleClick}>
            <span>{date} {time}</span>

        </div>
    );
};