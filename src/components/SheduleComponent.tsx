import type {FC} from "react";
import type {ISession} from "../pages/BookingPage.tsx";

// interface SheduleComponentProps {
//     date: string;
//     filmName: string;
//     hall: string;
//     seats: null[] &
// }

export const SheduleComponent:FC<ISession> = ({date, filmName, filmId, time, seats, hall}) => {
    const handleClick = () => {

    };
    return (
        <div onClick={handleClick}>
            <span>{date} {time}</span>

        </div>
    );
};