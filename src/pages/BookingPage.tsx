import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getScreeningsByFilmId} from "../db.ts";
import {SheduleComponent} from "../components/SheduleComponent.tsx";
import type {ISession} from "../models/ISession.ts";



export const BookingPage = () => {

    const {id} = useParams();
const [sessions, setSessions] = useState<ISession[]>([]);
    console.log(id);
    useEffect(()=>{
        getScreeningsByFilmId(id).then(res=>setSessions(res));
    },[])

    return (
        <div>
<div>

</div>
<div>
    <p>Session schedule</p>
    <div>
        {sessions.map((session) =>  <SheduleComponent date={session.date}
                                                      filmId={session.filmId}
                                                      filmName={session.filmName}
                                                      hall={session.hall}
                                                      time={session.time}
                                                      seats={session.seats}  />)}
    </div>
</div>
        </div>
    );
};